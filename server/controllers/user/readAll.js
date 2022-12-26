const User = require("../../models/user");

module.exports = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        "name",
        "registerNumber",
        "department",
        "username",
        "graduationYear",
      ],
    });

    return res.status(200).json({ success: false, users });
  } catch (error) {
    console.log("Cannot fetch users - Internal server error");
    return res.status(500).json({
      success: false,
      message: "Cannot fetch users - Internal server error",
    });
  }
};
