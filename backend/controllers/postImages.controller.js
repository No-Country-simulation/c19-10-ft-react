const PostImagesService = require("../services/postImages.service");

const postImagesService = new PostImagesService()

const create = async (req, res) => {
    try {
        const newPostImages = await postImagesService.create(req.body)
        res.status(201).json({ message: "Image created successfully", newPostImages })
    } catch (error) {
        res.status(400).json({ message: "Error creating image", error });
    }
}

const get = async (req, res) => {
    try {
        const allImages = await postImagesService.findAll()
        res.status(200).json({ message: "These are the total images", allImages })
    } catch (error) {
        res.status(400).json({ message: "Error getting images", error });
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params
        const imageById = await postImagesService.findById(id)
        res.status(200).json({ message: `Image with id: ${id} found`, imageById })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const updatedImage = await postImagesService.updatePost(id, body);
        res.status(200).json({ message: `Post with id: ${id} updated`, updatedImage })
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const _delete = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedImage = await postImagesService.delete(id);
        res.status(200).json({ message: `Post with id: ${id} deleted`, deletedImage })
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