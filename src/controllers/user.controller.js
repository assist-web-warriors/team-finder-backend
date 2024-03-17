const { getUserRoles, getOrganizationUsers } = require('../service/user.service');

class UserController {
  async getRoles(req, res) {
    if (!req.email) return res.sendStatus(400);

    const { result, error } = await getUserRoles(req.email);
    if (error)
      return res.status(error.status).json({ message: error.message, error: error?.error });

    return res.status(200).json(result.roles);
  }

  async getUsers(req, res) {
    if (!req.email) return res.sendStatus(400);

    const { result, error } = await getOrganizationUsers(req.email);
    if (error)
      return res.status(error.status).json({ message: error.message, error: error?.error });

    return res.status(200).json(result.members);
  }
}

module.exports = new UserController();
