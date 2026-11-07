const crypto = require("crypto");

// Password hashing only. Session tokens are created/verified in index.js
// (the old signToken/verifyToken here were unused duplicates with a
// different, hard-coded fallback secret).

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(String(password), salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function safeEqualHex(a, b) {
  return a.length === b.length && crypto.timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
}

function verifyPassword(password, passwordHash) {
  try {
    const [salt, storedHash] = String(passwordHash || "").split(":");
    if (!salt || !storedHash) return false;

    const scryptHash = crypto.scryptSync(String(password), salt, 64).toString("hex");
    if (safeEqualHex(storedHash, scryptHash)) return true;

    // Legacy hashes created by older versions.
    const legacyHash = crypto
      .pbkdf2Sync(String(password), salt, 120000, 64, "sha512")
      .toString("hex");
    return safeEqualHex(storedHash, legacyHash);
  } catch (error) {
    return false;
  }
}

module.exports = { hashPassword, verifyPassword };
