const Admin = require("../../models/admin");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const { username, password } = req.body;

  // checking for empty inputs
  if (!username || !password)
    return res
      .status(422)
      .json({ success: false, message: "Enter all fields" });

  //   validate username
  if (!validator.isAlphanumeric(username))
    return res.status(422).json({
      success: false,
      message: "Username should contain only alphabets and numbers",
    });

  try {
    // checking if user exits
    const admin = await Admin.findOne({ where: { username } });

    if (!admin)
      return res
        .status(404)
        .json({ success: false, message: "Admin doesn't exist" });

    // comparing password
    if (!bcrypt.compareSync(password, admin.password))
      return res
        .status(422)
        .json({ success: false, message: "Wrong password" });

    // signing jwt
    const token = jwt.sign({ username }, process.env.ADMIN_JWT_SECRET);

    res.cookie("admin-token", token, { httpOnly: true });
    return res
      .status(200)
      .json({ success: true, message: "Logged in successfully" });
  } catch (error) {
    console.log("Cannot login admin: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
