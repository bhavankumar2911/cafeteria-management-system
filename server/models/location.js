const dbInstance = require("../db/instance");
const { DataTypes } = require("sequelize");
const { STRING, INTEGER } = DataTypes;
const Order = require("./order");

const Location = dbInstance.define("Location", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = Location;
