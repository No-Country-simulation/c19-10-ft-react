const { models } = require("../libs/sequelize")

class EventService {
    constructor() { }

    async create(eventData) {

        const { title, description, date, type, userId } = eventData;
        const event = await models.Event.create({
            title,
            description,
            date,
            type,
            userId
        });
        return event
    }

    async findAll() {
        try {
            return await models.Event.findAll()
        } catch (error) {
            console.error(error);
        }
    }

    async findById(id) {
        try {
            return await models.Event.findByPk(id)
        } catch (error) {
            console.log(error)
        }
    }

    async findEventByUserId(id) {
        try {
            return await models.Event.findAll({
                where: {
                userId: id
                }
              })
        }catch(error) {
            console.log(error)
        }
    }

    async updateEvent(id, data) {
        try {
            const model = await this.findById(id);
            return await model.update(data);
        } catch (error) {
            console.error(error);
        }
    }

    async delete(id) {
        try {
            const model = await this.findById(id);
            await model.destroy();
            return { deleted: true };
        } catch (error) {
            console.error(error);
        }
    }
}


module.exports = EventService