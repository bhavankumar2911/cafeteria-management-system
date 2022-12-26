const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies["admin-token"];

  console.log(token);

  if (!token)
    return res
      .status(403)
      .json({ success: false, message: "You are not authorized" });

  try {
    const decrypted = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

    req.admin = decrypted;

    if (req.path == "/admin-auth")
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
