// Runs the exported TensorFlow.js rice-disease model directly inside Node,
// so no separate Python server is needed.
//
// Expected folder (created by unzipping rice_model_tfjs.zip from Colab):
//   tfjs_model/model.json
//   tfjs_model/group1-shard1of3.bin ... shard3of3.bin
//   tfjs_model/labels.json
//
// The model has NO built-in scaling layer, so we apply MobileNetV2
// preprocessing ourselves: pixel / 127.5 - 1  (range -1 .. 1).

const fs = require("fs");
const path = require("path");

const MODEL_DIR = process.env.PADDY_MODEL_DIR || path.join(__dirname, "tfjs_model");
const IMG_SIZE = 224;

let tf;
let sharp;
let modelPromise = null;
let labels = [];

function isLocalModelAvailable() {
  return fs.existsSync(path.join(MODEL_DIR, "model.json"));
}

function loadLabels() {
  const candidates = [
    path.join(MODEL_DIR, "labels.json"),
    path.join(__dirname, "labels.json")
  ];
  for (const file of candidates) {
    if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, "utf8"));
  }
  throw new Error("labels.json not found (put it in tfjs_model/ or the project root).");
}

async function loadModel() {
  if (!modelPromise) {
    modelPromise = (async () => {
      tf = require("@tensorflow/tfjs");
      sharp = require("sharp");
      labels = loadLabels();

      const json = JSON.parse(fs.readFileSync(path.join(MODEL_DIR, "model.json"), "utf8"));

      const weightSpecs = [];
      const buffers = [];
      for (const group of json.weightsManifest) {
        for (const file of group.paths) {
          buffers.push(fs.readFileSync(path.join(MODEL_DIR, file)));
        }
        weightSpecs.push(...group.weights);
      }
      const all = Buffer.concat(buffers);
      const weightData = all.buffer.slice(all.byteOffset, all.byteOffset + all.byteLength);

      const handler = tf.io.fromMemory({
        modelTopology: json.modelTopology,
        weightSpecs,
        weightData,
        format: json.format,
        generatedBy: json.generatedBy,
        convertedBy: json.convertedBy,
        signature: json.signature
      });

      const model = await tf.loadGraphModel(handler);

      // Warm-up so the first real request is not slow.
      tf.tidy(() => {
        const out = model.predict(tf.zeros([1, IMG_SIZE, IMG_SIZE, 3]));
        out.dataSync();
      });

      console.log(`Paddy model loaded locally (${labels.length} classes).`);
      return model;
    })().catch((error) => {
      modelPromise = null; // allow retry
      throw error;
    });
  }
  return modelPromise;
}

async function predictLocal(imageBase64, topK = 3) {
  const model = await loadModel();

  const raw = Buffer.from(imageBase64, "base64");
  const { data } = await sharp(raw)
    .rotate() // respect phone EXIF orientation
    .removeAlpha()
    .resize(IMG_SIZE, IMG_SIZE, { fit: "fill", kernel: "cubic" })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const probs = tf.tidy(() => {
    const pixels = Float32Array.from(data, (v) => v / 127.5 - 1);
    const input = tf.tensor4d(pixels, [1, IMG_SIZE, IMG_SIZE, 3]);
    const output = model.predict(input);
    return Array.from(output.dataSync());
  });

  return probs
    .map((p, i) => ({ label: labels[i] ?? `class_${i}`, confidence: p * 100 }))
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, topK);
}

module.exports = { isLocalModelAvailable, predictLocal, loadModel };
