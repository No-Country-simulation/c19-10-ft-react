const EventService = require("../services/event.service")

const eventService = new EventService()

const create = async (req, res) => {
    console.log(req.body)
    try {
        const newEvent = await eventService.create(req.body)
        console.log(newEvent)
        res.status(201).json({ message: "Event created successfully", newEvent })
    } catch (error) {
        res.status(400).json({ message: "Error creating event", error });
    }
}

module.exports = {
    create
}