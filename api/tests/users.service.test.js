const fs = require('fs');
const path = require('path');
const DB_PATH = path.resolve(__dirname, '../db.json');

// Cargar el servicio DESPUÉS de resetear la DB en cada test
let usersService;

beforeEach(() => {
  // Estado limpio: users y posts vacíos
  fs.writeFileSync(DB_PATH, JSON.stringify({ users: [], posts: [] }, null, 2), 'utf8');
  // Forzamos recarga limpia del módulo
  jest.resetModules();
  usersService = require('../src/services/users.service');
});

test('crea usuario válido', () => {
  const u = usersService.createUser({ name: 'Ana', email: 'ana@ex.com', password: 'x' });
  expect(u.id).toBeDefined();
  expect(u.email).toBe('ana@ex.com');
  // Verifica persistencia
  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  expect(db.users).toHaveLength(1);
});

test('rechaza email duplicado (409)', () => {
  usersService.createUser({ name: 'Ana', email: 'ana@ex.com', password: 'x' });
  expect(() =>
    usersService.createUser({ name: 'Ana2', email: 'ana@ex.com', password: 'y' })
  ).toThrow(/ya está en uso/i);
});

test('valida email inválido (400)', () => {
  expect(() =>
    usersService.createUser({ name: 'Ana', email: 'no-es-email', password: 'x' })
  ).toThrow(/email inválido/i);
});

test('falta de campos obligatorios (400)', () => {
  expect(() =>
    usersService.createUser({ name: 'Ana' })
  ).toThrow(/faltan campos/i);
});
