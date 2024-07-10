require("dotenv").config();

const {
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  NODE_ENV,
  PORT,
} = process.env;

const config = {
  dbName: DB_DATABASE,
  dbUser: DB_USERNAME,
  dbPassword: DB_PASSWORD,
  dbHost: DB_HOST,
  dbPort: DB_PORT || 5432,
  port: PORT || 3000,
  env: NODE_ENV || "env",
};

module.exports = { config };
