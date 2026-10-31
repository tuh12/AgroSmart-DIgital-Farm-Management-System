
const { isLocalModelAvailable, predictLocal, loadModel } = require("./paddyLocal");

const ML_API_URL = process.env.PADDY_ML_URL || "http://127.0.0.1:5001";

const DISEASE_INFO = {
  bacterial_leaf_blight: {
    issue: "Bacterial Leaf Blight",
    treatment: [
      "Inspect affected leaves and monitor whether symptoms are spreading.",
      "Avoid excessive nitrogen fertilizer and manage field water appropriately.",
      "Consult a local agriculture officer before applying any chemical."
    ],
    prevention: "Use healthy seed, maintain balanced fertilizer application, and inspect the field regularly."
  },

  bacterial_leaf_streak: {
    issue: "Bacterial Leaf Streak",
    treatment: [
      "Inspect affected plants and monitor disease progression.",
      "Avoid unnecessary movement of contaminated plant material.",
      "Seek advice from a local agriculture officer if symptoms spread."
    ],
    prevention: "Use healthy seed and keep the field and farming equipment clean."
  },

  bacterial_panicle_blight: {
    issue: "Bacterial Panicle Blight",
    treatment: [
      "Inspect affected panicles and confirm the diagnosis with an agriculture officer.",
      "Avoid excessive nitrogen fertilizer and maintain appropriate crop care.",
      "Do not apply a pesticide or bactericide without locally approved guidance."
    ],
    prevention: "Use healthy seed, apply balanced fertilizer, and regularly monitor panicles during crop development."
  },

  blast: {
    issue: "Rice Blast",
    treatment: [
      "Inspect affected leaves and panicles for spreading lesions.",
      "Avoid excessive nitrogen fertilizer and maintain balanced crop nutrition.",
      "Consult a local agriculture officer about suitable locally approved control measures."
    ],
    prevention: "Use resistant varieties where available, healthy seed, and balanced fertilizer."
  },

  brown_spot: {
    issue: "Brown Spot",
    treatment: [
      "Check crop nutrition and soil conditions.",
      "Maintain balanced fertilizer and appropriate water management.",
      "Seek local agricultural advice if symptoms continue to spread."
    ],
    prevention: "Use healthy seed and maintain balanced crop nutrition."
  },

  dead_heart: {
    issue: "Dead Heart",
    treatment: [
      "Inspect stems and look for signs of stem-borer larvae.",
      "Confirm whether insect damage is present before choosing a control method.",
      "Ask a local agriculture officer about appropriate management."
    ],
    prevention: "Monitor the field regularly and manage crop residues and weeds appropriately."
  },

  downy_mildew: {
    issue: "Downy Mildew",
    treatment: [
      "Inspect the affected plants to confirm the diagnosis.",
      "Maintain suitable field and crop management practices.",
      "Consult an agriculture officer before using disease-control chemicals."
    ],
    prevention: "Use healthy seed and regularly monitor crop health and field conditions."
  },

  hispa: {
    issue: "Rice Hispa",
    treatment: [
      "Check leaves for adult beetles and feeding damage.",
      "Monitor the extent of infestation before selecting a control method.",
      "Consult a local agriculture officer if damage is widespread."
    ],
    prevention: "Inspect the field regularly and manage weeds and crop residues appropriately."
  },

  normal: {
    issue: "Healthy Rice Leaf",
    treatment: [
      "No clear disease was identified by the model in this image."
    ],
    prevention: "Continue regular field monitoring and balanced crop care."
  },

  tungro: {
    issue: "Rice Tungro",
    treatment: [
      "Check symptoms and seek confirmation from a local agriculture officer.",
      "Monitor potential insect vectors and affected plants.",
      "Follow locally recommended management guidance."
    ],
    prevention: "Use healthy seedlings and follow local advice for managing insect vectors and weeds."
  }
};

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

async function analyzePaddyImage({ imageBase64 }) {
  let image = String(imageBase64 || "").trim();

  if (image.startsWith("data:")) {
    image = image.slice(image.indexOf(",") + 1);
  }

  if (!image) {
    throw new Error("No rice leaf image was provided.");
  }

  let payload;

  if (isLocalModelAvailable()) {
    // Preferred: run the TF.js model inside Node (no Python server needed).
    payload = { predictions: await predictLocal(image) };
  } else {
    // Fallback: external Python ML server.
    const response = await fetch(`${ML_API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64: image }),
      signal: AbortSignal.timeout(20000)
    });

    payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        payload.error || `Paddy ML API returned HTTP ${response.status}`
      );
    }
  }

  if (!Array.isArray(payload.predictions) || payload.predictions.length === 0) {
    throw new Error("Paddy ML returned no predictions.");
  }

  const prediction = payload.predictions[0];
  const label = String(prediction.label || "").trim().toLowerCase();
  let confidence = Number(prediction.confidence);
  // Accept both 0-1 probabilities and 0-100 percentages.
  if (Number.isFinite(confidence) && confidence <= 1) confidence *= 100;

  if (!label || !Number.isFinite(confidence)) {
    throw new Error("Paddy ML API returned an invalid prediction.");
  }

  const info = DISEASE_INFO[label] || {
    issue: label.replace(/_/g, " "),
    treatment: [
      "Confirm the diagnosis with a local agriculture officer before treatment."
    ],
    prevention: "Monitor the crop regularly and follow locally recommended crop-care practices."
  };

  const isHealthy = label === "normal";

  let severity = "medium";

  if (isHealthy || confidence < 60) {
    severity = "low";
  } else if (confidence >= 85) {
    severity = "high";
  }

  return {
    crop: "Rice",
    issue: info.issue,
    confidence: Math.round(Math.max(0, Math.min(100, confidence))),
    severity,
    treatment: info.treatment,
    prevention: info.prevention,
    source: "paddy-ml",
    lowConfidence: confidence < 60,
    disclaimer:
      confidence < 60
        ? "The model is not confident about this photo. Retake it in good light with one leaf filling the frame, and confirm with a local agriculture officer."
        : "AI result from a leaf photo. Confirm with a local agriculture officer before using any chemical.",
    predictions: payload.predictions.map((item) => {
      const itemLabel = String(item.label || "").trim().toLowerCase();
      const itemInfo = DISEASE_INFO[itemLabel];

      return {
        label: itemLabel,
        issue: itemInfo
          ? itemInfo.issue
          : itemLabel.replace(/_/g, " "),
        confidence: Number(item.confidence) <= 1
          ? Number(item.confidence) * 100
          : Number(item.confidence)
      };
    })
  };
}

module.exports = {
  analyzePaddyImage,
  warmUp: () => (isLocalModelAvailable() ? loadModel().catch((e) => console.warn("Paddy model preload failed:", e.message)) : null),
  isRiceCrop
};
