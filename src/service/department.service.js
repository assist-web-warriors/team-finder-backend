const { createUserInstance } = require('../accessors/user.accessor');
const { createDepartmentInstance } = require('../accessors/department.accessor');
const { createOrganizationInstance } = require('../accessors/organization.accessor');
const { sequelize } = require('../../db');
const { roles } = require('../utils/constants');

const UserInstance = createUserInstance();
const DepartmentInstance = createDepartmentInstance();
const OrganizationInstance = createOrganizationInstance();

class DepartmentService {
  async createDepartment(adminId, departmentName, managerId) {
    try {
      const department = await sequelize.transaction(async (transaction) => {
        const admin = await UserInstance.findOne({ where: { id: adminId } }, { transaction });
        if (!admin) {
          return { error: { status: 404, message: 'Admin not found.' } };
        }

        const manager = await UserInstance.findOne({ where: { id: managerId } }, { transaction });
        if (!manager) {
          return { error: { status: 404, message: 'Manager not found.' } };
        }

        if (!manager.organization && manager.roles.includes(roles.dep_manager)) {
          manager.organization = admin.organization;
          await manager.save();
          return await DepartmentInstance.create(
            {
              organization_id: admin.organization,
              manager: managerId,
              name: departmentName,
            },
            { transaction },
          );
        }

        return { error: { status: 400, message: 'Manager has already assign to organization.' } };
      });

      return {
        result: { department, message: 'Department created.' },
      };
    } catch (err) {
      return {
        error: { status: 500, message: 'Create department error occurred.', error: err.message },
      };
    }
  }

  async getDepartments(id) {
    try {
      const departments = await sequelize.transaction(async (transaction) => {
        const organization = await OrganizationInstance.findOne(
          { where: { created_by: id } },
          { transaction },
        );
        if (!organization) {
          return { error: { status: 404, message: 'Organization not found.' } };
        }

        return await DepartmentInstance.findAll(
          {
            attributes: ['id', 'manager', 'name', 'skills', 'projects', 'members'],
            where: { organization_id: organization.id },
          },
          { transaction },
        );
      });

      if (!departments) {
        return { error: { status: 404, message: 'Departments not found.' } };
      }

      return {
        result: { departments, message: 'Departments found.' },
      };
    } catch (err) {
      return {
        error: {
          status: 500,
          message: 'Get departments error occurred.',
          error: err.message,
        },
      };
    }
  }
}

module.exports = new DepartmentService();