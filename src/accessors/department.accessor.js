const { sequelize, DataTypes } = require('../../db');
const sequelizeDepartment = require('../models/department');

const defineDepartment = sequelizeDepartment(sequelize, DataTypes);

class DepartmentAccessor {
  createDepartmentInstance() {
    return defineDepartment;
  }
}

module.exports = new DepartmentAccessor();
