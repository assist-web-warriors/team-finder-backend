const { roleAvailableActions } = require('../utils/constants');

const roleMiddleware = async (req, res, next) => {
  if (!req.roles || !req.url) {
    return res.sendStatus(500);
  }
  console.log(req.roles);
  console.log(req.url);
  const accessGranted = req.roles.some((role) => roleAvailableActions[role]?.[req.url]);
  console.log(accessGranted);

  if (!accessGranted) {
    return res.status(401).send('You do not have permission to access this resource.');
  }

  next();
};

module.exports = { roleMiddleware };
