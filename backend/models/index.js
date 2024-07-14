// En caso de querer inicializar otro modelo, simplemente se importa como el ejemplo de abajo
// y en la funcion setupModels, se agrega la linea correspondiente, replicando la que esta y cambiando sus respectivos datos del modelo

const { User, userSchema } = require("./users.model");
const { Event, eventSchema } = require("./event.model")
const { Invitation, invitationSchema } = require("./invitation.model")
const { Donation, donationSchema } = require("./donation.model")
const { Message, messageSchema } = require("./message.model")
const initModels = require('./initModels')

function setupModels(sequelize) {
  User.init(userSchema, User.config(sequelize));
  Event.init(eventSchema, Event.config(sequelize));
  Invitation.init(invitationSchema, Invitation.config(sequelize))
  Donation.init(donationSchema, Donation.config(sequelize))
  Message.init(messageSchema, Message.config(sequelize))
// 👨🏽‍💻
  initModels(sequelize);
}

module.exports = setupModels;
