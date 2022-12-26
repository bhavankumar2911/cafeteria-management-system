const Order = require("../../models/order");

module.exports = async (req, res) => {
  const { orderId } = req.params;

  try {
    const [rows] = await Order.update(
      { isClosed: true },
      {
        where: {
          id: orderId,
        },
      }
    );

    if (rows == 0)
      return res
        .status(400)
        .json({ success: false, message: "Order not closed" });

    return res.status(200).json({ success: true, message: "Order closed" });
  } catch (error) {
    console.log("Cannot close the order", error);
    return res.status(500).json({
      success: false,
      message: "Cannot close the order. Internal server error",
    });
  }
};
