const { isLocalModelAvailable, predictLocal, loadModel } = require("./paddyLocal");

const ML_API_URL = process.env.PADDY_ML_URL || "http://127.0.0.1:5001";

// Below this the model is guessing; ask for a better photo instead of naming a disease.
const MIN_CONFIDENCE = 40;
// Below this a result is shown with a "low confidence" warning.
const LOW_CONFIDENCE = 60;

// Keys are model labels (labels.json / dataset folder names).
const DISEASE_INFO = {
  bacterial_leaf_blight: {
    issue: "Bacterial Leaf Blight",
    severity: "High",
    treatment: [
      "Drain the field and avoid excess standing water.",
      "Remove and destroy severely infected leaves/plants.",
      "Use copper-based bactericide where locally approved."
    ],
    prevention: "Use certified disease-free seed, resistant varieties and balanced nitrogen.",
    pesticide: "Copper-based bactericide where locally approved."
  },
  bacterial_leaf_streak: {
    issue: "Bacterial Leaf Streak",
    severity: "Medium",
    treatment: [
      "Avoid excess nitrogen and reduce leaf wetness.",
      "Remove and destroy heavily infected leaves.",
      "Use copper-based bactericide where locally approved."
    ],
    prevention: "Use clean seed and resistant varieties; avoid working in wet fields.",
    pesticide: "Copper-based bactericide where locally approved."
  },
  bacterial_panicle_blight: {
    issue: "Bacterial Panicle Blight",
    severity: "High",
    treatment: [
      "No reliable cure once infected - remove badly affected plants.",
      "Avoid excess nitrogen and keep water management steady.",
      "Consult the local agriculture officer before any bactericide use."
    ],
    prevention: "Use certified clean seed, avoid excess nitrogen, and plant on time to avoid heat stress at flowering.",
    pesticide: "Consult the local extension officer."
  },
  blast: {
    issue: "Rice Blast",
    severity: "High",
    treatment: [
      "Remove and destroy infected tillers/panicles.",
      "Avoid excess nitrogen; apply balanced fertilizer.",
      "Apply tricyclazole or isoprothiolane after confirmation, following label dose."
    ],
    prevention: "Use blast-resistant varieties; avoid late/dense planting and water stress.",
    pesticide: "Tricyclazole or isoprothiolane (after local expert confirmation)."
  },
  brown_spot: {
    issue: "Brown Spot",
    severity: "Medium",
    treatment: [
      "Improve soil fertility, especially potassium.",
      "Destroy infected straw/stubble after harvest.",
      "Apply mancozeb or propiconazole if infection is severe."
    ],
    prevention: "Use healthy treated seed and balanced fertilizer, particularly potash.",
    pesticide: "Mancozeb or propiconazole (only if severe)."
  },
  dead_heart: {
    issue: "Dead Heart",
    severity: "High",
    treatment: [
      "Remove and destroy affected tillers and egg masses.",
      "Use light traps to monitor/catch moths.",
      "Apply chlorantraniliprole or cartap hydrochloride under local guidance."
    ],
    prevention: "Remove stubble after harvest, avoid excess nitrogen, plant on time with neighbours.",
    pesticide: "Chlorantraniliprole or cartap hydrochloride (as locally recommended)."
  },
  downy_mildew: {
    issue: "Downy Mildew",
    severity: "Low-Medium",
    treatment: [
      "Improve drainage and avoid waterlogged nursery beds.",
      "Remove and destroy heavily infected plants.",
      "Use a recommended fungicide (e.g. metalaxyl + mancozeb) if spread continues."
    ],
    prevention: "Use well-drained seedbeds and resistant varieties; avoid dense planting.",
    pesticide: "Metalaxyl + mancozeb (only if locally recommended)."
  },
  hispa: {
    issue: "Rice Hispa",
    severity: "Medium",
    treatment: [
      "Clip and destroy affected leaf tips in nursery/early stage.",
      "Hand-pick adult beetles or use a net in small fields.",
      "Use insecticide only if severe, as advised by the local DAE officer."
    ],
    prevention: "Avoid excess nitrogen, keep the field weed-free, remove grassy hosts near the field.",
    pesticide: "Use only insecticides recommended by the local agriculture office."
  },
  normal: {
    issue: "Healthy Rice Leaf",
    severity: "None",
    treatment: ["No treatment needed. Continue regular field monitoring."],
    prevention: "Keep balanced fertilization, good drainage and regular scouting.",
    pesticide: ""
  },
  tungro: {
    issue: "Rice Tungro",
    severity: "High",
    treatment: [
      "Remove and destroy infected hills early.",
      "Control the leafhopper vector (light traps, recommended insecticide).",
      "No cure for infected plants - focus on vector control."
    ],
    prevention: "Grow tungro-resistant varieties and synchronize planting with neighbours.",
    pesticide: "Vector control only, as locally recommended."
  },

  // ---------- "extra" diseases (not in the 10-class model) ----------
  sheath_blight: {
    issue: "Sheath Blight",
    severity: "Medium",
    treatment: [
      "Avoid dense planting and excess nitrogen.",
      "Drain the field periodically to lower humidity at the base; keep weeds down.",
      "Apply hexaconazole or validamycin if lesions climb up the plant, following label dose."
    ],
    prevention: "Use proper spacing and balanced fertilizer; remove infected stubble and weeds after harvest.",
    pesticide: "Hexaconazole or validamycin (after local confirmation)."
  },
  false_smut: {
    issue: "False Smut",
    severity: "Medium",
    treatment: [
      "Remove and destroy infected panicles carefully (do not shake - spores spread).",
      "Avoid excess nitrogen and late planting; reduce humidity at flowering.",
      "Spray propiconazole or a copper-based fungicide at booting/early heading where locally recommended."
    ],
    prevention: "Use clean seed and tolerant varieties, plant on time and keep nitrogen balanced.",
    pesticide: "Propiconazole or copper-based fungicide at booting/heading (as locally recommended)."
  },
  ufra: {
    issue: "Ufra",
    severity: "High",
    treatment: [
      "Remove and destroy infected plants and stubble; do not carry them to other fields.",
      "Avoid irrigation water flowing from infected fields and dry the field after harvest.",
      "Ask the local DAE/BRRI office about nematode control; no routine pesticide is advised without confirmation."
    ],
    prevention: "Plough deeply and dry the field after harvest, destroy ratoon rice and weed hosts, rotate with non-host crops.",
    pesticide: "Nematicide only if advised by the local agriculture office."
  },
  bakanae: {
    issue: "Bakanae (Foot Rot)",
    severity: "Medium",
    treatment: [
      "Remove and destroy abnormally tall, thin, pale seedlings and plants with white roots at the lower nodes.",
      "Do not use seed from infected fields.",
      "Use hot-water or recommended fungicide seed treatment before sowing next time."
    ],
    prevention: "Use certified disease-free seed and treat seed before sowing.",
    pesticide: "Seed-treatment fungicide as locally recommended."
  }
};

