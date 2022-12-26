const Menu = require("../../models/menu");

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const food = await Menu.findOne({
      where: { id },
      attributes: ["id", "foodName", "isAvailable", "price"],
    });

    if (!food)
      res.status(404).json({
        success: false,
        message: "Food not found",
      });

    return res.status(200).json({ success: true, food });
  } catch (error) {
    console.log("cannot fetch food: ", error);
    return res.status(500).json({
      success: false,
      message: "Cannot fetch food. Internal server error",
    });
  }
};
