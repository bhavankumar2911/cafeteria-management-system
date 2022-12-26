const router = require("express").Router();
const create = require("../controllers/location/create");
const deleteOne = require("../controllers/location/deleteOne");
const readAll = require("../controllers/location/readAll");
const adminAuth = require("../middlewares/adminAuth");

router.post("/", adminAuth, create);

router.get("/", readAll);

router.delete("/:id", adminAuth, deleteOne);

module.exports = router;
