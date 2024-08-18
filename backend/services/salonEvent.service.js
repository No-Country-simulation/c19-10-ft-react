const { models } = require("../libs/sequelize")
const { v4: uuidv4 } = require("uuid");

class SalonEventService {
  constructor() {}

    async create(eventId, salonId) {
        const association = await models.Salon.create({   
            id: uuidv4(),
            eventId,
            salonId
        });
        return association
    }

  async updateAssociation(id, data) {
    try {
      const model = await this.findById(id);
      return await model.update(data);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteAssociation(id) {
    try {
      const model = await this.findById(id);
      await model.destroy();
      return { deleted: true };
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = SalonEventService;