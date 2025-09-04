const fs = require('fs');
const path = require('path');
const request = require('supertest');
const DB_PATH = path.resolve(__dirname, '../db.json');

let app;

beforeEach(() => {
  // Base limpia antes de cada test
  fs.writeFileSync(DB_PATH, JSON.stringify({ users: [], posts: [] }, null, 2), 'utf8');
  jest.resetModules();
  app = require('../src/app'); // importa tu app configurada con rutas
});

describe('Usuarios (API)', () => {
  test('POST /api/users crea usuario (201)', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Ana', email: 'ana@ex.com', password: 'x' });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.email).toBe('ana@ex.com');
    expect(res.body.password).toBeUndefined(); // No exponer password
  });

  test('POST /api/users email duplicado (409)', async () => {
    await request(app).post('/api/users').send({ name: 'Ana', email: 'ana@ex.com', password: 'x' });
    const res = await request(app).post('/api/users').send({ name: 'Ana2', email: 'ana@ex.com', password: 'y' });
    expect(res.status).toBe(409);
    expect(res.body.error).toMatch(/ya está en uso/i);
  });

  test('POST /api/users faltan campos (400)', async () => {
    const res = await request(app).post('/api/users').send({ name: 'Ana' });
    expect(res.status).toBe(400);
  });
});

describe('Posts (API)', () => {
  test('POST /api/posts crea post (201) con userId válido', async () => {
    const u = await request(app).post('/api/users').send({ name: 'Ana', email: 'ana@ex.com', password: 'x' });
    const res = await request(app).post('/api/posts').send({ title: 'T', content: 'C', userId: u.body.id });

    expect(res.status).toBe(201);
    expect(res.body.userId).toBe(u.body.id);
  });

  test('POST /api/posts userId inexistente (404)', async () => {
    const res = await request(app).post('/api/posts').send({ title: 'T', content: 'C', userId: 999 });
    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/usuario no encontrado/i);
  });

  test('POST /api/posts faltan campos (400)', async () => {
    const res = await request(app).post('/api/posts').send({ title: 'Solo título' });
    expect(res.status).toBe(400);
  });
});