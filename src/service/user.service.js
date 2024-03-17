const { createUserInstance } = require('../accessors/user.accessor');
const { createOrganizationInstance } = require('../accessors/organization.accessor');
const { sequelize } = require('../../db');

const UserInstance = createUserInstance();
const OrganizationInstance = createOrganizationInstance();

class UserService {
  async getUserRoles(id) {
    try {
      const user = await UserInstance.findOne({ where: { id } });
      if (!user) {
        return { error: { status: 404, message: 'User was not found.' } };
      }

      return {
        result: { roles: user.roles, message: `Roles ${user.roles}.` },
      };
    } catch (err) {
      return {
        error: { status: 500, message: 'Get user roles error occurred.', error: err.message },
      };
    }
  }

  async getOrganizationUsers(id) {
    try {
      const members = await sequelize.transaction(async (transaction) => {
        const organization = await OrganizationInstance.findOne(
          { where: { created_by: id } },
          { transaction },
        );
        return await UserInstance.findAll(
          {
            attributes: ['id', 'name', 'email', 'roles', 'img', 'organization'],
            where: { organization: organization.id },
          },
          { transaction },
        );
      });

      if (!members) {
        return { error: { status: 404, message: 'Organization members was not found.' } };
      }

      return {
        result: { members, message: `Members found.` },
      };
    } catch (err) {
      return {
        error: {
          status: 500,
          message: 'Get organization members error occurred.',
          error: err.message,
        },
      };
    }
  }
}

module.exports = new UserService();
