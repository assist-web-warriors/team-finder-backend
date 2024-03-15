const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DN_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  ssl: true,
});

module.exports = { sequelize, DataTypes };
