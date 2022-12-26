const Menu = require("../../models/menu");

module.exports = async (req, res) => {
  try {
    const menu = await Menu.findAll({
      attributes: ["id", "foodName", "isAvailable", "price"],
    });

    return res.status(200).json({ success: true, menu });
  } catch (error) {
    console.log("cannot fetch menu: ", error);
    return res.status(500).json({
      success: false,
      message: "Cannot fetch menu. Internal server error",
    });
  }
};
