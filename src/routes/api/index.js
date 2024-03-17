const router = require('express').Router();
const AuthRouter = require('./auth.routes');
const UserRouter = require('./user.routes');

router.use('/auth', AuthRouter);
router.use('/user', UserRouter);

module.exports = router;
