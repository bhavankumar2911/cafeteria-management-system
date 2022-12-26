const Menu = require("../../models/menu");

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    await Menu.destroy({ where: { id } });

    return res.status(200).json({ success: true, message: "Food deleted" });
  } catch (error) {
    console.log("cannot delete food: ", error);
    return res.status(500).json({
      success: false,
      message: "Cannot delete food. Internal server error",
    });
  }
};
