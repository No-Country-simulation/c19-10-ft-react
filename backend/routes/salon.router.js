const express = require("express")

const router = express.Router()

const salonController = require("../controllers/salon.controller")

router.post("/create", salonController.create)
router.get("/all", salonController.get)
router.get("/:id", salonController.getById)
router.get("/user/:id", salonController.getSalonByUserId)
router.put("/:id", salonController.update)
router.delete("/:id", salonController._delete)

module.exports = router