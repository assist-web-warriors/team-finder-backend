const router = require('express').Router();
const { getRoles, getUsers } = require('../../controllers/user.controller');
const { authMiddleware } = require('../../middleware/auth.middleware');
const { roleMiddleware } = require('../../middleware/role.middleware');

router.get('/roles', authMiddleware, getRoles);
router.get('/organization-members', authMiddleware, roleMiddleware, getUsers);

module.exports = router;
