const crypto = require("crypto");

const secret = process.env.JWT_SECRET || "smart-agro-local-development-secret";

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(String(password), salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, passwordHash) {
  try {
    const [salt, storedHash] = String(passwordHash || "").split(":");

    if (!salt || !storedHash) {
      return false;
    }

    const scryptHash = crypto.scryptSync(String(password), salt, 64).toString("hex");

    if (
      scryptHash.length === storedHash.length &&
      crypto.timingSafeEqual(Buffer.from(storedHash, "hex"), Buffer.from(scryptHash, "hex"))
    ) {
      return true;
    }

    const legacyHash = crypto
      .pbkdf2Sync(String(password), salt, 120000, 64, "sha512")
      .toString("hex");

    return (
      legacyHash.length === storedHash.length &&
      crypto.timingSafeEqual(Buffer.from(storedHash, "hex"), Buffer.from(legacyHash, "hex"))
    );
  } catch (error) {
    return false;
  }
}

function signToken(payload) {
  const body = Buffer.from(JSON.stringify({
    ...payload,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7
  })).toString("base64url");
  const signature = crypto.createHmac("sha256", secret).update(body).digest("base64url");
  return `${body}.${signature}`;
}

function verifyToken(token) {
  if (!token || !token.includes(".")) return null;
  const [body, signature] = token.split(".");
  const expected = crypto.createHmac("sha256", secret).update(body).digest("base64url");

  if (signature.length !== expected.length) {
    return null;
  }

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return null;
  }

  const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  if (payload.exp < Date.now()) return null;
  return payload;
}

module.exports = {
  hashPassword,
  verifyPassword,
  signToken,
  verifyToken
};
