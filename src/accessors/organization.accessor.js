const { sequelize, DataTypes } = require('../../db');
const sequelizeOrganization = require('../models/organization');

const defineOrganization = sequelizeOrganization(sequelize, DataTypes);

class OrganizationAccessor {
  createOrganizationInstance() {
    return defineOrganization;
  }
}

module.exports = new OrganizationAccessor();
