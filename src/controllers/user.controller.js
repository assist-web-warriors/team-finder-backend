const {
  getUserRoles,
  getOrganizationUsers,
  getDepartmentManagers: getDepartmentUsers,
} = require('../service/user.service');

class UserController {
  async getRoles(req, res) {
    if (!req.userId) return res.sendStatus(400);

    const { result, error } = await getUserRoles(req.userId);
    if (error)
      return res.status(error.status).json({ message: error.message, error: error?.error });

    return res.status(200).json(result.roles);
  }

  async getUsers(req, res) {
    if (!req.userId) return res.sendStatus(400);

    const { result, error } = await getOrganizationUsers(req.userId);
    if (error)
      return res.status(error.status).json({ message: error.message, error: error?.error });

    return res.status(200).json(result.members);
  }

  async getDepartmentManagers(req, res) {
    if (!req.userId) return res.sendStatus(400);

    const { result, error } = await getDepartmentUsers(req.userId);
    if (error)
      return res.status(error.status).json({ message: error.message, error: error?.error });

    return res.status(200).json(result.managers);
  }
}

module.exports = new UserController();
