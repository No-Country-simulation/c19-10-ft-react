const EventService = require("../services/event.service")

const eventService = new EventService()

const create = async (req, res) => {
    try {
        const newEvent = await eventService.create(req.body)
        res.status(201).json({ message: "Event created successfully", newEvent })
    } catch (error) {
        res.status(400).json({ message: "Error creating event", error });
    }
}

const get = async (req, res) => {
    try {
        const allEvents = await eventService.findAll()
        res.status(200).json({ message: "These are the total events", allEvents })
    } catch (error) {
        res.status(400).json({ message: "Error getting events", error });
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params
        const eventById = await eventService.findById(id)
        res.status(200).json({ message: `Event with id: ${id} finded`, eventById })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const getEventByUserId = async(req, res) => {
    try {
        const { id } = req.params 
        const eventByUserId = await eventService.findEventByUserId(id) 
        res.status(200).json({ message: `Event with user id: ${id} finded`, eventByUserId })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const updatedEvent = await eventService.updateEvent(id, body);
        res.status(200).json({ message: `Event with id: ${id} updated`, updatedEvent })
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};

const _delete = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvent = await eventService.delete(id);
        res.status(200).json({ message: `Event with id: ${id} deleted`, deletedEvent })
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};


module.exports = {
    create,
    get,
    getById,
    getEventByUserId,
    update,
    _delete
}