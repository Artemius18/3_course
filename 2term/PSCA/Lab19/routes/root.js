const router = require('express').Router();
const asyncHandler = require('express-async-handler');
//const { ForbiddenError } = require('casl');
const { handleLogin, handleRegister, handleRefreshToken, handleLogout } = require('../controllers/root');
const checkAbility = require('../middleware/checkAbility');
const Action = require('../security/action');
const Subject = require('../security/subject');
const { ForbiddenError } = require('casl');

router.use('/api', require('./api'));

router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));
router.get('/logout', asyncHandler(handleLogout));
router.get('/refresh-token', asyncHandler(handleRefreshToken));

router.post('/login', asyncHandler(handleLogin));
router.post('/register', asyncHandler(handleRegister));

router.use((req, res, next) => {
  res.status(404).send('Not Found');
});

router.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof ForbiddenError) {
    res.status(403).send('Forbidden');
  }
  res.status(404).send('Not Found');
});

module.exports = router;