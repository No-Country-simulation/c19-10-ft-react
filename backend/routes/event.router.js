const express = require("express")

const router = express.Router()

const eventController = require("../controllers/event.controller")

router.post("/create", eventController.create)


module.exports = router