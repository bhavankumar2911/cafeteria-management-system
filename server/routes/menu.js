const router = require("express").Router();
const create = require("../controllers/menu/create");
const read = require("../controllers/menu/read");
const readOne = require("../controllers/menu/readOne");
const deleteFood = require("../controllers/menu/delete");
const update = require("../controllers/menu/update");
const adminAuth = require("../middlewares/adminAuth");

router.post("/", adminAuth, create);

router.get("/", read);

router.get("/:id", readOne);

router.delete("/:id", adminAuth, deleteFood);

router.patch("/:id", adminAuth, update);

module.exports = router;
