const express = require("express");

const router = express.Router();

const eventController = require("../controllers/event.controller");

router.post("/create", eventController.create);
router.get("/all", eventController.get);
router.get("/:id", eventController.getById);
router.get("/user/:id", eventController.getEventByUserId);
router.put("/:id", eventController.update);
router.delete("/:id", eventController._delete);

module.exports = router;
