const router = require('express').Router({ mergeParams: true });
const asyncHandler = require('express-async-handler');
const { handleAbility } = require('../controllers/ability');
const checkAbility = require('../middleware/checkAbility');
const Action = require('../security/action');
const Subject = require('../security/subject');

router.use('/user', require('./user'));
router.use('/repos', require('./repos'));

router.get('/ability',
  checkAbility(Action.Read, new Subject.Ability()), asyncHandler(handleAbility));

module.exports = router;