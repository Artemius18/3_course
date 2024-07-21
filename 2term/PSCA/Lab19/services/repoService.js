const Repos = require('../database/client').repos;

async function create(name, authorId) {
  return await Repos.create({
    data: {
      name: name,
      authorId: authorId,
    }
  });
}

async function getAll() {
  return await Repos.findMany();
}

async function getById(id) {
  return await Repos.findUnique({ where: { id: id } });
}

async function updatebyId(id, name, authorId) {
  return await Repos.update({
    where: { id: id },
    data: {
      name: name,
      authorId: authorId,
    },
  });
}

async function deleteById(id) {
  return await Repos.delete({ where: { id: id } });
}

module.exports = { create, getAll, getById, updatebyId, deleteById };