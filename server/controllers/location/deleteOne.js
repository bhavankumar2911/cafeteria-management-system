const Location = require("../../models/location");

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    await Location.destroy({ where: { id } });

    return res
      .status(200)
      .json({ success: true, message: "Location removed." });
  } catch (error) {
    console.log("cannot delete location: ", error);
    return res.status(500).json({
      success: false,
      message: "Cannot remove location. Internal server error",
    });
  }
};
