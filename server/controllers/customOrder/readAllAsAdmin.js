const CustomOrder = require("../../models/customOrder");

module.exports = async (req, res) => {
  try {
    const orders = await CustomOrder.findAll();

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
