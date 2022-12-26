const router = require("express").Router();
const create = require("../controllers/customOrder/create");
const deleteOneAsAdmin = require("../controllers/customOrder/deleteOneAsAdmin");
const readAllAsUser = require("../controllers/customOrder/readAllAsUser");
const readOneAsUser = require("../controllers/customOrder/readOneAsUser");
const readAllAsAdmin = require("../controllers/customOrder/readAllAsAdmin");
const updateOneAsAdmin = require("../controllers/customOrder/updateOneAsAdmin");
const userAuth = require("../middlewares/userAuth");
const adminAuth = require("../middlewares/adminAuth");

// features for users

router.post("/", userAuth, create);

router.get("/as-user", userAuth, readAllAsUser);

// router.get("/:id", userAuth, readOneAsUser);

// // features for admin

router.get("/as-admin", adminAuth, readAllAsAdmin);

router.patch("/:id", adminAuth, updateOneAsAdmin);

router.delete("/as-admin/:id", adminAuth, deleteOneAsAdmin);

module.exports = router;
