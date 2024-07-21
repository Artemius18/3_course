const redis = require('redis');

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: +process.env.REDIS_PORT,
  //password: process.env.REDIS_PASSWORD,
});

async function connect() {
  return redisClient.connect();
}

async function setRefreshToken(userId, refreshToken) {
  return redisClient.set(`refreshToken:${userId}`, refreshToken, 'EX', +process.env.JWT_REFRESH_TOKEN_EXPIRES_IN);
}

async function getRefreshToken(userId) {
  return redisClient.get(`refreshToken:${userId}`);
}

module.exports = { connect, setRefreshToken, getRefreshToken };