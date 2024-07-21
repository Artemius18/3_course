const commitService = require('../services/commitService');

async function handleCreate(req, res, next) {
  res.json(await commitService.create(req.params.id, req.body.message));
}

async function handleGetAll(req, res, next) {
  res.json(await commitService.getAllInRepo(req.params.id));
}

async function handleGetById(req, res, next) {
  res.json(await commitService.getByIdInRepo(req.params.id, req.params.commitId));
}

async function handleUpdate(req, res, next) {
  if (!await commitService.getByIdInRepo(req.params.id, req.params.commitId)) {
    return res.status(404).send('Commit not found');
  }
  res.json(await commitService.updatebyId(req.params.commitId, req.body.message));
}

async function handleDelete(req, res, next) {
  if (!await commitService.getByIdInRepo(req.params.id, req.params.commitId)) {
    return res.status(404).send('Commit not found');
  }
  res.json(await commitService.deleteById(req.params.commitId));
}

module.exports = { handleCreate, handleGetAll, handleGetById, handleUpdate, handleDelete };