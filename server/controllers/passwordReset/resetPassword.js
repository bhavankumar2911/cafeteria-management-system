const User = require("../../models/user");
const ForgotPassword = require("../../models/forgotPassword");
const bcryptjs = require("bcryptjs");

module.exports = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    let result = await ForgotPassword.findOne({
      where: { resetID: id },
      attributes: ["username"],
    });

    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "No password reset id is found" });

    result = await User.update(
      { password: bcryptjs.hashSync(password, bcryptjs.genSaltSync(10)) },
      { where: { username: result.username } }
    );

    if (!result[0])
      return res
        .status(422)
        .json({ success: false, message: "Password not changed" });

    return res.status(200).json({
      success: true,
      message: "Password changed",
    });
  } catch (error) {
    console.log("Cannot change password. Internal server error", error);
    return res.status(500).json({
      success: false,
      message: "Cannot change password. Internal server error",
    });
  }
};
