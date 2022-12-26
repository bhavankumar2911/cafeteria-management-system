const CustomOrder = require("../../models/customOrder");

module.exports = async (req, res) => {
  const { id } = req.user;

  try {
    const orders = await CustomOrder.findAll({ where: { userId: id } });

    return res.status(200).json({
      success: true,
      message: `You have ${orders.length} custom orders.`,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Internal server error`,
    });
  }
};
