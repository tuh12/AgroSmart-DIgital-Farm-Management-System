const fs = require("fs");
const path = require("path");
const { DatabaseSync } = require("node:sqlite");

const DATA_DIR = path.join(__dirname, "data");
const DB_FILE = path.join(DATA_DIR, "smart-agro.sqlite");

const TABLES = [
  "users", "farms", "recommendations", "tasks", "complaints", "scans",
  "pendingSignups", "marketPrices", "financeEntries", "contacts"
];

let database;

function initializeDatabase() {
  if (database) return database;

  fs.mkdirSync(DATA_DIR, { recursive: true });
  database = new DatabaseSync(DB_FILE);
  database.exec("PRAGMA journal_mode = WAL;");

  for (const table of TABLES) {
    database.exec(`CREATE TABLE IF NOT EXISTS ${table} (id TEXT PRIMARY KEY, payload TEXT NOT NULL);`);
  }

  return database;
}

function normalizeData(data = {}) {
  const result = {};
  for (const table of TABLES) {
    result[table] = Array.isArray(data[table]) ? data[table] : [];
  }
  return result;
}

function readData() {
  // Do NOT swallow errors and return empty data: the next writeData() would
  // then wipe every table. Fail loudly instead.
  const db = initializeDatabase();
  const result = {};

  for (const table of TABLES) {
    const rows = db.prepare(`SELECT payload FROM ${table} ORDER BY rowid`).all();
    result[table] = rows.map((row) => JSON.parse(row.payload));
  }

  return normalizeData(result);
}

// Only rows that were added / changed / removed are touched, instead of
// deleting and re-inserting every table on every request.
function writeData(data) {
  const db = initializeDatabase();
  const records = normalizeData(data);

  db.exec("BEGIN");
  try {
    for (const table of TABLES) {
      const existing = new Map(
        db.prepare(`SELECT id, payload FROM ${table}`).all().map((row) => [row.id, row.payload])
      );
      const upsert = db.prepare(
        `INSERT INTO ${table} (id, payload) VALUES (?, ?)
         ON CONFLICT(id) DO UPDATE SET payload = excluded.payload`
      );
      const remove = db.prepare(`DELETE FROM ${table} WHERE id = ?`);
      const keep = new Set();

      for (const item of records[table]) {
        const id = String(item.id || `${table}_${Date.now()}_${Math.random().toString(16).slice(2)}`);
        const payload = JSON.stringify(item);
        keep.add(id);
        if (existing.get(id) !== payload) upsert.run(id, payload);
      }

      for (const id of existing.keys()) {
        if (!keep.has(id)) remove.run(id);
      }
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

module.exports = { initializeDatabase, readData, writeData };
