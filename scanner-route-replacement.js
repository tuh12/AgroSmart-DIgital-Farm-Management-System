// index.js e agey ei line ta thakte hobe (already ache):
// const { analyzePaddyImage, isRiceCrop, preloadModel } = require("./paddyModel");
//
// "app.listen(PORT, ...)" er thik age, ba tar bhitore, eita add koro:
//   preloadModel();
//
// Tarpor puro app.post("/api/scanner/leaf", ...) block ta nicher ta diye replace koro:

app.post("/api/scanner/leaf", authMiddleware, async (req, res) => {
  const body = req.body || {};
  let imageBase64 = String(body.imageBase64 || "");

  if (imageBase64.startsWith("data:")) {
    imageBase64 = imageBase64.slice(imageBase64.indexOf(",") + 1);
  }

  let result;

  if (isRiceCrop(body.crop) && imageBase64) {
    try {
      result = await analyzePaddyImage({ imageBase64 });
    } catch (error) {
      // Ager moto silently keyword rule e jabe na. Error clear dekhabe.
      console.error("Paddy ML failed:", error);
      return res.status(502).json({
        message: "Rice scanner model could not process this image. Please try again."
      });
    }
  } else {
    result = analyzeLeaf(body);
  }

  const data = readData();
  data.scans.push({
    id: createId("scan"),
    userId: req.auth.id,
    crop: result.crop,
    imageName: body.imageName || "",
    symptoms: Array.isArray(body.symptoms) ? body.symptoms : [],
    notes: body.notes || "",
    issue: result.issue,
    confidence: result.confidence,
    severity: result.severity,
    createdAt: new Date().toISOString()
  });
  writeData(data);

  return res.json({ result });
});
