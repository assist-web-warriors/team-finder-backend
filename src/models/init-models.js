var DataTypes = require('sequelize').DataTypes;
var _organization = require('./organization');
var _user = require('./user');

function initModels(sequelize) {
  var organization = _organization(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  user.belongsTo(organization, { as: 'organization_organization', foreignKey: 'organization' });
  organization.hasMany(user, { as: 'users', foreignKey: 'organization' });
  organization.belongsTo(user, { as: 'created_by_user', foreignKey: 'created_by' });
  user.hasMany(organization, { as: 'organizations', foreignKey: 'created_by' });

  return {
    organization,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
