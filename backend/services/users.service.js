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
    const subject = "Welcome to Celebria."
    const text = `Hello, ${name}, \n\Welcome to our platform! We invite you to create your first event. \n\Our team is excited to see those videos and photos\n\nThank you for joining us! `

    try {
      if (!validateUser) {
        const user = models.User.create({
          name,
          email,
          password: hashedPassword,
        });
        await sendEmailFunction(email, subject, text)
        return user;
      }


    } catch (error) {
      return error
    }
  }

  async updatePassword(email, url) {
    try {
         console.log(email)
      const subject = "Celebria's Team: Reset password"
      const text = `Aca va el Link del recupero \n\ ${url}`
      if (email) await sendEmailFunction(email, subject, text)

    } catch (error) {
      console.log(error)
    }
  }

  async resetPassword(email, password) {
    try {

      const hashedPassword = await bcrypt.hash(password, 10);

      await models.User.update({ where: { email } }, {
        password: hashedPassword,
      })

    } catch (error) {
      console.log(error)

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
