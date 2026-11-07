// Usage:  node test-vision.js [path-to-photo.jpg]
// Sends ONE proper POST to the Anthropic API with the key from .env and prints
// exactly what came back, so we can see where "Method Not Allowed" comes from.
require("dotenv").config({ quiet: true });
const fs = require("fs");

(async () => {
  const key = process.env.ANTHROPIC_API_KEY;
  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";
  console.log("API key set     :", Boolean(key), key ? `(starts with ${key.slice(0, 7)}..., length ${key.length})` : "");
  console.log("Model           :", model);
  if (!key) return console.log("\nANTHROPIC_API_KEY is missing in .env");

  const photo = process.argv[2];
  const content = [{ type: "text", text: "Reply with the single word: ok" }];
  if (photo) {
    const data = fs.readFileSync(photo).toString("base64");
    const media = /\.png$/i.test(photo) ? "image/png" : /\.webp$/i.test(photo) ? "image/webp" : "image/jpeg";
    content.unshift({ type: "image", source: { type: "base64", media_type: media, data } });
    content[1].text = "What plant part and colours do you see? One short sentence.";
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      redirect: "manual",
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model, max_tokens: 100, messages: [{ role: "user", content }] }),
      signal: AbortSignal.timeout(30000)
    });
    console.log("\nHTTP status     :", res.status);
    if (res.status >= 300 && res.status < 400) console.log("REDIRECT to     :", res.headers.get("location"), "  <-- a proxy/VPN/firewall is redirecting the request");
    console.log("Response body   :", (await res.text()).slice(0, 800));
  } catch (e) {
    console.log("\nRequest failed  :", e.message, e.cause ? `(${e.cause.code || e.cause.message})` : "");
  }
})();
