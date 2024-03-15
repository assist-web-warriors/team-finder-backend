const router = require('express').Router();
const { refresh, login, signup } = require('../../controllers/auth.controller');

router.post('/signup', signup);
router.post('/login', login);
router.get('/refresh', refresh);

module.exports = router;
