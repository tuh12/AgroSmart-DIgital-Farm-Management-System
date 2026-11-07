const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const sharp = require("sharp");

require("dotenv").config({ quiet: true });

const express = require("express");
const cors = require("cors");
const { hashPassword, verifyPassword } = require("./auth");
const { recommendCrop } = require("./cropModel");
const {
  cropLibrary,
  pestGuide,
  fertilizerGuide,
  DEFAULT_FERTILIZER,
  getFertilizerDose
} = require("./cropKnowledge");
const { analyzeLeaf } = require("./leafScanner");
const { analyzePaddyImage, isRiceCrop, warmUp: warmUpPaddyModel } = require("./paddyModel");
const { isLocalModelAvailable } = require("./paddyLocal");
const { diagnoseRiceWithVision, isEnabled: visionEnabled } = require("./visionDiagnosis");
const { initializeDatabase, readData, writeData } = require("./store");

const app = express();
const PORT = Number(process.env.PORT) || 4000;
const JWT_SECRET =
  process.env.JWT_SECRET || "smart-agro-secret-key-change-this";

if (process.env.NODE_ENV === "production" && !process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET must be set in production");
}

initializeDatabase();

app.use(cors());
app.use(express.json({ limit: "15mb" }));
// Serve ONLY the front-end files. Previously express.static(__dirname) exposed
// the whole project folder (data/smart-agro.sqlite, auth.js, store.js ...).
const PUBLIC_FILES = new Set(["index.html", "app.js", "styles.css"]);
app.use((req, res, next) => {
  if (req.method !== "GET" && req.method !== "HEAD") return next();
  let name;
  try { name = decodeURIComponent(req.path).replace(/^\/+/, ""); } catch (e) { return next(); }
  // Front-end files + image files that sit directly in the project root
  // (e.g. "ChatGPT Image ....png", "images (1).jpg"). No sub-folders, no "..".
  const isRootImage = /^[^/\\]+\.(jpg|jpeg|png|webp|svg|ico)$/i.test(name) && !name.includes("..");
  if (PUBLIC_FILES.has(name) || isRootImage) {
    const file = path.join(__dirname, name);
    if (fs.existsSync(file)) return res.sendFile(file);
  }
  return next();
});

const SCAN_IMG_DIR = path.join(__dirname, "data", "scan-images");
fs.mkdirSync(SCAN_IMG_DIR, { recursive: true });
app.use("/scan-images", express.static(SCAN_IMG_DIR, { index: false, dotfiles: "deny", maxAge: "7d" }));

async function saveScanThumb(scanId, imageBase64) {
  if (!imageBase64) return null;
  try {
    await sharp(Buffer.from(imageBase64, "base64"))
      .rotate()
      .resize(480, 480, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 75 })
      .toFile(path.join(SCAN_IMG_DIR, `${scanId}.jpg`));
    return `/scan-images/${scanId}.jpg`;
  } catch (error) {
    console.warn("Could not save scan thumbnail:", error.message);
    return null;
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function createId(prefix) {
  return `${prefix}_${crypto.randomUUID()}`;
}

function createOtp() {
  return String(crypto.randomInt(100000, 1000000));
}

function hashOtp(otp) {
  return crypto
    .createHash("sha256")
    .update(String(otp))
    .digest("hex");
}

function maskPhone(phone) {
  const value = String(phone);

  if (value.length <= 4) {
    return "****";
  }

  return `${"*".repeat(value.length - 4)}${value.slice(-4)}`;
}

function sendPhoneVerification(phone, otp) {
  console.log(`Demo OTP for ${phone}: ${otp}`);
}


/* Token functions */
function createToken(payload) {
  const header = Buffer.from(
    JSON.stringify({
      alg: "HS256",
      typ: "JWT"
    })
  ).toString("base64url");

  const body = Buffer.from(
    JSON.stringify({
      ...payload,
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60
    })
  ).toString("base64url");

  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${header}.${body}`)
    .digest("base64url");

  return `${header}.${body}.${signature}`;
}

function verifyToken(token) {
  const parts = String(token).split(".");

  if (parts.length !== 3) {
    throw new Error("Invalid token");
  }

  const [header, body, signature] = parts;

  const expectedSignature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${header}.${body}`)
    .digest("base64url");

  if (
    signature.length !== expectedSignature.length ||
    !crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    )
  ) {
    throw new Error("Invalid token signature");
  }

  const payload = JSON.parse(
    Buffer.from(body, "base64url").toString("utf8")
  );

  if (payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error("Token expired");
  }

  return payload;
}

