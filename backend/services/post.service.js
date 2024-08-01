const { models } = require("../libs/sequelize");

class PostService {
  constructor() {}

  async create(data) {
    try {
      const newPost = await models.Post.create(data);
      return newPost;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async countUserPosts(userId, eventId) {
    try {
      return await models.Post.count({
        where: { userId: userId, eventId: eventId },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll(id) {
    try {
      return await models.Post.findAll({
        where: { eventId: id },
        include: [
          {
            model: models.User,
            as: "user",
            attributes: ["id", "name"],
          },
          {
            model: models.Comment,
            as: "comments",
            attributes: ["id", "content"],
            include: [
              {
                model: models.User,
                as: "user",
                attributes: ["id", "name"],
              },
            ],
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  }

  async findById(id) {
    try {
      return await models.Post.findOne({
        where: { id },
      });
    } catch (error) {
      console.log(error);
    }
  }
  async updatePost(id, data) {
    try {
      const model = await this.findById(id);
      return await model.update(data);
    } catch (error) {
      console.error(error);
    }
  }

  async delete(id) {
    try {
      const model = await this.findById(id);
      await model.destroy();
      return { deleted: true };
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = PostService;
