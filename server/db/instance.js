const { Sequelize } = require("sequelize");

const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_DIALECT } = process.env;

let instance = null;

if (DB_DIALECT == "mysql") {
  instance = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  });
} else {
  instance = new Sequelize({
    dialect: "sqlite",
    storage: "../database.sqlite3",
  });
}

module.exports = instance;