function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization || "";

  if (!authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication token is required"
    });
  }

  const token = authorization.slice(7);

  try {
    req.auth = verifyToken(token);
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}

function buildDashboardPayload(userId) {
  const data = readData();
  const farms = data.farms.filter((farm) => farm.userId === userId);
  const byNewest = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
  const recommendations = data.recommendations
    .filter((item) => item.userId === userId)
    .sort(byNewest)
    .slice(0, 5);
  const tasks = data.tasks.filter((task) => task.userId === userId);
  const allComplaints = data.complaints.filter((item) => item.userId === userId);
  const allScans = data.scans.filter((scan) => scan.userId === userId);
  const complaints = [...allComplaints].sort(byNewest).slice(0, 6);
  const scans = [...allScans].sort(byNewest).slice(0, 6);
  const marketPrices = (data.marketPrices || [])
    .filter((item) => item.userId === userId)
    .sort(byNewest)
    .slice(0, 6);

  const totalArea = farms.reduce((sum, farm) => sum + Number(farm.area || 0), 0);
  const avgHealth = farms.length
    ? Math.round(
        farms.reduce((sum, farm) => sum + Number(farm.health || 0), 0) / farms.length
      )
    : 0;

  const alerts = [];
  if (farms.some((farm) => Number(farm.health || 0) < 60)) {
    alerts.push("Some fields need attention because health is below 60%.");
  }
  if (tasks.some((task) => task.status !== "done")) {
    alerts.push("Open field tasks are still pending.");
  }
  if (allComplaints.some((item) => item.status === "open")) {
    alerts.push("New farmer complaints require follow-up.");
  }
  if (!alerts.length) {
    alerts.push("Everything looks balanced. Keep the routine checks going.");
  }

  return {
    metrics: {
      fields: farms.length,
      totalArea: Number(totalArea.toFixed(1)),
      avgHealth,
      openTasks: tasks.filter((task) => task.status !== "done").length,
      openComplaints: allComplaints.filter((item) => item.status === "open").length,
      scans: allScans.length
    },
    alerts,
    farms,
    recommendations,
    tasks,
    complaints,
    scans,
    marketPrices
  };
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    message: "Server is running"
  });
});

function requestSignupOtp(req, res) {
  const {
    name,
    email,
    password,
    phone = "",
    location = ""
  } = req.body || {};

  if (!name || !email || !password || !phone) {
    return res.status(400).json({
      message: "Name, email, phone, and password are required"
    });
  }

  if (String(password).length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters"
    });
  }

  const normalizedEmail = String(email)
    .trim()
    .toLowerCase();

  const normalizedPhone = String(phone).trim();

  const data = readData();

  const accountExists = data.users.some(
    (user) =>
      user.email === normalizedEmail ||
      user.phone === normalizedPhone
  );

  if (accountExists) {
    return res.status(409).json({
      message: "An account already exists with this email or phone"
    });
  }

  const otp = createOtp();

  const verification = {
    id: createId("otp"),
    name: String(name).trim(),
    email: normalizedEmail,
    phone: normalizedPhone,
    location: String(location).trim(),
    passwordHash: hashPassword(password),
    otpHash: hashOtp(otp),
    expiresAt: new Date(
      Date.now() + 10 * 60 * 1000
    ).toISOString(),
    attempts: 0,
    createdAt: new Date().toISOString()
  };

  data.pendingSignups = data.pendingSignups.filter(
    (item) =>
      item.email !== normalizedEmail &&
      item.phone !== normalizedPhone
  );

  data.pendingSignups.push(verification);

  writeData(data);

  sendPhoneVerification(normalizedPhone, otp);

  return res.status(202).json({
    message: `Verification code sent to ${maskPhone(
      normalizedPhone
    )}.`,
    verificationId: verification.id,
    demoOtp:
      process.env.NODE_ENV === "production"
        ? undefined
        : otp
  });
}

