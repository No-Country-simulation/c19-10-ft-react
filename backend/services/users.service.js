const { models } = require("../libs/sequelize");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const { sendEmailFunction } = require("../nodemailer/sendEmail");
const { v4: uuidv4 } = require("uuid");


class UsersService {
  constructor() {}

  async register(userData) {
    const { name, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const validateUser = await models.User.findOne({ where: { email } });
  
    const mailObject = {
      email: email, 
      subject: "Welcome to Celebria.",
      template: "LogInMessage",
      context: {
        name: name,
      }
    }
   
    try {
      if (!validateUser) {
        const user = await models.User.create({
          id: uuidv4(),
          name,
          email,
          password: hashedPassword,
        });
        await sendEmailFunction(mailObject);
        return user;
      }
    } catch (error) {
      return error;
    }
  }

  async updatePassword(email, url) {
    try {
      const subject = "Celebria's Team: Reset password";
      const text = `Aca va el Link del recupero \n\ ${url}`;
      if (email) await sendEmailFunction(email, subject, text);
    } catch (error) {
      console.log(error);
    }
  }

  async resetPassword(email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await models.User.update(
        { password: hashedPassword },
        { where: { email } }
      );
      const options = {
        subject: "Contraseña resstablecida con exito",
        text: "Su contraseña ha sido restablecida con exito, por favor intente ingresar a la plataforma con sus nuevas credenciales",
      };
      await sendEmailFunction(email, options.subject, options.text);

      if (result[0] === 0) {
        console.log("Usuario no encontrado o contraseña no actualizada");
      } else {
        console.log("Contraseña actualizada exitosamente");
      }
    } catch (error) {
      console.log("Error al actualizar la contraseña:", error);
    }
  }

  async findByEmail(email) {
    return await models.User.findOne({ where: { email } });
  }

  async findUsers() {
    try {
      return await models.User.findAll();
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
          name: { [Op.iLike]: `%${name}%` },
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async updateUser(id, data) {
    try {
      const updatedUser = await this.findById(id);
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
