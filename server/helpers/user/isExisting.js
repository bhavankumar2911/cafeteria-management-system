const User = require("../../models/user");
const { Op } = require("sequelize");

module.exports = async (registerNumber, username) => {
  try {
    const user = await User.findOne({
      where: { [Op.or]: [{ registerNumber }, { username }] },
      attributes: ["username", "registerNumber"],
    });

    if (!user) return { existing: false, message: "User doesn't exist", user };

    if (
      user.registerNumber == parseInt(registerNumber) &&
      user.username == username
    )
      return {
        existing: true,
        message: "User with this register number and username already exists",
        user,
      };
    else if (user.registerNumber == registerNumber)
      return {
        existing: true,
        message: "User with this register number already exists",
        user,
      };
    else return { existing: true, message: "Username is already taken", user };
  } catch (error) {
    return { existing: true, message: "Internal server error", user: null };
  }
};
