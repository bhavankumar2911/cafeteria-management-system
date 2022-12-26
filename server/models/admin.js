const dbInstance = require("../db/instance");
const { DataTypes } = require("sequelize");
const { STRING, INTEGER, TEXT } = DataTypes;

module.exports = dbInstance.define("Admin", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: TEXT,
    allowNull: false,
  },
});
