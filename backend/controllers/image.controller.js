const ImageService = require("../services/image.service");

const imageService = new ImageService()

const create = async (req, res) => {
    try {
        const { url, userId } = req.body;
        if(url && userId) {
            data = { url, userId };
            const newImage = await imageService.create(data)
            res.status(201).json({ message: "Image created successfully", newImage })
        } else {
            res.status(400).json({
                message: "Is mandatory to bring data as...", 
                fields: {
                    url: "www.url.com",
                    userId: "integer",
                }
            });
        }
    } catch (error) {
        res.status(400).json({ message: error.message, error });
    }
}

const get = async (req, res) => {
    try {
        const allImages = await imageService.findAll()
        res.status(200).json({ message: "These are the total images", allImages })
    } catch (error) {
        res.status(400).json({ message: "Error getting images", error });
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params
        const imageById = await imageService.findById(id)
        res.status(200).json({ message: `Image with id: ${id} found`, imageById })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const updatedImage = await imageService.updatePost(id, body);
        res.status(200).json({ message: `Post with id: ${id} updated`, updatedImage })
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const _delete = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedImage = await imageService.delete(id);
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