app.post("/api/auth/signup", (req, res) => {
  const { name, email, password, phone = "", location = "" } = req.body || {};

  if (!name || !email || !password || !phone) {
    return res.status(400).json({
      message: "Name, email, phone, and password are required"
    });
  }

  if (String(password).length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters"
    });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const normalizedPhone = String(phone).trim();

  if (!EMAIL_RE.test(normalizedEmail)) {
    return res.status(400).json({ message: "Please enter a valid email address" });
  }

  const data = readData();

  if (data.users.some((user) => user.email === normalizedEmail || user.phone === normalizedPhone)) {
    return res.status(409).json({
      message: "An account already exists with this email or phone"
    });
  }

  const user = {
    id: createId("usr"),
    name: String(name).trim(),
    email: normalizedEmail,
    phone: normalizedPhone,
    location: String(location).trim(),
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString()
  };

  data.users.push(user);
  writeData(data);

  const token = createToken({ id: user.id, email: user.email });

  return res.status(201).json({
    message: "Account created successfully",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location
    }
  });
});

app.post("/api/auth/request-signup-otp", requestSignupOtp);

app.post("/api/auth/verify-signup", (req, res) => {
  const { verificationId, otp } = req.body || {};

  if (!verificationId || !otp) {
    return res.status(400).json({
      message: "Verification ID and OTP are required"
    });
  }

  const data = readData();

  const verification = data.pendingSignups.find(
    (item) => item.id === verificationId
  );

  if (!verification) {
    return res.status(404).json({
      message: "Verification request not found. Please sign up again."
    });
  }

  const isExpired =
    new Date(verification.expiresAt).getTime() <
    Date.now();

  if (isExpired) {
    data.pendingSignups = data.pendingSignups.filter(
      (item) => item.id !== verificationId
    );

    writeData(data);

    return res.status(410).json({
      message: "Verification code expired. Please sign up again."
    });
  }

  verification.attempts += 1;

  if (verification.attempts > 5) {
    data.pendingSignups = data.pendingSignups.filter(
      (item) => item.id !== verificationId
    );

    writeData(data);

    return res.status(429).json({
      message: "Too many wrong attempts. Please sign up again."
    });
  }

  const correctOtp =
    verification.otpHash === hashOtp(String(otp).trim());

  if (!correctOtp) {
    writeData(data);

    return res.status(400).json({
      message: "Invalid verification code"
    });
  }

  const accountExists = data.users.some(
    (user) =>
      user.email === verification.email ||
      user.phone === verification.phone
  );

  if (accountExists) {
    data.pendingSignups = data.pendingSignups.filter(
      (item) => item.id !== verificationId
    );

    writeData(data);

    return res.status(409).json({
      message: "An account already exists with this email or phone"
    });
  }

  const user = {
    id: createId("usr"),
    name: verification.name,
    email: verification.email,
    phone: verification.phone,
    phoneVerified: true,
    location: verification.location,
    passwordHash: verification.passwordHash,
    createdAt: new Date().toISOString()
  };

  data.users.push(user);

  data.pendingSignups = data.pendingSignups.filter(
    (item) => item.id !== verificationId
  );

  writeData(data);

  const token = createToken({
    id: user.id,
    email: user.email
  });

  return res.status(201).json({
    message: "Account created successfully",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location
    }
  });
});

