const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  "atc-2024-webwarriors-postgresql-database",
  "webwarriors_lfjsmb",
  process.env.DB_PASSWORD,
  {
    host: "atc-2024-postgresql-server.postgres.database.azure.com",
    dialect: "postgres",
    ssl: true,
  }
);

module.exports = { sequelize, DataTypes };
