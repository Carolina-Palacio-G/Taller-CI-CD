const { readDB, writeDB } = require('../data/db');
const { nextId } = require('../utils/id');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function listUsers() {
  return readDB().users;
}

function getUser(id) {
  const db = readDB();
  const user = db.users.find(u => Number(u.id) === Number(id));
  if (!user) {
    const e = new Error('Usuario no encontrado'); e.status = 404; throw e;
  }
  return user;
}

function createUser({ name, email, password }) {
  const db = readDB();

  if (!name || !email || !password) {
    const e = new Error('Faltan campos: name, email, password'); e.status = 400; throw e;
  }
  if (!emailRegex.test(email)) {
    const e = new Error('Email inválido'); e.status = 400; throw e;
  }
  if (db.users.some(u => u.email === email)) {
    const e = new Error('El email ya está en uso'); e.status = 409; throw e;
  }

  const user = { id: nextId(db.users), name, email, password };
  db.users.push(user);
  writeDB(db);
  return user;
}

function updateUser(id, payload) {
  const db = readDB();
  const idx = db.users.findIndex(u => Number(u.id) === Number(id));
  if (idx === -1) { const e = new Error('Usuario no encontrado'); e.status = 404; throw e; }

  if (payload.email) {
    const emailTaken = db.users.some(u => u.email === payload.email && Number(u.id) !== Number(id));
    if (emailTaken) { const e = new Error('El email ya está en uso'); e.status = 409; throw e; }
  }

  db.users[idx] = { ...db.users[idx], ...payload };
  writeDB(db);
  return db.users[idx];
}

function removeUser(id) {
  const db = readDB();
  const before = db.users.length;
  db.users = db.users.filter(u => Number(u.id) !== Number(id));
  if (db.users.length === before) {
    const e = new Error('Usuario no encontrado'); e.status = 404; throw e;
  }
  // (opcional) podrías también borrar/transferir posts
  writeDB(db);
  return true;
}

module.exports = { listUsers, getUser, createUser, updateUser, removeUser };
