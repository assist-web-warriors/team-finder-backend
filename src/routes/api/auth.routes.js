const router = require('express').Router();
const { refresh, login, signup, signupAdmin } = require('../../controllers/auth.controller');

router.post('/signup', signup);
router.post('/signup-admin', signupAdmin);
router.post('/login', login);
router.get('/refresh', refresh);

module.exports = router;
