const User = require("../../models/user");
const { isInt, trim, isAlphanumeric } = require("validator");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const { name, registerNumber, department, username, graduationYear } =
    req.body;

  const token = req.cookies.token;
  const currentUserInfo = jwt.decode(token);

  if (!name || !registerNumber || !department || !username || !graduationYear) {
    return res
      .status(422)
      .json({ success: false, message: "Enter all fields" });
  }

  if (!isInt(registerNumber) || registerNumber.length != 12)
    return res
      .status(422)
      .json({ success: false, message: "Enter a valid register number" });

  if (!isAlphanumeric(username))
    return res.status(422).json({
      success: false,
      message: "Username should contain only alphabets and numbers",
    });

  if (!isInt(graduationYear))
    return res.status(422).json({
      success: false,
      message: "Year of graduation should be a number",
    });

  try {
    console.log(trim(name));
    // updating user in db
    await User.update(
      {
        username: trim(username),
        name: trim(name),
        registerNumber,
        department,
        graduationYear,
      },
      { where: { username: currentUserInfo.username } }
    );

    // signing new jwt
    if (currentUserInfo.username != username) {
      const token = jwt.sign({ username }, process.env.USER_JWT_SECRET);

      res.cookie("user-token", token, { httpOnly: true });
    }

    return res.status(200).json({
      success: true,
      message: "Changes saved",
      user: {
        name,
        registerNumber,
        department,
        username,
        graduationYear,
      },
    });
  } catch (error) {
    if (error.name == "SequelizeUniqueConstraintError") {
      if (error.fields.hasOwnProperty("registerNumber"))
        return res.status(422).json({
          success: false,
          message: "User with this register number already exists",
        });

      return res.status(422).json({
        success: false,
        message: "Username is already taken",
      });
    }

    console.log("Cannot save changes - ", error);
    return res.status(200).json({
      success: false,
      message: "Cannot save changes - Internal server error",
    });
  }
};
