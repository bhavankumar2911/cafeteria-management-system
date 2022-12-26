const Location = require("../../models/location");

module.exports = async (req, res) => {
  try {
    const locations = await Location.findAll();

    return res.status(200).json({ success: true, locations });
  } catch (error) {
    console.log("cannot fetch locations: ", error);
    return res.status(500).json({
      success: false,
      message: "Cannot fetch locations. Internal server error",
    });
  }
};
