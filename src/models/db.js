const mysql = require("mysql2/promise");

require("dotenv").config();

const dbPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});
module.exports = dbPool;
