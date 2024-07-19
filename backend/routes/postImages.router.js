const express = require("express")

const router = express.Router()

const postImagesController = require("../controllers/postImages.controller")

router.post("/create", postImagesController.create)
router.route('/:id')
        .get(postImagesController.getById)
        .put(postImagesController.update)
        .delete(postImagesController._delete)

module.exports = router