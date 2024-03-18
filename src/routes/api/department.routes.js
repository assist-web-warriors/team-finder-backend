const router = require('express').Router();
const {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
} = require('../../controllers/department.controller');

router.post('/create', createDepartment);
router.put('/update', updateDepartment);
router.delete('/delete', deleteDepartment);
router.get('/all', getDepartments);
router.get('/one', getDepartment);

module.exports = router;