const SEVERITY = Object.fromEntries(
  Object.entries(DISEASE_INFO).map(([label, info]) => [label, String(info.severity).toLowerCase()])
);

// Accepts labels, issue names or folder names ("Rice Blast", "foot_rot", "Ufra Disease" ...).
const LABEL_ALIASES = {
  "rice blast": "blast", "rice tungro": "tungro", "rice hispa": "hispa", "healthy": "normal",
  "healthy rice leaf": "normal", "foot rot": "bakanae", "foot_rot": "bakanae", "bakanae foot rot": "bakanae",
  "ufra disease": "ufra", "sheath blight": "sheath_blight", "false smut": "false_smut"
};

function canonicalLabel(value) {
  const raw = String(value || "").trim().toLowerCase();
  if (!raw) return "";
  if (LABEL_ALIASES[raw]) return LABEL_ALIASES[raw];
  const underscored = raw.replace(/[\s-]+/g, "_");
  if (DISEASE_INFO[underscored] || underscored === "unknown") return underscored;
  return LABEL_ALIASES[underscored] || underscored;
}

const UNCLEAR = {
  issue: "Unable to identify",
  severity: "Unknown",
  treatment: [
    "Retake the photo closer to the affected part, in daylight, focused on the leaf/stem/panicle.",
    "Tick the visible symptoms below the photo and scan again.",
    "Show the plant to your local agriculture officer (Krishi Call Center 16123)."
  ],
  prevention: "",
  pesticide: ""
};