/* Login */
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required"
    });
  }

  const normalizedEmail = String(email)
    .trim()
    .toLowerCase();

  const data = readData();

  const user = data.users.find(
    (item) => item.email === normalizedEmail
  );

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  const token = createToken({
    id: user.id,
    email: user.email
  });

  return res.json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location
    }
  });
});

app.post("/api/auth/forgot-password", (req, res) => {
  // SECURITY: anyone could reset any account's password knowing only the email.
  // Enabled only when ALLOW_INSECURE_RESET=true (local demo). Replace with an
  // OTP/email-link flow before deploying.
  if (process.env.ALLOW_INSECURE_RESET !== "true") {
    return res.status(501).json({
      message: "Password reset needs OTP/email verification and is disabled."
    });
  }
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and new password are required"
    });
  }

  if (String(password).length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters"
    });
  }

  const normalizedEmail = String(email)
    .trim()
    .toLowerCase();

  const data = readData();
  const user = data.users.find(
    (item) => item.email === normalizedEmail
  );

  if (!user) {
    return res.status(404).json({
      message: "No account found with this email"
    });
  }

  user.passwordHash = hashPassword(password);
  user.passwordUpdatedAt = new Date().toISOString();

  writeData(data);

  return res.json({
    message: "Password updated successfully"
  });
});

app.post("/api/auth/social", (req, res) => {
  // SECURITY: this endpoint trusts the client-supplied email, so anyone can sign
  // in as any existing user. Disabled until real Google/Facebook token
  // verification is implemented (ALLOW_INSECURE_SOCIAL=true for demos only).
  if (process.env.ALLOW_INSECURE_SOCIAL !== "true") {
    return res.status(501).json({ message: "Social sign-in is not configured." });
  }
  const {
    provider = "google",
    name,
    email,
    phone = "",
    location = "",
    socialId = ""
  } = req.body || {};

  const safeProvider = String(provider).trim().toLowerCase() || "google";
  const safeName = String(name || `${safeProvider.charAt(0).toUpperCase()}${safeProvider.slice(1)} Farmer`).trim();
  const generatedEmail = String(email || `${safeProvider}-${Date.now()}@smartagro.local`).trim().toLowerCase();
  const generatedSocialId = String(socialId || `${safeProvider}:${generatedEmail}`).trim();

  const data = readData();
  let user = data.users.find((item) => {
    if (item.socialProvider && item.socialId) {
      return item.socialProvider === safeProvider && item.socialId === generatedSocialId;
    }

    return item.email === generatedEmail;
  });

  if (!user) {
    user = {
      id: createId("usr"),
      name: safeName || "Smart Farmer",
      email: generatedEmail,
      phone: String(phone || `+88017${Math.floor(10000000 + Math.random() * 90000000)}`),
      location: String(location || "Dhaka, Bangladesh").trim(),
      passwordHash: hashPassword(`${safeProvider}-social-${generatedSocialId}`),
      socialProvider: safeProvider,
      socialId: generatedSocialId,
      createdAt: new Date().toISOString()
    };

    data.users.push(user);
    writeData(data);
  }

  const token = createToken({
    id: user.id,
    email: user.email
  });

  return res.json({
    message: `${safeProvider.charAt(0).toUpperCase()}${safeProvider.slice(1)} sign-in successful`,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location
    }
  });
});

app.get("/api/auth/me", authMiddleware, (req, res) => {
  const data = readData();
  const user = data.users.find((item) => item.id === req.auth.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location
    }
  });
});

app.get("/api/dashboard", authMiddleware, (req, res) => {
  res.json(buildDashboardPayload(req.auth.id));
});

app.get("/api/library/crops", (req, res) => {
  res.json({ crops: cropLibrary });
});

app.get("/api/library/pests", (req, res) => {
  res.json({ pests: pestGuide });
});

