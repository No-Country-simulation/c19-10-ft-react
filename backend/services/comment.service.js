const { models } = require("../libs/sequelize");

class CommentService {
  constructor() {}
  async createComment(commentData) {
    const { content, userId, postId } = commentData;

    try {
      const newComment = await models.Comment.create({
        content,
        userId,
        postId,
      });

      return newComment;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getCommentByEvenId(id) {
    try {
      return await models.Comment.findAll({
        where: { postId: id },
        include: [
          {
            model: models.User,
            as: "user",
            attributes: ["id", "name"],
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getCommentsByUserId(userId) {
    return await this.Comment.findAll({ where: { userId } });
  }

  async updateMessage(id, commentData) {
    try {
      const comment = await this.getCommentById(id);
      if (!comment) {
        throw new Error("Comment not found");
      }
      return await comment.update(commentData);
    } catch (error) {
      console.error(error);
      throw new Error("Unable to update comment");
    }
  }

  async deleteComment(id) {
    try {
      const comment = await this.getCommentById(id);
      if (!comment) {
        throw new Error("comment not found");
      }
      await comment.destroy();
      return { deleted: true };
    } catch (error) {
      console.error(error);
      throw new Error("Unable to delete comment");
    }
  }
}

module.exports = CommentService;
