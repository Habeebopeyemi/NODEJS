const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "admin",
  database: "node_app",
  password: "Admin@9182$",
});

module.exports = pool.promise();
