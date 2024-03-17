const router = require('express').Router();
const { createDepartment, getDepartments } = require('../../controllers/department.controller');

router.post('/', createDepartment);
router.get('/all', getDepartments);

module.exports = router;
