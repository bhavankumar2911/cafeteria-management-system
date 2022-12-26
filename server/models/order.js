const dbInstance = require("../db/instance");
const { DataTypes } = require("sequelize");
const { FLOAT, BOOLEAN, STRING, TEXT } = DataTypes;
const User = require("./user");

const Order = dbInstance.define("Order", {
  id: {
    type: STRING,
    primaryKey: true,
    allowNull: false,
  },
  amount: {
    type: FLOAT,
    allowNull: false,
  },
  isClosed: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  razorpayOrderId: {
    type: STRING,
    allowNull: false,
  },
  razorpayPaymentId: {
    type: STRING,
    allowNull: false,
  },
  razorpaySignature: {
    type: TEXT,
    allowNull: false,
  },
  takeawayLocation: {
    type: STRING,
    allowNull: false,
  },
});

Order.belongsTo(User, { foreignKey: "userId" });

module.exports = Order;
