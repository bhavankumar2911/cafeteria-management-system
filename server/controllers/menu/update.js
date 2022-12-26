const Menu = require("../../models/menu");
const { isInt, isFloat } = require("validator");

module.exports = async (req, res) => {
  const { id } = req.params;
  const { foodName, price } = req.body;

  if (!foodName || !price)
    return res
      .status(422)
      .json({ success: false, message: "Enter all fields" });

  if (!isInt(price.toString()) || !isFloat(price.toString()))
    return res
      .status(422)
      .json({ success: false, message: "Price should be in number" });

  try {
    const result = await Menu.update({ ...req.body }, { where: { id } });

    if (!result[0])
      return res
        .status(422)
        .json({ success: false, message: "Food not updated" });

    return res
      .status(200)
      .json({ success: true, message: "Food updated", food: { ...req.body } });
  } catch (error) {
    console.log("cannot update food: ", error);
    return res.status(500).json({
      success: false,
      message: "Cannot update food. Internal server error",
    });
  }
};
