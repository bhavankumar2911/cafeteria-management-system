const router = require("express").Router();
const create = require("../controllers/order/create");
const closeOrder = require("../controllers/order/closeOrder");
const readAll = require("../controllers/order/readAll");
const userAuth = require("../middlewares/userAuth");
const adminAuth = require("../middlewares/adminAuth");
const readOwn = require("../controllers/order/readOwn");
const fetchSingleOrderForClosing = require("../controllers/order/fetchSingleOrderForClosing");
const getOrdersCount = require("../controllers/order/getOrdersCount");

router.get("/pending", adminAuth, readAll);

router.get("/closed", adminAuth, readAll);

router.get("/", adminAuth, readAll);

router.get("/own", userAuth, readOwn);

router.get("/count", adminAuth, getOrdersCount);

router.get("/:orderId", adminAuth, fetchSingleOrderForClosing);

router.post("/", userAuth, create);

router.patch("/:orderId", adminAuth, closeOrder);

module.exports = router;
