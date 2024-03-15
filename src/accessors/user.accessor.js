const { sequelize, DataTypes } = require('../../db');
const sequelizeUser = require('../models/user');

const defineUser = sequelizeUser(sequelize, DataTypes);

class UserAccessor {
  createUserInstance() {
    return defineUser;
  }
}

module.exports = new UserAccessor();