app.post("/api/recommendations/crop", authMiddleware, (req, res) => {
  try {
    const result = recommendCrop(req.body || {});
    const data = readData();

    data.recommendations.push({
      id: createId("rec"),
      userId: req.auth.id,
      input: result.input,
      primaryCrop: result.primary.crop,
      confidence: result.primary.confidence,
      advice: result.advice,
      alternatives: result.alternatives,
      createdAt: new Date().toISOString()
    });

    writeData(data);
    return res.status(201).json({ recommendation: result });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Unable to create a crop recommendation"
    });
  }
});

app.post("/api/farms", authMiddleware, (req, res) => {
  const { name, crop, area, soilType, irrigationStatus, health } = req.body || {};

  if (!name || !crop || !area || !soilType) {
    return res.status(400).json({ message: "Name, crop, area, and soil type are required" });
  }

  const parsedArea = Number(area);
  const parsedHealth = Number(health || 80);

  if (!Number.isFinite(parsedArea) || parsedArea <= 0) {
    return res.status(400).json({ message: "Area must be a number greater than 0" });
  }

  if (!Number.isFinite(parsedHealth) || parsedHealth < 1 || parsedHealth > 100) {
    return res.status(400).json({ message: "Health must be a number between 1 and 100" });
  }

  const data = readData();
  const farm = {
    id: createId("farm"),
    userId: req.auth.id,
    name: String(name).trim(),
    crop: String(crop).trim(),
    area: parsedArea,
    soilType: String(soilType).trim(),
    irrigationStatus: String(irrigationStatus || "Scheduled").trim(),
    health: parsedHealth,
    createdAt: new Date().toISOString()
  };

  data.farms.push(farm);
  writeData(data);

  return res.status(201).json({ farm });
});

// ============================================================
// MARKET PRICE TRACKER
// Lets a farmer log the price they actually saw/sold at in their
// local market, so they can track how a crop's price is trending
// over time. This is farmer-entered data, not a live market feed.
// ============================================================
app.get("/api/market-prices", authMiddleware, (req, res) => {
  const data = readData();
  const items = (data.marketPrices || [])
    .filter((item) => item.userId === req.auth.id)
    .sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt));

  return res.json({ marketPrices: items });
});

app.post("/api/market-prices", authMiddleware, (req, res) => {
  const { crop, price, unit, market, recordedAt, notes } = req.body || {};

  if (!crop || !price) {
    return res.status(400).json({ message: "Crop and price are required" });
  }

  const parsedPrice = Number(price);

  if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
    return res.status(400).json({ message: "Price must be a number greater than 0" });
  }

  const data = readData();
  const entry = {
    id: createId("price"),
    userId: req.auth.id,
    crop: String(crop).trim(),
    price: parsedPrice,
    unit: String(unit || "per maund").trim(),
    market: String(market || "").trim(),
    notes: String(notes || "").trim(),
    recordedAt: recordedAt ? String(recordedAt) : new Date().toISOString().slice(0, 10),
    createdAt: new Date().toISOString()
  };

  data.marketPrices = data.marketPrices || [];
  data.marketPrices.push(entry);
  writeData(data);

  return res.status(201).json({ marketPrice: entry });
});

// ============================================================
// FERTILIZER CALCULATOR
// Pure calculation endpoint: crop + area (acre) -> approximate
// Urea/TSP/MoP amounts, scaled from the per-acre guide table.
// General guidance only — always confirm with a soil test /
// local agriculture officer before applying.
// ============================================================
app.post("/api/fertilizer/calculate", authMiddleware, (req, res) => {
  const { crop, area } = req.body || {};

  if (!crop || !area) {
    return res.status(400).json({ message: "Crop and area are required" });
  }

  const parsedArea = Number(area);

  if (!Number.isFinite(parsedArea) || parsedArea <= 0) {
    return res.status(400).json({ message: "Area must be a number greater than 0" });
  }

  const dose = getFertilizerDose(crop) || DEFAULT_FERTILIZER;
  const isGeneric = !getFertilizerDose(crop);

  return res.json({
    result: {
      crop: String(crop).trim(),
      area: parsedArea,
      isGeneric,
      note: dose.note,
      totals: {
        urea: Number((dose.urea * parsedArea).toFixed(1)),
        tsp: Number((dose.tsp * parsedArea).toFixed(1)),
        mop: Number((dose.mop * parsedArea).toFixed(1))
      },
      perAcre: {
        urea: dose.urea,
        tsp: dose.tsp,
        mop: dose.mop
      },
      disclaimer:
        "General agronomy guidance based on typical per-acre recommendations. Actual dose depends on your soil test results — confirm with a local agriculture officer before applying."
    }
  });
});

