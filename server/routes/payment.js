const createOrder = require("../controllers/payment/createOrder");
const Router = require("express").Router();
const userAuth = require("../middlewares/userAuth");

Router.post("/order", userAuth, createOrder);

module.exports = Router;
