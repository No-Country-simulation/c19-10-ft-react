const express = require("express")

const router = express.Router()

const imageController = require("../controllers/image.controller")

router.post("/create", imageController.create)
router.get("/", imageController.get)
router.route('/:id')
        .get(imageController.getById)
        .put(imageController.update)
        .delete(imageController._delete)

module.exports = router