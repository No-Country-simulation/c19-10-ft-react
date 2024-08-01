const PostService = require("../services/post.service");
const { models } = require("../libs/sequelize");

const postService = new PostService();

const create = async (req, res) => {
  try {
    const { content, userId, eventId } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const user = await models.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const maxPhotos = user.userPlan === "premium" ? Infinity : 3;
    const photoCount = await postService.countUserPosts(userId, eventId);

    if (photoCount >= maxPhotos) {
      return res.status(403).json({
        message: "Límite de fotos alcanzado, \n suscríbete al plan premium 😉",
      });
    }

    if (userId && eventId && content) {
      const data = { content, userId, eventId, imageUrl };

      const newPost = await postService.create(data);
      res.status(201).json({ message: "Post creado correctamente", newPost });
    } else {
      res.status(400).json({
        frontendMessage: "Content or title must be filled",
        message:
          "Some data is missing or incorrect, data must be provided as...",
        fields: {
          content: "String (nullable)",
          userId: "UUID",
          eventId: "UUID",
        },
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

const get = async (req, res) => {
  const { id } = req.query;
  try {
    const allPosts = await postService.findAll(id);
    if (allPosts.length === 0) {
      res.json({ message: "Posts not found", error });
    }

    res.status(200).json({ message: "These are the total posts", allPosts });
  } catch (error) {
    res.status(400).json({ message: "Error getting posts", error });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const postById = await postService.findById(id);
    res.status(200).json({ message: `Post with id: ${id} found`, postById });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedPost = await postService.updatePost(id, body);
    res
      .status(200)
      .json({ message: `Post with id: ${id} updated`, updatedPost });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const _delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await postService.delete(id);
    res
      .status(200)
      .json({ message: `Post with id: ${id} deleted`, deletedPost });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = {
  create,
  get,
  getById,
  update,
  _delete,
};
