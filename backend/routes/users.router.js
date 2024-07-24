const express = require("express");

const router = express.Router();

const usersController = require("../controllers/users.controller");

router.post("/updatepassword", usersController.updatePassword);
router.patch("/resetpassword/:token", usersController.resetPassword);

router.post("/register", usersController.register);
router.post("/login", usersController.login);


router.get("/", usersController.get);
router.get("/:id", usersController.getById);
router.get("/name/name", usersController.getByName);
router.put("/:id", usersController.update);
router.delete("/:id", usersController._delete);

module.exports = router;
