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
bacterial_leaf_blight  - yellow/orange-straw lesions that start at leaf tips or margins, wavy edges, leaf dries from the edges inward
bacterial_leaf_streak  - narrow, dark-green/translucent streaks running between the veins
bacterial_panicle_blight - grains/panicle discoloured or sterile, with bacterial rot
blast                  - eye/diamond-shaped spots with grey-white centre and brown border on leaves; or neck/node rot, broken panicle neck
brown_spot             - many small, oval, brown spots (often with yellow halo) scattered on leaf or grain
dead_heart             - central shoot/tiller dried and dead (stem borer damage)
downy_mildew           - pale/yellow patches, whitish downy growth, stunted twisted plants
hispa                  - white parallel scraped streaks on leaf (beetle feeding), beetles visible
tungro                 - leaf turns orange/yellow-orange from tip, plant stunted, fewer tillers
bakanae                - abnormally tall, thin, pale plants; white adventitious roots at lower nodes; also called foot rot
ufra                   - leaves twisted/crinkled/white-tipped, panicle stuck or distorted at the base of the flag leaf, swollen nodes (nematode)
sheath_blight          - greenish-grey or straw-coloured oval/irregular lesions with brown border on the leaf sheath/stem near the water line, spreading upward (khol pocha)
false_smut             - orange, yellow-green or blackish velvety balls on individual grains in the panicle (lokkhir gu)
normal                 - healthy green rice leaf, no disease signs
unknown                - photo is not rice, too blurry/dark, or signs do not clearly match any label above
`.trim();

const SYSTEM = `You are an expert rice pathologist advising farmers in Bangladesh.
You are shown ONE photo. Choose exactly one label from the list. Look at WHICH PLANT PART is shown
(leaf, sheath/stem, panicle, whole plant) because the same colour can mean different diseases.
Do not guess: if the photo is not rice, unclear, or does not clearly match, answer "unknown".
Reply with JSON only, no markdown:
{"label":"<one label>","certainty":"high|medium|low","plant_part":"leaf|sheath|stem|panicle|whole_plant|other","visible_signs":["short phrase", "..."],"also_consider":["<label>"]}

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
      max_tokens: 400,
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
    signal: AbortSignal.timeout(30000)
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body?.error?.message || `Vision API returned HTTP ${response.status}`);
  }

  const text = (body.content || []).filter((b) => b.type === "text").map((b) => b.text).join("");
  const parsed = parseJson(text);

  const label = canonicalLabel(parsed.label);
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