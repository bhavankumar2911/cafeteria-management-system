const router = require("express").Router();
const create = require("../controllers/admin/create");
const login = require("../controllers/admin/login");
const update = require("../controllers/admin/update");

router.post("/", create);

router.post("/login", login);

router.patch("/", update);

module.exports = router;
