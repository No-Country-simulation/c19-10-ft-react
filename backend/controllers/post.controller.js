const PostService = require("../services/post.service");

const postService = new PostService()

const create = async (req, res) => {
    try {
        const newPost = await postService.create(req.body)
        res.status(201).json({ message: "Post created successfully", newPost })
    } catch (error) {
        res.status(400).json({ message: "Error creating post", error });
    }
}

const get = async (req, res) => {
    try {
        const allPosts = await postService.findAll()
        res.status(200).json({ message: "These are the total posts", allPosts })
    } catch (error) {
        res.status(400).json({ message: "Error getting posts", error });
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params
        const postById = await postService.findById(id)
        res.status(200).json({ message: `Post with id: ${id} found`, postById })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const updatedPost = await postService.updatePost(id, body);
        res.status(200).json({ message: `Post with id: ${id} updated`, updatedPost })
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const _delete = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPost = await postService.delete(id);
        res.status(200).json({ message: `Post with id: ${id} deleted`, deletedPost })
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};


module.exports = {
    create,
    get,
    getById,
    update,
    _delete
}