require("dotenv").config();

const {
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  NODE_ENV,
  PORT,
  MP_TOKEN,
  HOST,
} = process.env;

const config = {
  dbName: DB_DATABASE,
  dbUser: DB_USERNAME,
  dbPassword: DB_PASSWORD,
  dbHost: DB_HOST,
  dbPort: DB_PORT || 5432,
  port: PORT || 3000,
  env: NODE_ENV || "env",
  mpToken: MP_TOKEN,
  host: HOST,
};

module.exports = { config };
// 👨🏽‍💻 @ln_edit, el config se está enviando desestructuradamente, por lo que si en algun momento se exporta en
// la forma: module.export = config; 🧬 Esto causaría conflictos en las configuraciones de src/payments/mercadopago.config.js
// donde está siendo desestructurado nuevamente.
// Solución, importar en esa línea como -> const config = require('...') en lugar de const { config } = require('...');