// ============================================================
// FARM EXPENSE / INCOME TRACKER
// ============================================================
app.get("/api/finance", authMiddleware, (req, res) => {
  const data = readData();
  const items = (data.financeEntries || [])
    .filter((item) => item.userId === req.auth.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return res.json({ entries: items });
});

app.post("/api/finance", authMiddleware, (req, res) => {
  const { type, category, amount, date, notes } = req.body || {};

  if (!type || !category || !amount) {
    return res.status(400).json({ message: "Type, category, and amount are required" });
  }

  const parsedAmount = Number(amount);

  if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({ message: "Amount must be a number greater than 0" });
  }

  const safeType = type === "income" ? "income" : "expense";

  const data = readData();
  const entry = {
    id: createId("fin"),
    userId: req.auth.id,
    type: safeType,
    category: String(category).trim(),
    amount: parsedAmount,
    date: date ? String(date) : new Date().toISOString().slice(0, 10),
    notes: String(notes || "").trim(),
    createdAt: new Date().toISOString()
  };

  data.financeEntries = data.financeEntries || [];
  data.financeEntries.push(entry);
  writeData(data);

  return res.status(201).json({ entry });
});

// ============================================================
// EXTENSION OFFICER CONTACTS
// Farmer's own personal contact book (name/role/phone/area).
// National hotline numbers are shown statically on the frontend.
// ============================================================
app.get("/api/contacts", authMiddleware, (req, res) => {
  const data = readData();
  const items = (data.contacts || []).filter((item) => item.userId === req.auth.id);

  return res.json({ contacts: items });
});

app.post("/api/contacts", authMiddleware, (req, res) => {
  const { name, role, phone, area } = req.body || {};

  if (!name || !phone) {
    return res.status(400).json({ message: "Name and phone are required" });
  }

  const data = readData();
  const contact = {
    id: createId("contact"),
    userId: req.auth.id,
    name: String(name).trim(),
    role: String(role || "").trim(),
    phone: String(phone).trim(),
    area: String(area || "").trim(),
    createdAt: new Date().toISOString()
  };

  data.contacts = data.contacts || [];
  data.contacts.push(contact);
  writeData(data);

  return res.status(201).json({ contact });
});

app.post("/api/tasks", authMiddleware, (req, res) => {
  const { title, dueDate, priority } = req.body || {};

  if (!title || !dueDate) {
    return res.status(400).json({ message: "Title and due date are required" });
  }

  const data = readData();
  const task = {
    id: createId("task"),
    userId: req.auth.id,
    title: String(title).trim(),
    dueDate: String(dueDate),
    priority: ["low", "medium", "high"].includes(priority) ? priority : "medium",
    status: "open",
    createdAt: new Date().toISOString()
  };

  data.tasks.push(task);
  writeData(data);

  return res.status(201).json({ task });
});

app.patch("/api/tasks/:taskId", authMiddleware, (req, res) => {
  const data = readData();
  const task = data.tasks.find(
    (item) => item.id === req.params.taskId && item.userId === req.auth.id
  );

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const nextStatus = req.body?.status;
  if (nextStatus !== undefined && !["open", "done"].includes(nextStatus)) {
    return res.status(400).json({ message: "Status must be 'open' or 'done'" });
  }
  task.status = nextStatus || task.status;
  writeData(data);

  return res.json({ task });
});

