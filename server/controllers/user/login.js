const User = require("../../models/user");
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
    const user = await User.findOne({
      where: { username },
      attributes: ["password", "email", "name", "phone", "id"],
    });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    // comparing password
    if (!bcrypt.compareSync(password, user.password))
      return res
        .status(422)
        .json({ success: false, message: "Wrong password" });

    // signing jwt
    const token = jwt.sign(
      { username, id: user.id },
      process.env.USER_JWT_SECRET
    );

    res.cookie("user-token", token, { httpOnly: true });

    const { email, name, phone } = user;

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: { email, name, phone },
    });
  } catch (error) {
    console.log("Cannot login user: ", error);
    return res.status(500).json({
      success: false,
      message: "Cannot login - Internal server error",
    });
  }
};
