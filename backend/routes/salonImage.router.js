const express = require("express")

const router = express.Router()
const parser = require("../config/multer");

const salonImageController = require("../controllers/salonImage.controller")

router.post("/create", parser.single("image"), salonImageController.createAssociation)
router.delete("/:id", salonImageController.deleteAssociation)

module.exports = router