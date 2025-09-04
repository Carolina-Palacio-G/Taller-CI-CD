const fs = require('fs');
const path = require('path');
const DB_PATH = path.resolve(__dirname, '../db.json');

let postsService;
let usersService;

beforeEach(() => {
  fs.writeFileSync(DB_PATH, JSON.stringify({ users: [], posts: [] }, null, 2), 'utf8');
  jest.resetModules();
  postsService = require('../src/services/posts.service');
  usersService = require('../src/services/users.service');
});

test('crea post con user válido (201 lógico)', () => {
  const u = usersService.createUser({ name: 'Ana', email: 'ana@ex.com', password: 'x' });
  const p = postsService.createPost({ title: 'T', content: 'C', userId: u.id });
  expect(p.id).toBeDefined();
  expect(p.userId).toBe(u.id);
});

test('falla si userId no existe (404)', () => {
  expect(() =>
    postsService.createPost({ title: 'T', content: 'C', userId: 999 })
  ).toThrow(/usuario no encontrado/i);
});

test('falla si faltan campos (400)', () => {
  expect(() =>
    postsService.createPost({ title: 'T' })
  ).toThrow(/faltan campos/i);
});