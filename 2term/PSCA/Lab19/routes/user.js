const router = require('express').Router({ mergeParams: true });
const asyncHandler = require('express-async-handler');
const { handleGetAll, handleGetById } = require('../controllers/user');
const checkAbility = require('../middleware/checkAbility');
const Action = require('../security/action');
const Subject = require('../security/subject');

router.get('/',
  checkAbility(Action.Read, new Subject.UsersAll()), asyncHandler(handleGetAll));
router.get('/:id', asyncHandler(paramsId),
  checkAbility(Action.Read, new Subject.User), asyncHandler(handleGetById));

async function paramsId(req, res, next) {
  req.params.id = parseInt(req.params.id);
  next();
}

module.exports = router;