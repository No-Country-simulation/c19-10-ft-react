const express = require("express")

const router = express.Router()

const postController = require("../controllers/post.controller")

router.post("/create", postController.create)
router.get("/all", postController.get)
router.route('/:id')
        .get(postController.getById)
        .put(postController.update)
        .delete(postController._delete)

module.exports = router