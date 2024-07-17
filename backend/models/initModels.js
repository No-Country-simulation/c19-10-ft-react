// 👨🏽‍💻 Este archivo initModels sirve como determinación global de relaciones! para no tener que crear
// asociaciones dispersas por cada tabla que interacciona. Para agregar una nueva relacion se utiliza:
// 1 : Muchos -> hasMany > belongsTo
// 1 : 1 -> hasOne

const initModels = (sequelize) => {
  const { User, Event, Invitation, Donation, Message, Post, PostImages } = sequelize.models;

  User.hasMany(Invitation, { foreignKey: 'userId', as: 'invitations' });
  Invitation.belongsTo(User, { foreignKey: 'userId', as: 'user', targetKey: 'id' });

  User.hasMany(Event, { foreignKey: 'userId', as: 'events' });
  Event.belongsTo(User, { foreignKey: 'userId', as: 'user', targetKey: 'id' });

  Event.hasMany(Invitation, { foreignKey: 'eventId', as: 'invitations' });
  Invitation.belongsTo(Event, { foreignKey: 'eventId', as: 'event', targetKey: 'id' });

  User.hasMany(Donation, { foreignKey: 'userId', as: 'donations' });
  Donation.belongsTo(User, { foreignKey: 'userId', as: 'user', targetKey: 'id' });

  Event.hasMany(Donation, { foreignKey: 'eventId', as: 'donations' });
  Donation.belongsTo(Event, { foreignKey: 'eventId', as: 'event', targetKey: 'id' });

  User.hasMany(Message, { foreignKey: 'userId', as: 'messages' });
  Message.belongsTo(User, { foreignKey: 'userId', as: 'user', targetKey: 'id' });

  Event.hasMany(Message, { foreignKey: 'eventId', as: 'messages' });
  Message.belongsTo(Event, { foreignKey: 'eventId', as: 'event', targetKey: 'id' });

  User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
  Post.belongsTo(User, { foreignKey: 'userId', as: 'user', targetKey: 'id' });

  Event.hasMany(Post, { foreignKey: 'eventId', as: 'posts' });
  Post.belongsTo(Event, { foreignKey: 'eventId', as: 'event', targetKey: 'id' });

  User.hasMany(PostImages, { foreignKey: 'userId', as: 'post_images' });
  PostImages.belongsTo(User, { foreignKey: 'userId', as: 'user', targetKey: 'id' });

  Event.hasMany(PostImages, { foreignKey: 'eventId', as: 'post_images' });
  PostImages.belongsTo(Event, { foreignKey: 'eventId', as: 'event', targetKey: 'id' });

  Post.hasMany(PostImages, { foreignKey: 'postId', as: 'post_images' });
  PostImages.belongsTo(Post, { foreignKey: 'postId', as: 'post', targetKey: 'id' });
}

module.exports = initModels;