// The local model returns percentages (0-100); an external server may return
// fractions (0-1). Decide ONCE for the whole list.
function normalizeConfidences(predictions) {
  const values = predictions.map((p) => Number(p.confidence));
  const sum = values.reduce((a, b) => a + (Number.isFinite(b) ? b : 0), 0);
  const asFraction = values.every((v) => Number.isFinite(v) && v <= 1) && sum <= 1.01;
  return predictions.map((p, i) => ({
    ...p,
    label: String(p.label || "").trim().toLowerCase(),
    confidence: asFraction ? values[i] * 100 : values[i]
  }));
}

function isRiceCrop(crop) {
  const value = String(crop || "").trim().toLowerCase();

  return (
    /\brice\b/.test(value) ||
    /\bpaddy\b/.test(value) ||
    value.includes("ধান") ||
    value.includes("dhan") ||
    value.includes("oryza")
  );
}

function labelIssue(label) {
  return DISEASE_INFO[label] ? DISEASE_INFO[label].issue : label.replace(/_/g, " ");
}

async function analyzePaddyImage({ imageBase64 }) {
  let image = String(imageBase64 || "").trim();

  if (image.startsWith("data:")) {
    image = image.slice(image.indexOf(",") + 1);
  }

  if (!image) {
    throw new Error("No rice leaf image was provided.");
  }

  let payload;

  async function callMlServer() {
    const response = await fetch(`${ML_API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64: image }),
      signal: AbortSignal.timeout(20000)
    });

    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(body.error || `Paddy ML API returned HTTP ${response.status}`);
    }
    return body;
  }

  if (isLocalModelAvailable()) {
    try {
      payload = { predictions: await predictLocal(image, 30) };
    } catch (error) {
      console.warn("Local paddy model failed, trying ML server:", error.message);
      payload = await callMlServer();
    }
  } else {
    payload = await callMlServer();
  }

  if (!Array.isArray(payload.predictions) || payload.predictions.length === 0) {
    throw new Error("Paddy ML returned no predictions.");
  }

  const predictions = normalizeConfidences(payload.predictions);
  const top = predictions[0];

  if (!top.label || !Number.isFinite(top.confidence)) {
    throw new Error("Paddy ML API returned an invalid prediction.");
  }

  const modelClasses = predictions.map((p) => p.label);

  const shown = predictions.slice(0, 3).map((item) => ({
    label: item.label,
    issue: labelIssue(item.label),
    confidence: Math.round(item.confidence * 10) / 10
  }));

  const base = { crop: "Rice", predictions: shown, modelClasses, source: "paddy-ml" };

  // The model is guessing -> do not name a disease (same rule as the Colab notebook).
  if (top.confidence < MIN_CONFIDENCE || !DISEASE_INFO[top.label]) {
    return {
      ...base,
      issue: UNCLEAR.issue,
      confidence: Math.round(Math.max(0, top.confidence)),
      severity: UNCLEAR.severity,
      treatment: UNCLEAR.treatment,
      prevention: UNCLEAR.prevention,
      pesticideNote: "",
      lowConfidence: true,
      disclaimer: "The model could not recognise this photo clearly. Retake it closer, in daylight, and confirm with a local agriculture officer."
    };
  }

  const info = DISEASE_INFO[top.label];

  return {
    ...base,
    issue: info.issue,
    confidence: Math.round(Math.max(0, Math.min(100, top.confidence))),
    severity: SEVERITY[top.label] || "medium",
    treatment: info.treatment,
    prevention: info.prevention,
    pesticideNote: info.pesticide,
    lowConfidence: top.confidence < LOW_CONFIDENCE,
    disclaimer:
      top.confidence < LOW_CONFIDENCE
        ? "The model is not confident about this photo. Retake it in good light with one leaf filling the frame, and confirm with a local agriculture officer."
        : "AI result from a leaf photo. Confirm with a local agriculture officer before using any chemical."
  };
}

module.exports = {
  analyzePaddyImage,
  warmUp: () => (isLocalModelAvailable() ? loadModel().catch((e) => console.warn("Paddy model preload failed:", e.message)) : null),
  isRiceCrop,
  DISEASE_INFO,
  SEVERITY,
  canonicalLabel
};