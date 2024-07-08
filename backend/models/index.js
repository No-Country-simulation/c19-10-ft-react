const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const config = require(path.resolve(__dirname, "../config/config.js"))[
  process.env.NODE_ENV || "development"
];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
