const User = require("../../models/user");

module.exports = async (req, res) => {
  const { username } = req.user;

  try {
    const deletedCount = await User.destroy({
      where: { username },
    });

    if (deletedCount < 1)
      return res
        .status(422)
        .json({ success: false, message: "Cannot delete user" });

    res.clearCookie("user-token");
    return res.status(200).json({ success: true, message: "Account deleted" });
  } catch (error) {
    console.log("Cannot delete account - Internal server error", error);
    return res.status(500).json({
      success: false,
      message: "Cannot delete account - Internal server error",
    });
  }
};
