const commentService = require("../services/comment.service");
const COMMENT_SERVICE = new commentService();

const sendComment = async (req, res) => {
  try {
    const comment = await COMMENT_SERVICE.createComment(req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCommentByEventId = async (req, res) => {
  try {
    const comment = await COMMENT_SERVICE.getCommentByEvenId(req.query.id);
    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCommentsByUserId = async (req, res) => {
  try {
    const comments = await COMMENT_SERVICE.getCommentsByUserId(
      req.params.userId
    );
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const comment = await COMMENT_SERVICE.updateComment(
      req.params.id,
      req.body
    );
    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const success = await COMMENT_SERVICE.deleteComment(req.params.id);
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  sendComment,
  getCommentByEventId,
  getCommentsByUserId,
  updateComment,
  deleteComment,
};
