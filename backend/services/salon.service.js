const { models } = require("../libs/sequelize")
const { v4: uuidv4 } = require("uuid");
const { SalonImage } = require("../models/salonImage.model");

class SalonService {
  constructor() {}

    async create(salonData) {

        const { title, description, telefono, email, instagram, facebook, webUrl, userId } = salonData;
        const salon = await models.Salon.create({   
            id: uuidv4(),
            title,
            description,
            telefono,
            email,
            instagram,
            facebook,
            webUrl,
            userId
        });
        return salon
    }

  async findAll() {
    try {
      return await models.Salon.findAll();
    } catch (error) {
      console.error(error);
    }
  }

  async findById(id) {
    try {
      return await models.Salon.findOne({
        where: {id},
        attributes: {exclude: ['createdAt', 'updatedAt']},
        include: [
          {
              model: SalonImage,
              as: 'images',
              where: {salonId: id},
              attributes: [
                  'imageUrl'
              ],
          },
      ]
      });
    } catch (error) {
      console.log(error);
    }
  }
  // 
  // 

  async findSalonByUserId(id) {
    try {
      return await models.Salon.findAll({
        where: {
          userId: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateSalon(id, data) {
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

module.exports = SalonService;