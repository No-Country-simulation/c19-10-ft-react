const { models } = require("../libs/sequelize");
const { v4: uuidv4 } = require("uuid");

class EventService {
  constructor() {}

  async create(eventData) {
    const { title, description, date, type, userId } = eventData;
    const event = await models.Event.create({
      id: uuidv4(),
      title,
      description,
      date,
      type,
      userId,
    });
    return event;
  }

  async findAll(userId, email) {
    try {
      const createdEvents = await models.Event.findAll({
        where: { userId: userId },
      });
      const invitedEvents = await models.Invitation.findAll({
        where: { invited_email: email, state: "ACCEPTED" },
        include: [
          {
            model: models.Event,
            as: "event",
            attributes: ["id", "title", "description", "date", "type"],
          },
        ],
      });

      return { createdEvents, invitedEvents };
    } catch (error) {
      console.error(error);
    }
  }

  async findById(id) {
    try {
      const event = await models.Event.findByPk(id);
      return event;
    } catch (error) {
      console.log(error);
    }
  }

  async findEventByUserId(id) {
    try {
      return await models.Event.findAll({
        where: {
          userId: id,
        },
      });
    } catch (error) {
      console.log(error);
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

module.exports = EventService;
