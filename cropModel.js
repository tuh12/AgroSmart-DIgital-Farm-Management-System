const cropProfiles = [
  { label: "rice", n: 80, p: 48, k: 40, temperature: 24, humidity: 82, ph: 6.5, rainfall: 210, season: "Aman/Boro", water: "High", notes: "Works best in warm, humid fields with reliable standing water." },
  { label: "maize", n: 77, p: 48, k: 20, temperature: 23, humidity: 65, ph: 6.3, rainfall: 85, season: "Rabi/Kharif", water: "Medium", notes: "Good for well-drained loam with balanced nitrogen and moderate rainfall." },
  { label: "chickpea", n: 40, p: 68, k: 78, temperature: 18, humidity: 16, ph: 7.3, rainfall: 80, season: "Rabi", water: "Low", notes: "Prefers cool, dry weather and neutral to slightly alkaline soil." },
  { label: "kidneybeans", n: 20, p: 67, k: 20, temperature: 20, humidity: 21, ph: 5.8, rainfall: 105, season: "Rabi", water: "Low", notes: "Needs moderate phosphorus and careful drainage." },
  { label: "pigeonpeas", n: 20, p: 68, k: 20, temperature: 27, humidity: 48, ph: 5.8, rainfall: 150, season: "Kharif", water: "Low", notes: "Tolerates warmer conditions and improves soil nitrogen." },
  { label: "mothbeans", n: 21, p: 48, k: 20, temperature: 28, humidity: 53, ph: 6.8, rainfall: 51, season: "Kharif", water: "Low", notes: "Suitable for dry areas with low rainfall." },
  { label: "mungbean", n: 21, p: 47, k: 20, temperature: 28, humidity: 85, ph: 6.7, rainfall: 50, season: "Kharif", water: "Low", notes: "Short-duration pulse crop for warm humid periods." },
  { label: "blackgram", n: 40, p: 68, k: 19, temperature: 30, humidity: 65, ph: 7.1, rainfall: 67, season: "Kharif", water: "Low", notes: "Performs well in warm fields with moderate humidity." },
  { label: "lentil", n: 18, p: 68, k: 19, temperature: 24, humidity: 65, ph: 6.9, rainfall: 45, season: "Rabi", water: "Low", notes: "Best for winter season with light irrigation." },
  { label: "pomegranate", n: 19, p: 18, k: 40, temperature: 22, humidity: 90, ph: 6.4, rainfall: 105, season: "Perennial", water: "Medium", notes: "Needs careful pest monitoring in humid areas." },
  { label: "banana", n: 100, p: 82, k: 50, temperature: 27, humidity: 80, ph: 6.0, rainfall: 105, season: "Year-round", water: "High", notes: "High nutrient demand; keep soil moist and organic-rich." },
  { label: "mango", n: 20, p: 27, k: 30, temperature: 31, humidity: 50, ph: 5.8, rainfall: 95, season: "Summer", water: "Medium", notes: "Prefers warm weather and deep, well-drained soil." },
  { label: "grapes", n: 23, p: 132, k: 200, temperature: 24, humidity: 82, ph: 6.0, rainfall: 70, season: "Dry season", water: "Medium", notes: "Needs high potassium and trellis management." },
  { label: "watermelon", n: 100, p: 17, k: 50, temperature: 25, humidity: 85, ph: 6.5, rainfall: 55, season: "Summer", water: "Medium", notes: "Good for sandy loam with consistent moisture." },
  { label: "muskmelon", n: 100, p: 18, k: 50, temperature: 28, humidity: 92, ph: 6.4, rainfall: 25, season: "Summer", water: "Medium", notes: "Prefers warm, sunny, low-rainfall conditions." },
  { label: "apple", n: 20, p: 135, k: 200, temperature: 22, humidity: 92, ph: 5.8, rainfall: 112, season: "Temperate", water: "Medium", notes: "High potassium profile; suitable only for cooler microclimates." },
  { label: "orange", n: 19, p: 16, k: 10, temperature: 22, humidity: 92, ph: 7.0, rainfall: 110, season: "Winter", water: "Medium", notes: "Works in well-drained soil with balanced pH." },
  { label: "papaya", n: 50, p: 60, k: 50, temperature: 33, humidity: 92, ph: 6.7, rainfall: 145, season: "Year-round", water: "Medium", notes: "Fast-growing fruit crop for warm humid farms." },
  { label: "coconut", n: 22, p: 17, k: 30, temperature: 27, humidity: 95, ph: 5.9, rainfall: 175, season: "Perennial", water: "High", notes: "Best in humid, coastal, high-rainfall zones." },
  { label: "cotton", n: 118, p: 46, k: 19, temperature: 24, humidity: 80, ph: 6.8, rainfall: 80, season: "Kharif", water: "Medium", notes: "Needs high nitrogen and strong pest scouting." },
  { label: "jute", n: 78, p: 46, k: 40, temperature: 25, humidity: 80, ph: 6.7, rainfall: 175, season: "Kharif", water: "High", notes: "Strong Bangladesh fit in warm, humid, high-rainfall fields." },
  { label: "coffee", n: 101, p: 28, k: 30, temperature: 25, humidity: 58, ph: 6.7, rainfall: 160, season: "Perennial", water: "Medium", notes: "Needs shaded, warm, well-drained land." }
];

