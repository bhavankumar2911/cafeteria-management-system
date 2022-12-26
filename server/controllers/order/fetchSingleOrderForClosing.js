const Order = require("../../models/order");
const User = require("../../models/user");
const OrderDetail = require("../../models/orderDetail");
const listify = require("listify");

module.exports = async (req, res) => {
  const { orderId } = req.params;

  try {
    const orderDetails = await OrderDetail.findAll({
      where: { orderId },
      include: [
        { model: Order, attributes: ["id", "isClosed"] },
        { model: User, attributes: ["name"] },
      ],
    });

    if (orderDetails[0].Order.isClosed)
      return res
        .status(400)
        .json({ success: false, message: "Order is already closed!" });

    const itemsString = listify(
      orderDetails.map((item) => `${item.quantity} ${item.foodName}`)
    );

    console.log(orderDetails);

    if (orderDetails.length < 1)
      return res
        .status(404)
        .json({ success: false, message: "Order not found! here" });

    return res.status(200).json({
      success: true,
      order: {
        id: orderId,
        items: itemsString,
        orderedBy: orderDetails[0].User.name,
      },
    });
  } catch (error) {
    console.log("Cannot fetch order", error);
    return res.status(500).json({
      success: false,
      message: "Cannot fetch order. Internal Server Error",
    });
  }
};
