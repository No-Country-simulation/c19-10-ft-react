const SalonEventService = require("../services/salonEvent.service");

const salonEventService = new SalonEventService();

const createAssociation = async (req, res) => {
    try {
        const { eventId, salonId } = req.body;        
        if(eventId && salonId) {
            const newSalon = await salonEventService.create(eventId, salonId)
            res.status(201).json({ message: "Salon created successfully", newSalon })
        } else {
            res.status(400).json({ message: "Is mandatory to bring data as...", data: {
                eventId: "UUID",
                salonId: "UUID"
            } });
        }
    } catch (error) {
        res.status(400).json({ message: error.message, error });
    }
}


const updateAssociation = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const updatedSalon = await salonEventService.updateAssociation(id, body);
        res.status(200).json({ message: `Success`, updatedSalon })
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const deleteAssociation = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAssociation = await salonEventService.deleteAssociation(id);
        res.status(200).json({ message: `Success`, deletedAssociation })
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};


module.exports = {
    createAssociation,
    updateAssociation,
    deleteAssociation
}