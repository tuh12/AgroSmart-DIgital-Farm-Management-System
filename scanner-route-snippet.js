// index.js te (scanner route er bhitore) ei logic bosao.
// Upore require koro:
const { analyzePaddyImage, isRiceCrop } = require("./paddyModel");
const { analyzeLeafImage } = require("./visionDiagnosis");

// Scanner endpoint er bhitore, imageBase64 / mimeType / crop / lang paoar por:
let result;
if (isRiceCrop(crop)) {
  try {
    result = await analyzePaddyImage({ imageBase64 });   // local ML model
  } catch (err) {
    console.warn("Paddy ML failed, falling back to Gemini:", err.message);
    result = await analyzeLeafImage({ imageBase64, mimeType, cropName: crop, lang });
  }
} else {
  result = await analyzeLeafImage({ imageBase64, mimeType, cropName: crop, lang });
}
// tarpor ager moto result save/res.json koro.
// NOTE: imageBase64 te "data:image/...;base64," prefix thakle strip kore pathao.
