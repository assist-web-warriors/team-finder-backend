const whitelistUrls = require('../config/whitelistUrls');
const jwt = require('jsonwebtoken');

const corsEnableMiddleware = (req, res, next) => {
  const origin = req.headers.origin;
  if (whitelistUrls.includes(origin)) res.header('Access-Control-Allow-Credentials', true);
  next();
};

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err?.name === 'TokenExpiredError') return res.status(403).send('jwt expired');
    if (err) return res.sendStatus(401);
    req.email = decoded.email;
    req.userId = decoded.userId;
    req.roles = decoded.roles;
    next();
  });
};

module.exports = { authMiddleware, corsEnableMiddleware };
