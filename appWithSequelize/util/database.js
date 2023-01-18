const Sequelize = require("sequelize");

const sequelize = new Sequelize("node_app", "admin", "Admin@9182$", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