app.delete("/api/tasks/:taskId", authMiddleware, (req, res) => {
  const data = readData();

  const exists = data.tasks.some(
    (item) => item.id === req.params.taskId && item.userId === req.auth.id
  );

  if (!exists) {
    return res.status(404).json({ message: "Task not found" });
  }

  data.tasks = data.tasks.filter(
    (item) => !(item.id === req.params.taskId && item.userId === req.auth.id)
  );

  writeData(data);

  return res.json({ message: "Task deleted" });
});

app.post("/api/complaints", authMiddleware, (req, res) => {
  const { subject, category, message, crop, priority } = req.body || {};

  if (!subject || !category || !message) {
    return res.status(400).json({ message: "Subject, category, and message are required" });
  }

  const data = readData();
  const complaint = {
    id: createId("complaint"),
    userId: req.auth.id,
    subject: String(subject).trim(),
    category: String(category).trim(),
    message: String(message).trim(),
    crop: String(crop || "").trim(),
    priority: String(priority || "medium"),
    status: "open",
    reply: "Our support team will follow up soon.",
    createdAt: new Date().toISOString()
  };

  data.complaints.push(complaint);
  writeData(data);

  return res.status(201).json({ complaint });
});
app.post("/api/scanner/leaf", authMiddleware, async (req, res) => {
  const { crop = "" } = req.body || {};
  let imageBase64 = typeof req.body?.imageBase64 === "string" ? req.body.imageBase64 : "";
  if (imageBase64.startsWith("data:")) imageBase64 = imageBase64.slice(imageBase64.indexOf(",") + 1);

  let result;
  try {
    if (imageBase64 && isRiceCrop(crop)) {
      // 1) Vision AI: sees the real photo, knows all 14 conditions, can say "unknown".
      if (visionEnabled()) {
        try {
          result = await diagnoseRiceWithVision({
            imageBase64,
            symptoms: req.body?.symptoms,
            notes: req.body?.notes
          });
        } catch (err) {
          console.warn("Vision AI failed, trying local model:", err.message);
        }
      }
      // 2) Local image model (only knows its own trained classes).
      if (!result) result = await analyzePaddyImage({
        imageBase64,
        symptoms: req.body?.symptoms,
        notes: req.body?.notes
      });
    }
  } catch (err) {
    console.warn("Paddy model failed, using keyword fallback:", err.message);
  }

  // If the loaded image model has no class for a disease the farmer's ticked
  // symptoms clearly point to (e.g. an older 10-class model vs Ufra / False
  // smut / Bakanae / Sheath blight), the model can only answer wrongly.
  // Trust the symptom match in that case instead.
  // Keyword issue -> model label, for diseases the image model often confuses.
const KW_TO_LABEL = {
    "Bacterial leaf blight": "bacterial_leaf_blight",
    "Sheath blight": "sheath_blight",
    "Tungro virus": "tungro"
  };
  const MODEL_BLIND = {
    "Ufra disease": "ufra",
    "False smut": "false_smut",
    "Bakanae disease": "bakanae",
    "Sheath blight": "sheath_blight"
  };
  if (result?.source === "paddy-ml" && Array.isArray(result.modelClasses) && result.modelClasses.length) {
    const kw = analyzeLeaf(req.body || {});
    const needed = MODEL_BLIND[kw.issue];
    if (needed && !kw.lowConfidence && !result.modelClasses.includes(needed)) result = kw;
    // The model is unsure and the farmer's ticked symptoms clearly point to a
    // different one of the 3 commonly confused diseases -> trust the symptoms.
    else if (KW_TO_LABEL[kw.issue] && !kw.lowConfidence && result.confidence < 85 &&
             result.predictions?.[0]?.label !== KW_TO_LABEL[kw.issue]) result = kw;
  }
  if (!result) result = analyzeLeaf(req.body || {});

  const scanId = createId("scan");
  const imageUrl = await saveScanThumb(scanId, imageBase64);

  const data = readData(); // read AFTER the await so we never overwrite newer data
  data.scans.push({
    id: scanId,
    userId: req.auth.id,
    crop: result.crop,
    imageName: req.body?.imageName || "",
    imageUrl,
    symptoms: Array.isArray(req.body?.symptoms) ? req.body.symptoms : [],
    notes: req.body?.notes || "",
    issue: result.issue,
    confidence: result.confidence,
    severity: result.severity,
    lowConfidence: Boolean(result.lowConfidence),
    source: result.source || "keyword-rules",
    predictions: result.predictions || [],
    treatment: result.treatment || [],
    prevention: result.prevention || "",
    disclaimer: result.disclaimer || "",
    cropRisks: result.cropRisks || null,
    pesticideNote: result.pesticideNote || "",
    createdAt: new Date().toISOString()
  });
  writeData(data);
  res.json({ result: { ...result, imageUrl } });
});
// ============================================================
// DELETE ENDPOINTS
// Generic, owner-scoped removal for every list the farmer creates.
// ============================================================
function makeDeleteRoute(collection, label) {
  return (req, res) => {
    const id = req.params.id;
    const data = readData();

    const exists = (data[collection] || []).some(
      (item) => item.id === id && item.userId === req.auth.id
    );

    if (!exists) {
      return res.status(404).json({ message: `${label} not found` });
    }

    data[collection] = data[collection].filter(
      (item) => !(item.id === id && item.userId === req.auth.id)
    );

    writeData(data);

    return res.json({ message: `${label} deleted` });
  };
}

