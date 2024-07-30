const express = require("express");

const router = express.Router();
const parser = require("../config/multer");
const postController = require("../controllers/post.controller");

router.post("/create", parser.single("image"), postController.create);
router.get("/all", postController.get);
router
  .route("/:id")
  .get(postController.getById)
  .put(postController.update)
  .delete(postController._delete);

module.exports = router;
