const jwt = require('jsonwebtoken');

const signAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });
};

const signRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
    if (err?.name === 'TokenExpiredError') {
      return jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
    }
    if (!err) return jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
  });
};

const verifyRefreshToken = (token, payload) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (decoded) {
      return signAccessToken(payload);
    }
  });
};

module.exports = { signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken };
