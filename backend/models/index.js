// En caso de querer inicializar otro modelo, simplemente se importa como el ejemplo de abajo
// y en la funcion setupModels, se agrega la linea correspondiente, replicando la que esta y cambiando sus respectivos datos del modelo

const { User, userSchema } = require("./users.model");
const { Event, eventSchema } = require("./event.model");
const { Invitation, invitationSchema } = require("./invitation.model");
const { Donation, donationSchema } = require("./donation.model");
const { Comment, commentSchema } = require("./comment.model");
const { Post, postSchema } = require("./post.model");

const initModels = require("./initModels");

function setupModels(sequelize) {
  User.init(userSchema, User.config(sequelize));
  Event.init(eventSchema, Event.config(sequelize));
  Invitation.init(invitationSchema, Invitation.config(sequelize));
  Donation.init(donationSchema, Donation.config(sequelize));
  Comment.init(commentSchema, Comment.config(sequelize));
  Post.init(postSchema, Post.config(sequelize));

  initModels(sequelize);
}

module.exports = setupModels;
