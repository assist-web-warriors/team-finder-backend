const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'user',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      roles: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
      },
      img: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      organization: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'organization',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'user',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'user_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
};
