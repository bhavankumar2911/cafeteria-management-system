const dbInstance = require("../db/instance");
const { DataTypes, STRING } = require("sequelize");
const { FLOAT, INTEGER } = DataTypes;
const Order = require("./order");
const User = require("./user");
const Menu = require("./menu");

const OrderDetail = dbInstance.define(
  "order_details",
  {
    foodName: {
      type: STRING,
      allowNull: false,
    },
    quantity: {
      type: INTEGER,
      allowNull: false,
    },
    price: {
      type: FLOAT,
      allowNull: false,
    },
    amount: {
      type: FLOAT,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

OrderDetail.belongsTo(Order, { foreignKey: "orderId" });
OrderDetail.belongsTo(User, { foreignKey: "userId" });
OrderDetail.belongsTo(Menu, { foreignKey: "menuId" });

module.exports = OrderDetail;
