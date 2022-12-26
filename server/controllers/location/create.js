const Location = require("../../models/location");

module.exports = async (req, res) => {
  const { name } = req.body;

  if (!name)
    return res
      .status(422)
      .json({ success: false, message: "Please enter a location" });

  try {
    const location = await Location.create({ name });

    return res.status(200).json({
      success: true,
      message: "Location added successfully",
      location,
    });
  } catch (error) {
    console.log("cannot add location: ", error);
    return res.status(500).json({
      success: false,
      message: "Cannot add new location. Internal server error",
    });
  }
};
