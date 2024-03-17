const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'department',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      organization_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      manager: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      skills: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
      },
      projects: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      members: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'department',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'department_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
