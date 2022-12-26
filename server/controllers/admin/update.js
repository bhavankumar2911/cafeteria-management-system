const Admin = require("../../models/admin");
const validator = require("validator");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  const { username, password } = req.body;

  try {
  } catch (error) {
    console.log("Cannot update admin: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
