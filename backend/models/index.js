// En caso de querer inicializar otro modelo, simplemente se importa como el ejemplo de abajo
// y en la funcion setupModels, se agrega la linea correspondiente, replicando la que esta y cambiando sus respectivos datos del modelo

const { User, userSchema } = require("./users.model");
const { Event, eventSchema } = require("./event.model")

function setupModels(sequelize) {
  User.init(userSchema, User.config(sequelize));
  Event.init(eventSchema, Event.config(sequelize));
}

module.exports = setupModels;
