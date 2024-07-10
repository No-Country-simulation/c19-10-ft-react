const { models } = require("../libs/sequelize")


class EventService {
    constructor() { }

    async create(eventData) {

        console.log("estamos en el service")
        console.log(eventData)
        const { title, description } = eventData;
        const event = await models.Event.create({
            title,
            description,
    
        });
        return event,
            console.log("estamos en el servicio de creacion de eventos")
    }
}

module.exports = EventService