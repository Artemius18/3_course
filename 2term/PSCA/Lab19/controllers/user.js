const userService = require('../services/userService');

async function handleGetAll(req, res, next) {
  res.json(await userService.getAll());
}

async function handleGetById(req, res, next) {
  res.json(await userService.getById(req.params.id));
}

module.exports = { handleGetAll, handleGetById };