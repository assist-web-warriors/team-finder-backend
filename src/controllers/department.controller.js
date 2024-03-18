const {
  createDepartment: registerDep,
  getDepartments: getDeps,
  getDepartment: getDep,
  updateDepartment: updateDep,
  deleteDepartment: deleteDep,
} = require('../service/department.service');

class DepartmentController {
  async createDepartment(req, res) {
    const { department, manager } = req.body;
    if (!req.userId) return res.sendStatus(400);

    const { result, error } = await registerDep(req.userId, department, manager);
    if (error)
      return res.status(error.status).json({ message: error.message, error: error?.error });

    return res.status(200).json(result.department);
  }

  async getDepartments(req, res) {
    if (!req.userId) return res.sendStatus(400);

    const { result, error } = await getDeps(req.userId);
    if (error)
      return res.status(error.status).json({ message: error.message, error: error?.error });

    return res.status(200).json(result.departments);
  }

  async getDepartment(req, res) {
    const { id } = req.body;
    if (!id) return res.sendStatus(400);

    const { result, error } = await getDep(id);
    if (error)
      return res.status(error.status).json({ message: error.message, error: error?.error });

    return res.status(200).json(result.department);
  }

  async updateDepartment(req, res) {
    const { id, ...newData } = req.body;
    if (!id || !newData) return res.sendStatus(400);

    const { result, error } = await updateDep(id, newData);
    if (error)
      return res.status(error.status).json({ message: error.message, error: error?.error });

    return res.status(200).json(result.department);
  }

  async deleteDepartment(req, res) {
    const { id } = req.body;
    if (!id) return res.sendStatus(400);

    const { result, error } = await deleteDep(id);
    if (error)
      return res.status(error.status).json({ message: error.message, error: error?.error });

    return res.status(200).json(result.message);
  }
}

module.exports = new DepartmentController();
