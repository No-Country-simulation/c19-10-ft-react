const { models } = require("../libs/sequelize")
const { v4: uuidv4 } = require("uuid");

class SalonImageService {
  constructor() {}

    async create(data) {
        const association = await models.SalonImage.create({   
            id: uuidv4(),
            salonId: data.salonId,
            imageUrl: data.imageUrl
        });
        console.log('😍😍')
        console.log(data)
        return association
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

module.exports = SalonImageService;