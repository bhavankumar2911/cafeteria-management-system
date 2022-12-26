const OrderDetail = require("../../models/orderDetail");
const Order = require("../../models/order");
const Menu = require("../../models/menu");

module.exports = async (req, res) => {
  try {
    // const orderDetails=await OrderDetail.findAll({where:{isClosed:false}})
    const orders = await Order.findAll({
      where: { isClosed: false },
      attributes: ["id"],
    });

    if (orders.length == 0)
      return res.status(200).json({
        success: true,
        message: "All orders are closed",
        orderDetails: [],
      });

    const orderIds = orders.map((order) => order.id);

    const orderDetails = await OrderDetail.findAll({
      where: { orderId: [...orderIds] },
      attributes: ["foodName", "quantity"],
      include: { model: Menu },
    });

    return res.status(200).json({
      success: true,
      orderDetails,
    });
  } catch (error) {
    console.log("Cannot fetch orders count", error);
    return res.status(500).json({
      success: false,
      message: "Cannot fetch orders count",
    });
  }
};
