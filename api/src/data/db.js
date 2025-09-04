const fs = require('fs');
const path = require('path');
const dbPath = path.resolve(__dirname, '../../db.json');

function readDB() {
  const raw = fs.readFileSync(dbPath, 'utf8').replace(/^\uFEFF/, ''); // <-- quita BOM
  return JSON.parse(raw);
}

function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

module.exports = { readDB, writeDB };
