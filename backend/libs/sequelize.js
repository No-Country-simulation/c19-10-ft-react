/*const { Sequelize } = require("sequelize");
const { config } = require("../config/config");

const setupModels = require("../models");

const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPassword,
  {
    host: config.dbHost,
    dialect: "postgresql",
    logging: false,
  }
);
setupModels(sequelize);
sequelize.sync();

module.exports = sequelize;
*/
const { Sequelize } = require("sequelize");
const { config } = require("../config/config");

const setupModels = require("../models");

const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPassword,
  {
    host: config.dbHost,
    dialect: "postgresql",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Configura esto dependiendo de tus necesidades
      }
    },
    logging: false,
  },

);

console.log('🧉')
console.log(config)

setupModels(sequelize);
sequelize.sync();

module.exports = sequelize;