app.get("/api/scans", authMiddleware, (req, res) => {
  const scans = readData()
    .scans.filter((s) => s.userId === req.auth.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ scans });
});

app.delete("/api/scans/:id", authMiddleware, (req, res) => {
  const data = readData();
  const scan = data.scans.find((s) => s.id === req.params.id && s.userId === req.auth.id);
  if (!scan) return res.status(404).json({ message: "Scan not found" });

  data.scans = data.scans.filter((s) => s !== scan);
  writeData(data);
  fs.unlink(path.join(SCAN_IMG_DIR, `${scan.id}.jpg`), () => {});
  res.json({ message: "Scan deleted" });
});
app.delete("/api/farms/:id", authMiddleware, makeDeleteRoute("farms", "Field"));
app.delete(
  "/api/recommendations/:id",
  authMiddleware,
  makeDeleteRoute("recommendations", "Recommendation")
);
app.delete(
  "/api/complaints/:id",
  authMiddleware,
  makeDeleteRoute("complaints", "Complaint")
);
app.delete(
  "/api/market-prices/:id",
  authMiddleware,
  makeDeleteRoute("marketPrices", "Market price entry")
);
app.delete(
  "/api/finance/:id",
  authMiddleware,
  makeDeleteRoute("financeEntries", "Finance entry")
);
app.delete(
  "/api/contacts/:id",
  authMiddleware,
  makeDeleteRoute("contacts", "Contact")
);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// JSON errors (too-large image, malformed JSON ...) instead of Express' HTML page.
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  const status = err.status || err.statusCode || 500;
  const message =
    status === 413 ? "The uploaded image is too large. Please choose a smaller photo."
    : status === 400 ? "Invalid request data"
    : "Server error";
  if (status >= 500) console.error(err);
  res.status(status).json({ message });
});

async function warmUp() {
  if (isLocalModelAvailable()) {
    await warmUpPaddyModel();
    return;
  }

  const url = process.env.PADDY_ML_URL || "http://127.0.0.1:5001";
  try {
    const res = await fetch(`${url}/health`, { signal: AbortSignal.timeout(5000) });
    console.log("Paddy ML server reachable:", res.ok);
  } catch (error) {
    console.warn("Paddy ML server not reachable yet:", error.message);
  }
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  warmUp();
});