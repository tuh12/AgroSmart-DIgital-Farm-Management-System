const fs = require("fs");
const path = require("path");
const { DatabaseSync } = require("node:sqlite");

const DATA_DIR = path.join(__dirname, "data");
const DB_FILE = path.join(DATA_DIR, "smart-agro.sqlite");

const TABLES = [
  "users",
  "farms",
  "recommendations",
  "tasks",
  "complaints",
  "scans",
  "pendingSignups",
  "marketPrices",
  "financeEntries",
  "contacts"
];

let database;

function initializeDatabase() {
  if (database) {
    return database;
  }

  fs.mkdirSync(DATA_DIR, { recursive: true });
  database = new DatabaseSync(DB_FILE);

  database.exec(`
    CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, payload TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS farms (id TEXT PRIMARY KEY, payload TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS recommendations (id TEXT PRIMARY KEY, payload TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS tasks (id TEXT PRIMARY KEY, payload TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS complaints (id TEXT PRIMARY KEY, payload TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS scans (id TEXT PRIMARY KEY, payload TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS pendingSignups (id TEXT PRIMARY KEY, payload TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS marketPrices (id TEXT PRIMARY KEY, payload TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS financeEntries (id TEXT PRIMARY KEY, payload TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS contacts (id TEXT PRIMARY KEY, payload TEXT NOT NULL);
  `);

  return database;
}

function normalizeData(data = {}) {
  return {
    users: Array.isArray(data.users) ? data.users : [],
    farms: Array.isArray(data.farms) ? data.farms : [],
    recommendations: Array.isArray(data.recommendations) ? data.recommendations : [],
    tasks: Array.isArray(data.tasks) ? data.tasks : [],
    complaints: Array.isArray(data.complaints) ? data.complaints : [],
    scans: Array.isArray(data.scans) ? data.scans : [],
    pendingSignups: Array.isArray(data.pendingSignups) ? data.pendingSignups : [],
    marketPrices: Array.isArray(data.marketPrices) ? data.marketPrices : [],
    financeEntries: Array.isArray(data.financeEntries) ? data.financeEntries : [],
    contacts: Array.isArray(data.contacts) ? data.contacts : []
  };
}

function readData() {
  try {
    const db = initializeDatabase();
    const result = {};

    for (const table of TABLES) {
      const rows = db.prepare(`SELECT payload FROM ${table}`).all();
      result[table] = rows.map((row) => JSON.parse(row.payload));
    }

    return normalizeData(result);
  } catch (error) {
    // Do NOT return empty data here: the next writeData() would then delete
    // every table. Fail loudly instead.
    console.error("readData failed:", error);
    throw error;
  }
}

function writeData(data) {
  const db = initializeDatabase();
  const records = normalizeData(data);

  // One transaction: a crash half-way no longer leaves tables empty.
  db.exec("BEGIN");
  try {
    for (const table of TABLES) {
      db.exec(`DELETE FROM ${table}`);
      const insert = db.prepare(`INSERT INTO ${table} (id, payload) VALUES (?, ?)`);

      for (const item of records[table] || []) {
        insert.run(
          String(item.id || `${table}_${Date.now()}_${Math.random().toString(16).slice(2)}`),
          JSON.stringify(item)
        );
      }
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

module.exports = {
  initializeDatabase,
  readData,
  writeData
};