const { models } = require("../libs/sequelize");
const bcrypt = require("bcryptjs");
const { Op } = require('sequelize');
const { sendEmailFunction } = require("../nodemailer/sendEmail");

class UsersService {
  constructor() { }

  async register(userData) {

    const { name, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const validateUser = await models.User.findOne({ where: { email } });

    try {
      if (!validateUser) {
        const user =  models.User.create({
          name,
          email,
          password: hashedPassword,
        });
        // await sendEmailFunction(email, name)
        return user;
      }
     
      
    } catch (error) {
      return error
    }
  }

  async findByEmail(email) {
    return await models.User.findOne({ where: { email } });
  }

  async findUsers() {
    try {
      return await models.User.findAll()
    } catch (error) {
      console.error(error);
    }
  }

  async findById(id) {
    try {
      return await models.User.findByPk(id);
    } catch (error) {
      console.error(error);
    }
  }

  async findByName(name) {
    try {
      return await models.User.findAll({
        where: {
          name:
            { [Op.iLike]: `%${name}%` }
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  async updateUser(id, data) {
    try {
      const updatedUser = await this.findById(id)
      return await updatedUser.update(data);
    } catch (error) {
      console.error(error);
    }
  }


  async deleteUser(id) {
    try {
      const model = await this.findById(id);
      await model.destroy();
      return { deleted: true };
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = UsersService;
