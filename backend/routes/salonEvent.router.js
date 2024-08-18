const express = require("express")

const router = express.Router()

const salonEventController = require("../controllers/salonEvent.controller")

router.post("/create", salonEventController.createAssociation)
router.put("/:id", salonEventController.updateAssociation)
router.delete("/:id", salonEventController.deleteAssociation)

module.exports = router