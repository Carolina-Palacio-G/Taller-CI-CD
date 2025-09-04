const service = require('../services/users.service');

function stripPassword(user) {
  const { password, ...rest } = user;
  return rest;
}

exports.list = (_req, res) => {
  res.json(service.listUsers().map(stripPassword));
};

exports.get = (req, res, next) => {
  try {
    const u = service.getUser(req.params.id);
    res.json(stripPassword(u));
  } catch (e) { next(e); }
};

exports.create = (req, res, next) => {
  try {
    const u = service.createUser(req.body);
    res.status(201).json(stripPassword(u));
  } catch (e) { next(e); }
};

exports.update = (req, res, next) => {
  try {
    const u = service.updateUser(req.params.id, req.body);
    res.json(stripPassword(u));
  } catch (e) { next(e); }
};

exports.remove = (req, res, next) => {
  try {
    service.removeUser(req.params.id);
    res.status(204).send();
  } catch (e) { next(e); }
};
