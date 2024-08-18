const { models } = require("../libs/sequelize");
const uuid = require("uuid");

class DonationService {
  constructor() {}

  async create(donationData) {
    const { title, amount, description, date, eventId, userId, paymentStatus } =
      donationData;
    const donation = await models.Donation.create({
      id: uuid.v4(),
      title,
      amount,
      description,
      date,
      eventId,
      userId,
      paymentStatus,
    });
    return donation;
  }

  async updateDonationStatus(id, paymentStatus) {
    try {
      const model = await this.findById(id);
      return await model.update({ paymentStatus: paymentStatus });
    } catch (error) {
      console.error(error);
    }
  }
  async findById(id) {
    try {
      return await models.Donation.findByPk(id);
    } catch (error) {
      console.log(error);
    }
  }

  async findDonationByEventId(eventId) {
    try {
      return await models.Donation.findAll({
        where: {
          eventId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateData(id, data) {
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
      await model.Donation.destroy();
      return { deleted: true };
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = DonationService;
