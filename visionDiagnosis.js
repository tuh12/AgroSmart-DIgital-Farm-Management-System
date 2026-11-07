// Vision-AI rice diagnosis.
// Unlike the old closed-set image model (which can only ever answer with one of
// its own classes and is wrong for anything else), this looks at the actual
// photo, chooses among ALL 14 rice conditions the app knows, and may answer
// "unknown" when the photo is unclear or is not rice.
//
// Needs ANTHROPIC_API_KEY in .env (optional ANTHROPIC_MODEL).

const sharp = require("sharp");
const { DISEASE_INFO, SEVERITY, canonicalLabel } = require("./paddyModel");

const API_URL = "https://api.anthropic.com/v1/messages";

const LABEL_GUIDE = `
bacterial_leaf_blight  - LEAF BLADE only (never stem/sheath). Yellow then straw/whitish-grey dry stripes starting at the leaf tip or along one or both margins, with WAVY edges; the border between dead straw tissue and green tissue is yellow and wavy; spreads down toward the leaf base and the whole blade can look scorched (pata pora)
bacterial_leaf_streak  - narrow, dark-green/translucent streaks running between the veins
bacterial_panicle_blight - grains/panicle discoloured or sterile, with bacterial rot
blast                  - eye/diamond-shaped spots with grey-white centre and brown border on leaves; or neck/node rot, broken panicle neck
brown_spot             - many small, oval, brown spots (often with yellow halo) scattered on leaf or grain
dead_heart             - central shoot/tiller dried and dead (stem borer damage)
downy_mildew           - pale/yellow patches, whitish downy growth, stunted twisted plants
hispa                  - white parallel scraped streaks on leaf (beetle feeding), beetles visible
tungro                 - COLOUR disease of the blade: leaf turns orange, yellow-orange or rusty/pinkish-orange, usually from the tip downward and fairly uniform along the blade (no wavy straw-coloured stripe, no brown-bordered spots); plants are stunted with fewer tillers and poorly filled panicles
bakanae                - abnormally tall, thin, pale plants; white adventitious roots at lower nodes; also called foot rot
ufra                   - leaves twisted/crinkled/white-tipped, panicle stuck or distorted at the base of the flag leaf, swollen nodes (nematode)
sheath_blight          - LEAF SHEATH / STEM near the water line (lower plant): oval or irregular patches with straw-white or greenish-grey centre and a DARK-BROWN border, patches merge into a snake-skin pattern and creep upward; the green blade above may still look healthy (khol pora). Photos that are mostly stems/sheaths with straw-white patches bordered by brown belong here
false_smut             - orange, yellow-green or blackish velvety balls on individual grains in the panicle (lokkhir gu)
normal                 - healthy green rice leaf, no disease signs
unknown                - photo is not rice, too blurry/dark, or signs do not clearly match any label above
`.trim();

const SYSTEM = `You are an expert rice pathologist advising farmers in Bangladesh.
You are shown ONE photo. Choose exactly one label from the list. Look at WHICH PLANT PART is shown
(leaf, sheath/stem, panicle, whole plant) because the same colour can mean different diseases.
Do not guess: if the photo is not rice, unclear, or does not clearly match, answer "unknown".

Decision rules for the most confused diseases:
1. First decide the plant part. Lesions on the sheath/stem are NEVER bacterial_leaf_blight (use sheath_blight).
2. Straw/white dry stripe with a WAVY yellow edge on a leaf blade = bacterial_leaf_blight, not tungro.
3. Orange/yellow-orange discolouration of the blade without a dry straw stripe = tungro.
4. Brown-bordered oval patches on the lower sheath = sheath_blight, not brown_spot.

Reply with JSON only, no markdown. Fill the fields IN THIS ORDER (describe before you decide):
{"plant_part":"leaf|sheath|stem|panicle|whole_plant|other","colour_pattern":"short description of colours and lesion shape","visible_signs":["short phrase", "..."],"label":"<one label>","certainty":"high|medium|low","also_consider":["<label>"]}

Labels:
${LABEL_GUIDE}`;

