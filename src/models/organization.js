const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'organization',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      projects: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      organization_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      headquarter_address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'organization',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'organization_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
