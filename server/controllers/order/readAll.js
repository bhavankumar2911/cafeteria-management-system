const Order = require("../../models/order");
const User = require("../../models/user");
const OrderDetail = require("../../models/orderDetail");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  const { path } = req;
  let whereCondition = {};

  if (path == "/pending") whereCondition.isClosed = false;
  else if (path == "/closed") whereCondition.isClosed = true;

  try {
    const orders = await Order.findAll({
      where: { ...whereCondition, userId: { [Op.not]: null } },
      include: User,
    });

    const orderDetails = await OrderDetail.findAll({
      include: Order,
      where: {
        orderId: [...orders.map((order) => order.id)],
      },
    });

    return res.status(200).json({ success: true, orderDetails, orders });
  } catch (error) {
    console.log("Cannot fetch the orders", error);
    return res.status(500).json({
      success: false,
      message: "Cannot fetch the orders. Internal server error",
    });
  }
};
