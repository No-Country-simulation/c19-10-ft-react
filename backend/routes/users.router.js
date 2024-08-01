const express = require("express");

const router = express.Router();

const usersController = require("../controllers/users.controller");

router.post("/forgot-password", usersController.updatePassword);
router.put("/reset-password", usersController.resetPassword);
router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.post("/refresh-token", usersController.refreshToken);
router.post("/generate-tokens", usersController.updateUserPlan);
router.get("/", usersController.get);
router.get("/:id", usersController.getById);
router.get("/name/name", usersController.getByName);
router.put("/:id", usersController.update);
router.delete("/:id", usersController._delete);

module.exports = router;
