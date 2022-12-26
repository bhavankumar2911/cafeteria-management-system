const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies["user-token"];

  if (!token)
    return res
      .status(403)
      .json({ success: false, message: "You are not authorized" });

  try {
    const decrypted = jwt.verify(token, process.env.USER_JWT_SECRET);

    req.user = { ...decrypted };

    if (req.path == "/user-auth")
      return res
        .status(200)
        .json({ success: true, message: "You are authorized" });

    return next();
  } catch (error) {
    return res
      .status(403)
      .json({ success: false, message: "You are not authorized" });
  }
};
