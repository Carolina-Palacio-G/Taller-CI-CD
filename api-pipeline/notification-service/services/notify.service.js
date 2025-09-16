const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const FILE_PATH = path.join(DATA_DIR, 'notifications.json');

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE_PATH)) fs.writeFileSync(FILE_PATH, '[]', 'utf-8');
}

function loadAll() {
  ensureStore();
  const raw = fs.readFileSync(FILE_PATH, 'utf-8');
  return JSON.parse(raw);
}

function saveAll(list) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(list, null, 2), 'utf-8');
}

function simulateNotification(nombre, email, mensaje) {
  console.log(`📬 Enviando notificación a ${nombre} <${email}>:`);
  console.log(`📨 Mensaje: ${mensaje}`);

  ensureStore();
  const list = loadAll();
  list.push({
    nombre,
    email,
    mensaje,
    fecha: new Date().toISOString()
  });
  saveAll(list);
}

function getAllNotifications() {
  return loadAll();
}

module.exports = { simulateNotification, getAllNotifications };
