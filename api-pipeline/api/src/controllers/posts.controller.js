const service = require('../services/posts.service');

exports.list = (_req, res) => res.json(service.listPosts());

exports.get = (req, res, next) => {
  try { res.json(service.getPost(req.params.id)); }
  catch (e) { next(e); }
};

exports.create = (req, res, next) => {
  try {
    const p = service.createPost(req.body);
    res.status(201).json(p);
  } catch (e) { next(e); }
};

exports.update = (req, res, next) => {
  try { res.json(service.updatePost(req.params.id, req.body)); }
  catch (e) { next(e); }
};

exports.remove = (req, res, next) => {
  try { service.removePost(req.params.id); res.status(204).send(); }
  catch (e) { next(e); }
};