const CERTAINTY = { high: 90, medium: 72, low: 50 };

function isEnabled() {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

async function toJpeg(imageBase64) {
  const buffer = await sharp(Buffer.from(imageBase64, "base64"))
    .rotate()
    .resize(1280, 1280, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 85 })
    .toBuffer();
  return buffer.toString("base64");
}

function parseJson(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) throw new Error("Vision AI returned no JSON");
  return JSON.parse(text.slice(start, end + 1));
}

function unknownResult(reason) {
  return {
    crop: "Rice",
    issue: "Unable to identify",
    confidence: 30,
    severity: "Unknown",
    lowConfidence: true,
    source: "vision-ai",
    treatment: [
      "Retake the photo in daylight: one affected leaf, stem base or panicle filling the frame, sharp and not blurry.",
      "Photograph the most affected part (for example the panicle for grain problems, the stem base for sheath problems).",
      "Show the plant to your local agriculture officer (Krishi Call Center 16123)."
    ],
    prevention: "Scout the field every few days and remove badly affected plants early.",
    visibleSymptoms: [],
    reasoning: reason || "",
    predictions: [],
    disclaimer:
      "The AI could not clearly identify the problem from this photo. Retake it, and confirm with a local agriculture officer before using any chemical."
  };
}

async function diagnoseRiceWithVision({ imageBase64, symptoms = [], notes = "" }) {
  const image = await toJpeg(imageBase64);

  const hint = [
    Array.isArray(symptoms) && symptoms.length ? `Farmer ticked: ${symptoms.join(", ")}.` : "",
    notes ? `Farmer note: ${String(notes).slice(0, 300)}` : ""
  ].filter(Boolean).join(" ");

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5",
      max_tokens: 500,
      system: SYSTEM,
      messages: [{
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: "image/jpeg", data: image } },
          {
            type: "text",
            text: `Diagnose this rice photo.${hint ? ` The photo is what counts; the farmer's hints may be wrong. ${hint}` : ""}`
          }
        ]
      }]
    }),
    redirect: "error", // a redirect would silently turn POST into GET -> "Method Not Allowed"
    signal: AbortSignal.timeout(30000)
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`Vision API HTTP ${response.status}: ${body?.error?.message || "no message"}`);
  }

  const text = (body.content || []).filter((b) => b.type === "text").map((b) => b.text).join("");
  const parsed = parseJson(text);

  let label = canonicalLabel(parsed.label);
  const part = String(parsed.plant_part || "").toLowerCase();
  // Consistency guard: bacterial leaf blight only occurs on the leaf blade.
  if ((part === "sheath" || part === "stem") && label === "bacterial_leaf_blight") label = "sheath_blight";
  const signs = Array.isArray(parsed.visible_signs) ? parsed.visible_signs.slice(0, 5).map(String) : [];

  if (label === "unknown" || !DISEASE_INFO[label]) {
    return unknownResult(signs.join("; "));
  }

  const confidence = CERTAINTY[String(parsed.certainty).toLowerCase()] || 50;
  const info = DISEASE_INFO[label];

  return {
    crop: "Rice",
    issue: info.issue,
    confidence,
    severity: SEVERITY[label] || "medium",
    lowConfidence: confidence < 60,
    source: "vision-ai",
    treatment: info.treatment,
    prevention: info.prevention,
    pesticideNote: info.pesticide || "",
    visibleSymptoms: signs,
    plantPart: parsed.plant_part || "",
    predictions: [{ label, issue: info.issue, confidence }],
    disclaimer:
      confidence < 60
        ? "The AI is not very sure about this photo. Retake it in good light and confirm with a local agriculture officer."
        : "AI result from a leaf/plant photo. Confirm with a local agriculture officer before using any chemical."
  };
}

module.exports = { diagnoseRiceWithVision, isEnabled };