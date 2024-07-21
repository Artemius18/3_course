const router = require('express').Router({ mergeParams: true });
const asyncHandler = require('express-async-handler');
const { handleGetAll, handleGetById, handleCreate, handleUpdate, handleDelete } = require('../controllers/commit');
const checkAbility = require('../middleware/checkAbility');
const Action = require('../security/action');
const Subject = require('../security/subject');
const repoService = require('../services/repoService');

router.get('/', paramsId, paramsAuthorId,
  checkAbility(Action.Read, new Subject.CommitsAll()), asyncHandler(handleGetAll));
router.get('/:commitId', paramsId, paramsAuthorId, paramsCommitId,
  checkAbility(Action.Read, new Subject.Commits()), asyncHandler(handleGetById));
router.post('/', paramsId, paramsAuthorId,
  checkAbility(Action.Create, new Subject.Commits()), asyncHandler(handleCreate));
router.put('/:commitId', paramsId, paramsAuthorId, paramsCommitId,
  checkAbility(Action.Update, new Subject.Commits()), asyncHandler(handleUpdate));
router.delete('/:commitId', paramsId, paramsAuthorId, paramsCommitId,
  checkAbility(Action.Delele, new Subject.Commits()), asyncHandler(handleDelete));

async function paramsId(req, res, next) {
  req.params.id = parseInt(req.params.id);
  next();
}

async function paramsAuthorId(req, res, next) {
  req.params.authorId = (await repoService.getById(req.params.id))?.authorId;
  next();
}

async function paramsCommitId(req, res, next) {
  req.params.commitId = parseInt(req.params.commitId);
  next();
}

module.exports = router;