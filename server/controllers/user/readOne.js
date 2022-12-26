const User = require("../../models/user");

module.exports = async (req, res) => {
  const { username } = req.user;

  try {
    const user = await User.findOne({
      where: { username },
      attributes: [
        "name",
        "email",
        "phone",
        "registerNumber",
        "department",
        "username",
        "graduationYear",
      ],
    });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Cannot fetch user - Internal server error");
    return res.status(500).json({
      success: false,
      message: "Cannot fetch user - Internal server error",
    });
  }
};
