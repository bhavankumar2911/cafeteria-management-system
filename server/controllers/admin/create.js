const Admin = require("../../models/admin");
const bcrypt = require("bcryptjs");
const validator = require("validator");

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

  //   hashing password
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  try {
    //   check for existing admins
    const admins = await Admin.findAll();

    if (admins.length)
      return res
        .status(422)
        .json({ success: false, message: "Admin already exists" });

    // creating the admin in DB
    await Admin.create({ username, password: hashedPassword });

    res.status(200).json({ success: true, message: "Admin created" });
  } catch (error) {
    console.log("Cannot create admin: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
