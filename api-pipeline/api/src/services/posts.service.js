const { readDB, writeDB } = require('../data/db');
const { nextId } = require('../utils/id');

function listPosts() {
  return readDB().posts;
}

function getPost(id) {
  const db = readDB();
  const post = db.posts.find(p => Number(p.id) === Number(id));
  if (!post) { const e = new Error('Post no encontrado'); e.status = 404; throw e; }
  return post;
}

function createPost({ title, content, userId }) {
  const db = readDB();

  if (!title || !content || !userId) {
    const e = new Error('Faltan campos: title, content, userId'); e.status = 400; throw e;
  }

  const user = db.users.find(u => Number(u.id) === Number(userId));
  if (!user) { const e = new Error('Usuario no encontrado'); e.status = 404; throw e; }

  const post = { id: nextId(db.posts), title, content, userId: Number(userId) };
  db.posts.push(post);
  writeDB(db);
  return post;
}

function updatePost(id, payload) {
  const db = readDB();
  const idx = db.posts.findIndex(p => Number(p.id) === Number(id));
  if (idx === -1) { const e = new Error('Post no encontrado'); e.status = 404; throw e; }

  if (payload.userId) {
    const userExists = db.users.some(u => Number(u.id) === Number(payload.userId));
    if (!userExists) { const e = new Error('Usuario no encontrado'); e.status = 404; throw e; }
    payload.userId = Number(payload.userId);
  }

  db.posts[idx] = { ...db.posts[idx], ...payload };
  writeDB(db);
  return db.posts[idx];
}

function removePost(id) {
  const db = readDB();
  const before = db.posts.length;
  db.posts = db.posts.filter(p => Number(p.id) !== Number(id));
  if (db.posts.length === before) { const e = new Error('Post no encontrado'); e.status = 404; throw e; }
  writeDB(db);
  return true;
}

module.exports = { listPosts, getPost, createPost, updatePost, removePost };