const router = require('express').Router();
const AuthRouter = require('./auth.routes');
const UserRouter = require('./user.routes');
const DepartmentRouter = require('./department.routes');

const { authMiddleware } = require('../../middleware/auth.middleware');
const { roleMiddleware } = require('../../middleware/role.middleware');

router.use('/auth', AuthRouter);
router.use('/user', UserRouter);
router.use('/department', authMiddleware, roleMiddleware, DepartmentRouter);

module.exports = router;
