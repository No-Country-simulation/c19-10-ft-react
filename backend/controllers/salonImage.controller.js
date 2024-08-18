const SalonImageService = require("../services/salonImage.service");

const salonImageService = new SalonImageService();

const createAssociation = async (req, res) => {
    try {
        const { salonId } = req.body;
        const imageUrl = req.file ? req.file.path : null;     
        if(salonId && imageUrl) {
            const data = { imageUrl, salonId } 
            console.log('😍')
            console.log(imageUrl)
            console.log('😁')
            console.log(salonId)
            const imageAssociation = await salonImageService.create(data)
            res.status(201).json({ message: "Image association was created successfully", imageAssociation })
        } else {
            res.status(400).json({ message: "Is mandatory to bring data as...", data: {
                salonId: "UUID",
                imageUrl: "url"
            } });
        }
    } catch (error) {
        res.status(400).json({ message: error.message, error });
    }
}


const deleteAssociation = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAssociation = await salonImageService.deleteAssociation(id);
        res.status(200).json({ message: `Success`, deletedAssociation })
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};


module.exports = {
    createAssociation,
    deleteAssociation
}