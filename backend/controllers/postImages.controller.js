const PostImagesService = require("../services/postImages.service");

const postImagesService = new PostImagesService()

const create = async (req, res) => {
    
    try {
        const { postId, imgId } = req.body;

        if(postId && imgId){
            const data = { postId, imgId }
            const newImage = await postImagesService.create(data)
            res.status(201).json({ message: "Image created successfully", newImage })

        } else {
            res.status(400).json({
                message: "Is mandatory to bring data as...",
                fields: {postId: "uuid", imgId: "uuid"}
            });
        }
    } catch (error) {
        res.status(400).json({ message: "Error creating image", error });
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
    getById,
    update,
    _delete
}