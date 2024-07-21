const jwt = require('jsonwebtoken');

async function generateAccessToken(userId, role) {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: +process.env.JWT_ACCESS_TOKEN_EXPIRES_IN });
}

async function generateRefreshToken(userId, role) {
  return jwt.sign({ userId, role }, process.env.JWT_REFRESH_SECRET, { expiresIn: +process.env.JWT_REFRESH_TOKEN_EXPIRES_IN });
}

async function verifyAccessToken(accessToken) {
  return verifyToken(accessToken, process.env.JWT_SECRET);
}

async function verifyRefreshToken(refreshToken) {
  return verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET);
}

async function payloadsMatch(payload1, payload2) {
  return payload1.userId == payload2.userId && payload1.role === payload2.role;
}

async function verifyToken(token, secret) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
}

module.exports = { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken, payloadsMatch }