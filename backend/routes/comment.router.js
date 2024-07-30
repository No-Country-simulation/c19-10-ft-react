const express = require("express");
const commentController = require("../controllers/comment.controller");

const router = express.Router();

router.post("/create", commentController.sendComment);
router.get("/:id", commentController.getCommentById);
router.get("/users/:userId/comment", commentController.getCommentsByUserId);
router.put("/:id", commentController.updateComment);
router.delete("/delete/:id", commentController.deleteComment);

module.exports = router;
