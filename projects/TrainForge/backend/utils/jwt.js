const jwt = require('jsonwebtoken');

function accessConfig() {
  return {
    secret: process.env.JWT_ACCESS_SECRET || 'trainforge_access_dev_secret',
    expiresIn: process.env.JWT_ACCESS_EXPIRES || '15m'
  };
}

function refreshConfig() {
  return {
    secret: process.env.JWT_REFRESH_SECRET || 'trainforge_refresh_dev_secret',
    expiresInDays: Number(process.env.JWT_REFRESH_EXPIRES_DAYS || 14)
  };
}

function signAccessToken(user, sessionToken) {
  const cfg = accessConfig();
  return jwt.sign(
    {
      sub: user.id,
      sid: sessionToken,
      role: user.role,
      email: user.email,
      fullName: user.full_name
    },
    cfg.secret,
    { expiresIn: cfg.expiresIn }
  );
}

function signRefreshToken(user, sessionToken) {
  const cfg = refreshConfig();
  return jwt.sign(
    {
      sub: user.id,
      sid: sessionToken,
      type: 'refresh'
    },
    cfg.secret,
    { expiresIn: `${cfg.expiresInDays}d` }
  );
}

function verifyAccessToken(token) {
  return jwt.verify(token, accessConfig().secret);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, refreshConfig().secret);
}

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  refreshConfig
};
