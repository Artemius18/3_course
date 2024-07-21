const repoService = require('../services/repoService');

async function handleCreate(req, res, next) {
  res.json(await repoService.create(req.body.name, req.user.userId));
}

async function handleGetAll(req, res, next) {
  res.json(await repoService.getAll());
}

async function handleGetById(req, res, next) {
  res.json(await repoService.getById(req.params.id));
}

async function handleUpdate(req, res, next) {
  if (!await repoService.getById(req.params.id)) {
    return res.status(404).send('Repo not found');
  }
  res.json(await repoService.updatebyId(req.params.id, req.body.name, req.body.authorId));
}

async function handleDelete(req, res, next) {
  if (!await repoService.getById(req.params.id)) {
    return res.status(404).send('Repo not found');
  }
  res.json(await repoService.deleteById(req.params.id));
}

module.exports = { handleCreate, handleGetAll, handleGetById, handleUpdate, handleDelete };