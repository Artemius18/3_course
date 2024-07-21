const Role = require('../security/role');
const jwtService = require('../services/jwtService');
const redisService = require('../services/redisService');

async function authenticate(req, res, next) {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;

  let decodedRefresh = refreshToken && await jwtService.verifyRefreshToken(refreshToken);
  if (decodedRefresh && refreshToken === await redisService.getRefreshToken(decodedRefresh.userId)) {
    let decodedAccess = accessToken && await jwtService.verifyAccessToken(accessToken);
    if (decodedAccess && await jwtService.payloadsMatch(decodedAccess, decodedRefresh)) {
      req.user = decodedAccess;
    } else {
      const { userId, role } = decodedRefresh;
      res.cookie('access_token', await jwtService.generateAccessToken(userId, role), { httpOnly: true, sameSite: 'strict' });
      req.user = decodedRefresh;
    }
  } else {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    req.user = { role: Role.Guest };
  }
  next();
}

module.exports = authenticate;