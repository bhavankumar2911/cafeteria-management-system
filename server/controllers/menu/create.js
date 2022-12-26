const Menu = require("../../models/menu");
const { isInt, isFloat } = require("validator");

module.exports = async (req, res) => {
  const { foodName, price, isAvailable } = req.body;

  if (!foodName || !price)
    return res
      .status(422)
      .json({ success: false, message: "Enter all fields" });

  if (!isInt(price) || !isFloat(price))
    return res
      .status(422)
      .json({ success: false, message: "Price should be in number" });

  try {
    const food = await Menu.create({ foodName, price, isAvailable });

    return res.status(200).json({ success: true, message: "Food saved", food });
  } catch (error) {
    console.log("cannot save food: ", error);
    return res.status(500).json({
      success: false,
      message: "Cannot save food. Internal server error",
    });
  }
};
