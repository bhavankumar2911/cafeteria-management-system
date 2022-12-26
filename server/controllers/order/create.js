const Order = require("../../models/order");
const Menu = require("../../models/menu");
const { Op } = require("sequelize");
const OrderDetail = require("../../models/orderDetail");
const validateCart = require("../../helpers/order/validateCart");
const {
  validatePaymentVerification,
} = require("razorpay/dist/utils/razorpay-utils");

module.exports = async (req, res) => {
  const {
    cart,
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    takeawayLocation,
  } = req.body;
  const { id } = req.user;

  const { isValid, message } = validateCart(cart);
  if (!isValid) return res.status(422).json({ success: false, message });

  // array of food ids in cart
  const foodIdsInCart = cart.map((item) => item.id);

  let totalAmountToBePaid = 0;

  try {
    //   fetching the food from db there are also in cart
    const menu = await Menu.findAll({
      where: {
        id: {
          [Op.or]: [...foodIdsInCart],
        },
      },
    });

    // updating the total amount to be paid by the user
    menu.forEach((menuItem) => {
      cart.forEach((cartItem) => {
        if (cartItem.id == menuItem.id)
          totalAmountToBePaid += cartItem.quantity * menuItem.price;
      });
    });

    // verifying the rp signature
    if (
      !validatePaymentVerification(
        { order_id: razorpayOrderId, payment_id: razorpayPaymentId },
        razorpaySignature,
        process.env.RP_TEST_KEY_SECRET
      )
    )
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });

    // storing an order in order table
    const order = await Order.create({
      amount: totalAmountToBePaid,
      userId: id,
      id: `${req.user.username}_${Date.now().toString()}`,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      takeawayLocation,
    });

    // storing the order details in details table
    await OrderDetail.bulkCreate(
      cart.map((cartItem) => {
        const { foodName, price, amount, quantity } = cartItem;

        const newCartItem = {
          menuId: cartItem.id,
          foodName,
          price,
          amount,
          quantity,
          orderId: order.id,
          userId: id,
        };

        return { ...newCartItem };
      })
    );

    res.status(200).json({
      success: true,
      message: "Order placed",
      orderId: order.id,
    });
  } catch (error) {
    console.log("Cannot process your order", error);
    res.status(500).json({
      success: false,
      message: "Cannot process your order. Internal server error",
    });
  }
};
