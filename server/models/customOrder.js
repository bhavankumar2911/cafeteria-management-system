const dbInstance = require("../db/instance");
const { DataTypes } = require("sequelize");
const { STRING, TEXT, BOOLEAN } = DataTypes;
const User = require("./user");

const CustomOrder = dbInstance.define("CustomOrder", {
  id: {
    type: STRING,
    primaryKey: true,
    allowNull: false,
  },
  description: {
    type: TEXT,
    allowNull: false,
  },
  isClosed: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  takeawayLocation: {
    type: STRING,
    allowNull: false,
  },
  approvalStatus: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

CustomOrder.belongsTo(User, { foreignKey: "userId" });

module.exports = CustomOrder;
