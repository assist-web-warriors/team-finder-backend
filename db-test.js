const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("assist-tech-test", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = { sequelize, DataTypes };
