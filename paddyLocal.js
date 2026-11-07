// Runs the exported TensorFlow.js rice-disease model directly inside Node.
//
// Expected folder (unzip rice_model_tfjs.zip from Colab next to this file):
//   tfjs_model/model.json
//   tfjs_model/group1-shard*.bin
//   tfjs_model/labels.json
//
// FIXES vs old version:
//  - supports BOTH "layers-model" (Keras export) and "graph-model"
//    (old code only did loadGraphModel -> failed on Keras exports)
//  - labels.json may be an array OR an {index: label} object
//  - applies softmax if the model outputs logits
//  - real error messages are kept so the server log shows WHY it failed

const fs = require("fs");
const path = require("path");

const MODEL_DIR = process.env.PADDY_MODEL_DIR || path.join(__dirname, "tfjs_model");
const IMG_SIZE = 224;
const PREPROCESS = process.env.PADDY_PREPROCESS || "signed";

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
    if (!fs.existsSync(file)) continue;

    const raw = JSON.parse(fs.readFileSync(file, "utf8"));
    const list = Array.isArray(raw)
      ? raw
      : Object.entries(raw)
          .sort((a, b) => Number(a[0]) - Number(b[0]))
          .map(([, value]) => value);

    return list.map((item) => String(item).trim().toLowerCase());
  }

  throw new Error("labels.json not found (put it in tfjs_model/ or the project root).");
}

async function loadModel() {
  if (!modelPromise) {
    modelPromise = (async () => {
      tf = require("@tensorflow/tfjs");
      sharp = require("sharp");
      await tf.setBackend("cpu");
      await tf.ready();

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

      const isGraph =
        json.format === "graph-model" ||
        (json.modelTopology && Array.isArray(json.modelTopology.node));

      const model = isGraph
        ? await tf.loadGraphModel(handler)
        : await tf.loadLayersModel(handler);

      // Warm-up so the first real request is not slow.
      const outLen = tf.tidy(() => {
        const out = model.predict(tf.zeros([1, IMG_SIZE, IMG_SIZE, 3]));
        return out.dataSync().length;
      });

      if (outLen !== labels.length) {
        console.warn(
          `Paddy model outputs ${outLen} classes but labels.json has ${labels.length}. ` +
            "Labels may be in the wrong order / file!"
        );
      }

      console.log(
        `Paddy model loaded locally (${isGraph ? "graph" : "layers"} model, ${outLen} classes).`
      );
      return model;
    })().catch((error) => {
      modelPromise = null; // allow retry on next request
      console.error("Paddy model load FAILED:", error);
      throw error;
    });
  }
  return modelPromise;
}

function softmax(values) {
  const max = Math.max(...values);
  const exps = values.map((v) => Math.exp(v - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((v) => v / sum);
}

function scalePixels(data, mode) {
  if (mode === "unit") return Float32Array.from(data, (v) => v / 255);
  if (mode === "raw") return Float32Array.from(data, (v) => v);
  return Float32Array.from(data, (v) => v / 127.5 - 1); // MobileNetV2 default
}

function getLabels() {
  return labels;
}

async function predictLocal(imageBase64, topK = 3, mode = PREPROCESS) {
  const model = await loadModel();

  const raw = Buffer.from(imageBase64, "base64");
  const { data } = await sharp(raw)
    .rotate() // respect phone EXIF orientation
    .removeAlpha()
    .resize(IMG_SIZE, IMG_SIZE, { fit: "fill", kernel: "cubic" })
    .raw()
    .toBuffer({ resolveWithObject: true });

  let probs = tf.tidy(() => {
    const input = tf.tensor4d(scalePixels(data, mode), [1, IMG_SIZE, IMG_SIZE, 3]);
    const output = model.predict(input);
    return Array.from(output.dataSync());
  });

  // If the model returned logits (not probabilities), convert them.
  const sum = probs.reduce((a, b) => a + b, 0);
  if (probs.some((p) => p < 0 || p > 1) || Math.abs(sum - 1) > 0.05) {
    probs = softmax(probs);
  }

  return probs
    .map((p, i) => ({ label: labels[i] ?? `class_${i}`, confidence: p * 100 }))
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, topK);
}

module.exports = { isLocalModelAvailable, predictLocal, loadModel, getLabels, MODEL_DIR };