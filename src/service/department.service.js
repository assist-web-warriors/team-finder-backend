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

        if (!manager.department && manager.roles.includes(roles.dep_manager)) {
          const result = await DepartmentInstance.create(
            {
              organization_id: admin.organization,
              manager: managerId,
              name: departmentName,
            },
            { transaction },
          );
          manager.department = result.id;
          await manager.save();

          return result;
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

  async getDepartment(id) {
    try {
      const department = await DepartmentInstance.findOne({
        attributes: ['id', 'manager', 'name', 'skills', 'projects', 'members'],
        where: { id },
      });

      if (!department) {
        return { error: { status: 404, message: 'Department not found.' } };
      }

      return {
        result: { department, message: 'Department found.' },
      };
    } catch (err) {
      return {
        error: {
          status: 500,
          message: 'Get department error occurred.',
          error: err.message,
        },
      };
    }
  }

  async deleteDepartment(id) {
    try {
      const department = await DepartmentInstance.findOne({
        where: { id },
      });

      if (!department) {
        return { error: { status: 404, message: 'Department not found.' } };
      }

      return {
        result: { department, message: 'Department found.' },
      };
    } catch (err) {
      return {
        error: {
          status: 500,
          message: 'Get department error occurred.',
          error: err.message,
        },
      };
    }
  }

  async updateDepartment(departmentId, newData) {
    try {
      const updatedDepartment = await sequelize.transaction(async (transaction) => {
        const dep = await DepartmentInstance.update(
          newData,
          { where: { id: departmentId }, returning: true },
          { transaction },
        );

        const oldManager = await UserInstance.findOne(
          { where: { department: departmentId } },
          { transaction },
        );

        if (!oldManager) {
          return { error: { status: 404, message: 'Old manager was not found.' } };
        }

        if (newData.manager && oldManager.id !== newData.manager) {
          oldManager.department = null;
          await oldManager.save();

          await UserInstance.update(
            { department: departmentId },
            { where: { id: newData.manager } },
            { transaction },
          );
        }
        return dep;
      });

      const department = updatedDepartment[1][0];

      if (!department) {
        return { error: { status: 404, message: 'Department not found.' } };
      }

      return {
        result: { department, message: 'Department updated.' },
      };
    } catch (err) {
      return {
        error: {
          status: 500,
          message: 'Update department error occurred.',
          error: err.message,
        },
      };
    }
  }
}

module.exports = new DepartmentService();
