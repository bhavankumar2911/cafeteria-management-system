const dbInstance = require("../db/instance");
const { DataTypes } = require("sequelize");
const { STRING } = DataTypes;

const ForgotPassword = dbInstance.define(
  "forgot_password",
  {
    resetID: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
  },
  { freezeTableName: true }
);

module.exports = ForgotPassword;
