const { models } = require("../libs/sequelize");
const bcrypt = require("bcryptjs");

class UsersService {
  constructor() { }

  async register(userData) {

    const { name, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const validateUser = await models.User.findOne({ where: { email } });
    
    try {
      if (!validateUser) {
        const user = await models.User.create({
          name,
          email,
          password: hashedPassword,
        });
        return user
      }
    } catch (error) {
      return error
    }
  }

  async findByEmail(email) {
      return await models.User.findOne({ where: { email } });
    }

  async findAll() {
      try {
        return await models.User.findAll()
      } catch (error) {
        console.error(error);
      }
    }

  async findOne(id) {
      try {
        console.log("User finded");
        //   return await models.User.findByPk(id);
      } catch (error) {
        console.error(error);
      }
    }

  async update(id, data) {
      try {
        console.log("User updated");
        //   const model = await this.findOne(id);
        //   return await model.update(data);
      } catch (error) {
        console.error(error);
      }
    }

  async delete (id) {
      try {
        console.log("User deleted");
        //   const model = await this.findOne(id);
        //   await model.destroy();
        //   return { deleted: true };
      } catch (error) {
        console.error(error);
      }
    }
  }

module.exports = UsersService;
