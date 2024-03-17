const {
  createDepartment: registerDepartment,
  getDepartments: viewDepartments,
} = require('../service/department.service');

class DepartmentController {
  async createDepartment(req, res) {
    const { department, manager } = req.body;
    if (!req.userId) return res.sendStatus(400);

    const { result, error } = await registerDepartment(req.userId, department, manager);
    if (error)
      return res.status(error.status).json({ message: error.message, error: error?.error });

    return res.status(200).json(result.department);
  }

  async getDepartments(req, res) {
    if (!req.userId) return res.sendStatus(400);

    const { result, error } = await viewDepartments(req.userId);
    if (error)
      return res.status(error.status).json({ message: error.message, error: error?.error });

    return res.status(200).json(result.departments);
  }
}

module.exports = new DepartmentController();
