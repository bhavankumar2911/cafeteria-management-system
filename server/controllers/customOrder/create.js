const CustomOrder = require("../../models/customOrder");

module.exports = async (req, res) => {
  const { description, takeawayLocation } = req.body;
  const { id } = req.user;

  //   validation
  if (!(description && takeawayLocation)) {
    return res.status(422).json({
      success: false,
      message: "Description and takeaway location are required.",
    });
  }

  try {
    const order = await CustomOrder.create({
      id: `${req.user.username}_${Date.now().toString()}`,
      description,
      takeawayLocation,
      userId: id,
    });

    return res.status(202).json({
      success: true,
      message:
        "Your order is waiting for approval. You will be notified when approved.",
      order,
    });
  } catch (error) {
    console.log("Cannot place order", error);
    return res.status(500).json({
      success: false,
      message: "Cannot place order. Internal server error.",
    });
  }
};
