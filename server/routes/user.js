const router = require("express").Router();
const create = require("../controllers/user/create");
const readOne = require("../controllers/user/readOne");
const login = require("../controllers/user/login");
const readAll = require("../controllers/user/readAll");
const userAuth = require("../middlewares/userAuth");
const update = require("../controllers/user/update");
const deleteUser = require("../controllers/user/delete");
const logout = require("../controllers/user/logout");

router.post("/", create);

router.get("/", userAuth, readOne);

router.get("/", readAll);

router.patch("/", userAuth, update);

router.delete("/", userAuth, deleteUser);

router.post("/login", login);

router.get("/logout", userAuth, logout);

module.exports = router;
