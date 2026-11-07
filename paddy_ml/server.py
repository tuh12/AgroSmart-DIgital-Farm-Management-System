import base64, io, json, os
import numpy as np
from flask import Flask, request, jsonify
from PIL import Image
import tensorflow as tf

IMG = 224
BASE = os.path.dirname(__file__)
model = tf.keras.models.load_model(os.path.join(BASE, "rice_model.keras"))
labels = json.load(open(os.path.join(BASE, "labels.json"), encoding="utf-8"))

app = Flask(__name__)

@app.get("/health")
def health():
    return jsonify(ok=True)

@app.post("/predict")
def predict():
    data = request.get_json(force=True)
    b64 = data.get("imageBase64", "")
    if "," in b64[:50]:
        b64 = b64.split(",", 1)[1]

    img = Image.open(io.BytesIO(base64.b64decode(b64))).convert("RGB").resize((IMG, IMG))
    arr = tf.keras.applications.mobilenet_v2.preprocess_input(
        np.array(img, dtype="float32")
    )
    probs = model.predict(np.expand_dims(arr, 0), verbose=0)[0]

    top = np.argsort(probs)[::-1][:3]
    return jsonify(predictions=[
        {"label": labels[i], "confidence": round(float(probs[i]) * 100, 2)} for i in top
    ])

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001)