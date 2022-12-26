const User = require("../../models/user");
const ForgotPassword = require("../../models/forgotPassword");
const { nanoid } = require("nanoid");
const sendMail = require("../../gmail/sendMail");

module.exports = async (req, res) => {
  const { username } = req.body;

  if (!username)
    return res
      .status(422)
      .json({ success: false, message: "Username is required" });

  try {
    const user = await User.findOne({
      where: { username },
      attributes: ["email", "name"],
    });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "No user found with this username" });

    const existingResetID = await ForgotPassword.findOne({
      where: { username },
    });

    if (existingResetID) {
      const { success } = await sendMail(existingResetID.resetID, user.email);

      if (!success)
        return res.status(500).json({
          success: false,
          message: "Cannot send password reset mail. Internal server error",
        });

      return res.status(200).json({
        success: true,
        message: "Check your email inbox",
      });
    }

    const resetID = nanoid();
    await ForgotPassword.create({ resetID, username });

    const { success } = await sendMail(resetID, user.email);

    if (!success)
      return res.status(500).json({
        success: false,
        message: "Cannot send password reset mail. Internal server error",
      });

    return res.status(200).json({
      success: true,
      message: "Check your email inbox",
    });
  } catch (error) {
    console.log("Cannot reset mail. Internal server error", error);
    return res.status(404).json({
      success: false,
      message: "Cannot reset mail. Internal server error",
    });
  }
};
