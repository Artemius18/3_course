const Commits = require('../database/client').commits;

async function create(repoId, message) {
  return await Commits.create({
    data: {
      repoId: repoId,
      message: message,
    }
  });
}

async function getAllInRepo(repoId) {
  return await Commits.findMany({ where: { repoId: repoId } });
}

async function getByIdInRepo(repoId, id) {
  const commit = await Commits.findUnique({ where: { id: id } });
  return commit?.repoId === repoId ? commit : null;
}

async function updatebyId(id, message) {
  return await Commits.update({
    where: { id: id },
    data: {
      message: message,
    },
  });
}

async function deleteById(id) {
  return await Commits.delete({ where: { id: id } });
}

module.exports = { create, getAllInRepo, getByIdInRepo, updatebyId, deleteById };