const ranges = {
  n: 140,
  p: 145,
  k: 205,
  temperature: 28,
  humidity: 90,
  ph: 8,
  rainfall: 280
};

function toFeatures(input) {
  return {
    n: Number(input.nitrogen ?? input.n ?? input.N),
    p: Number(input.phosphorus ?? input.p ?? input.P),
    k: Number(input.potassium ?? input.k ?? input.K),
    temperature: Number(input.temperature),
    humidity: Number(input.humidity),
    ph: Number(input.ph ?? input.pH),
    rainfall: Number(input.rainfall)
  };
}

function validateFeatures(features) {
  const missing = Object.entries(features)
    .filter(([, value]) => !Number.isFinite(value))
    .map(([key]) => key);

  if (missing.length) {
    return `Missing or invalid values: ${missing.join(", ")}`;
  }

  if (features.ph < 0 || features.ph > 14) {
    return "pH must be between 0 and 14";
  }

  return null;
}

function scoreCrop(features, crop) {
  const squaredDistance = Object.keys(features).reduce((total, key) => {
    const distance = (features[key] - crop[key]) / ranges[key];
    return total + distance * distance;
  }, 0);

  const distance = Math.sqrt(squaredDistance);
  const confidence = Math.max(0, Math.min(99, 100 - distance * 52));

  return {
    crop: crop.label,
    confidence: Number(confidence.toFixed(1)),
    season: crop.season,
    water: crop.water,
    notes: crop.notes,
    matchScore: Number((100 - distance * 100).toFixed(1))
  };
}

function recommendCrop(input) {
  const features = toFeatures(input);
  const error = validateFeatures(features);

  if (error) {
    const validationError = new Error(error);
    validationError.statusCode = 400;
    throw validationError;
  }

  const recommendations = cropProfiles
    .map((crop) => scoreCrop(features, crop))
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 5);

  const primary = recommendations[0];
  const advice = buildAdvice(features, primary);

  return {
    input: features,
    primary,
    alternatives: recommendations.slice(1),
    advice,
    source: "Kaggle Crop Recommendation Dataset feature profile"
  };
}

function buildAdvice(features, primary) {
  const advice = [];

  if (features.ph < 5.8) {
    advice.push("Soil is acidic. Apply agricultural lime after local soil testing.");
  } else if (features.ph > 7.8) {
    advice.push("Soil is alkaline. Add organic compost and monitor micronutrient availability.");
  } else {
    advice.push("Soil pH is in a workable range for many crops.");
  }

  if (features.rainfall < 55) {
    advice.push("Rainfall is low. Plan drip irrigation or short-cycle crops.");
  } else if (features.rainfall > 170) {
    advice.push("Rainfall is high. Keep drainage channels ready and watch fungal disease.");
  }

  if (features.n < 35) {
    advice.push("Nitrogen is low. Use compost, green manure, or balanced N fertilizer.");
  }

  advice.push(`${title(primary.crop)} is the best match from the current soil and weather profile.`);

  return advice;
}

function title(value) {
  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

module.exports = {
  cropProfiles,
  recommendCrop
};
