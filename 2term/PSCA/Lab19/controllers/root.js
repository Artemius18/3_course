const bcrypt = require('bcrypt');
const userService = require('../services/userService');
const jwtService = require('../services/jwtService');
const redisService = require('../services/redisService');

async function handleLogin(req, res, next) {
  const { username, password } = req.body;

  const user = await userService.getByUsername(username);
  if (!user || !await userService.verifyPassword(user.id, password)) {
    return res.status(422).send('Invalid username or password');
  }
  const accessToken = await jwtService.generateAccessToken(user.id, user.role);
  let refreshToken = await redisService.getRefreshToken(user.id);
  if (!await jwtService.verifyRefreshToken(refreshToken)) {
    refreshToken = await jwtService.generateRefreshToken(user.id, user.role);
    await redisService.setRefreshToken(user.id, refreshToken);
  }
  res.cookie('access_token', accessToken, { httpOnly: true, sameSite: 'strict' });
  res.cookie('refresh_token', refreshToken, { path: '/' });
  res.redirect('/api/ability');
}

async function handleRegister(req, res, next) {
  const { username, email, password } = req.body;
  if (await userService.getByUsername(username)) {
    return res.status(409).send('Login already exists');
  }
  const user = await userService.create(username, email, password, 'user'); //user
  let accessToken, refreshToken;
  try {
    accessToken = await jwtService.generateAccessToken(user.id, user.role);
    refreshToken = await jwtService.generateRefreshToken(user.id, user.role);
  } catch (err) {
    await userService.deleteById(user.id);
    throw err;
  }
  await redisService.setRefreshToken(user.id, refreshToken);
  res.cookie('access_token', accessToken, { httpOnly: true, sameSite: 'strict' });
  res.cookie('refresh_token', refreshToken, { path: '/' });
  res.redirect('/api/ability');
}

async function handleRefreshToken(req, res, next) {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) {
    return res.status(400).send('Refresh token not found');
  }
  const decoded = await jwtService.verifyRefreshToken(refreshToken);
  if (!decoded) {
    return res.status(400).send('Invalid refresh token');
  }
  const { userId, role } = decoded;
  const storedToken = await redisService.getRefreshToken(userId);
  if (refreshToken !== storedToken) {
    return res.status(400).send('Invalid refresh token');
  }
  const accessToken = await jwtService.generateAccessToken(userId, role);
  const newRefreshToken = await jwtService.generateRefreshToken(userId, role);
  await redisService.setRefreshToken(userId, newRefreshToken);
  res.cookie('access_token', accessToken, { httpOnly: true, sameSite: 'strict' });
  res.cookie('refresh_token', newRefreshToken, { path: '/' });
  res.status(200).send('Tokens refreshed');
}

async function handleLogout(req, res, next) {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
  res.redirect('/login');
}

module.exports = { handleLogin, handleRegister, handleRefreshToken, handleLogout };