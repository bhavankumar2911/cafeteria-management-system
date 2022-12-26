if (!process.env.NODE_ENV || process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const dbInstance = require("./db/instance");
const adminRouter = require("./routes/admin");
const menuRouter = require("./routes/menu");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");
const paymentRouter = require("./routes/payment");
const locationRouter = require("./routes/location");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userAuth = require("./middlewares/userAuth");
const sendPasswordResetMail = require("./controllers/passwordReset/sendResetMail");
const resetPassword = require("./controllers/passwordReset/resetPassword");
const path = require("path");
const customOrderRouter = require("./routes/customOrder");

const app = express();

(async () => {
  try {
    await dbInstance.authenticate();
    console.log("Connected to database...");
  } catch (error) {
    console.log("Cannot connect to database: ", error);
  }
})();

(async () => {
  try {
    await dbInstance.sync({ alter: false });
    console.log("All models synchronized...");
  } catch (error) {
    console.log("Cannot synchronize models: ", error);
  }
})();

// middlewares
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "client", "out")));
app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_HOST],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);

// view routes only for production

// landing page
app.get("/", (req, res) => {
  return res.sendFile(
    path.join(__dirname, "..", "client", "out", "index.html")
  );
});

// user pages

app.get("/user/cart", (req, res) => {
  return res.sendFile(
    path.join(__dirname, "..", "client", "out", "user", "cart.html")
  );
});

app.get("/user/login", (req, res) => {
  return res.sendFile(
    path.join(__dirname, "..", "client", "out", "user", "login.html")
  );
});

app.get("/user/orders", (req, res) => {
  return res.sendFile(
    path.join(__dirname, "..", "client", "out", "user", "orders.html")
  );
});

app.get("/user/profile", (req, res) => {
  return res.sendFile(
    path.join(__dirname, "..", "client", "out", "user", "profile.html")
  );
});

app.get("/user/reset-password", (req, res) => {
  return res.sendFile(
    path.join(__dirname, "..", "client", "out", "user", "reset-password.html")
  );
});

app.get("/user/signup", (req, res) => {
  return res.sendFile(
    path.join(__dirname, "..", "client", "out", "user", "signup.html")
  );
});

app.get("/user/update", (req, res) => {
  return res.sendFile(
    path.join(__dirname, "..", "client", "out", "user", "update.html")
  );
});

app.get("/user/custom-order", (req, res) => {
  return res.sendFile(
    path.join(__dirname, "..", "client", "out", "user", "custom-order.html")
  );
});

// admin pages

app.get("/admin/orders", (req, res) => {
  return res.sendFile(
    path.join(__dirname, "..", "client", "out", "admin", "orders.html")
  );
});

app.get("/admin/menu", (req, res) => {
  return res.sendFile(
    path.join(__dirname, "..", "client", "out", "admin", "menu.html")
  );
});

app.get("/admin/dashboard", (req, res) => {
  return res.sendFile(
    path.join(__dirname, "..", "client", "out", "admin", "dashboard.html")
  );
});

app.get("/admin/signup", (req, res) => {
  return res.sendFile(
    path.join(__dirname, "..", "client", "out", "admin", "signup.html")
  );
});

app.get("/admin/login", (req, res) => {
  return res.sendFile(
    path.join(__dirname, "..", "client", "out", "admin", "login.html")
  );
});

// api routes
app.use("/admin", adminRouter);
app.use("/menu", menuRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);
app.use("/payment", paymentRouter);
app.use("/location", locationRouter);
app.get("/user-auth", userAuth);
app.post("/generate-password-reset-id", sendPasswordResetMail);
app.patch("/reset-password/:id", resetPassword);
app.use("/custom-order", customOrderRouter);

const PORT = process.env.NODE_PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
