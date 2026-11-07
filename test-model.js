// Usage:  node test-model.js <folder-with-test-photos>
// Prints what the model predicts for every photo under 3 different pixel
// scalings, so you can see which one matches how the model was trained.
// Name your photos after the real disease (e.g. "ufra_1.jpg", "blast_2.jpg").
const fs = require("fs");
const path = require("path");
const { isLocalModelAvailable, predictLocal, loadModel, getLabels, MODEL_DIR } = require("./paddyLocal");

(async () => {
  const dir = process.argv[2];
  if (!dir || !fs.existsSync(dir)) return console.log("Usage: node test-model.js <folder-with-photos>");
  if (!isLocalModelAvailable()) return console.log(`No model.json in ${MODEL_DIR}`);

  await loadModel();
  console.log("\nClasses the model knows:", getLabels().join(", "));

  const topo = fs.readFileSync(path.join(MODEL_DIR, "model.json"), "utf8");
  const found = ["Rescaling", "Normalization", "preprocess_input", "TrueDivide", "RealDiv"].filter((k) => topo.includes(k));
  console.log(found.length
    ? `\n!! The model file contains scaling operations (${found.join(", ")}). It probably scales pixels itself -> try mode "raw".`
    : "\nNo built-in scaling found in model.json (mode \"signed\" or \"unit\" expected).");

  const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  for (const file of files) {
    const b64 = fs.readFileSync(path.join(dir, file)).toString("base64");
    console.log(`\n== ${file}`);
    for (const mode of ["signed", "unit", "raw"]) {
      const top = await predictLocal(b64, 3, mode);
      console.log(`  ${mode.padEnd(6)} -> ` + top.map((p) => `${p.label} ${p.confidence.toFixed(0)}%`).join(" | "));
    }
  }
  console.log("\nPick the mode that is right most often, then start the server with  PADDY_PREPROCESS=<mode>  (or add it to .env).");
  console.log("If EVERY mode is wrong for diseases the model has, the model itself is weak -> retrain.");
})();
