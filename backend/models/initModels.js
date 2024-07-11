// 👨🏽‍💻 Este archivo initModels sirve como determinación global de relaciones! para no tener que crear
// asociaciones dispersas por cada tabla que interacciona. Para agregar una nueva relacion se utiliza:
// 1 : Muchos -> hasMany > belongsTo
// 1 : 1 -> hasOne

const initModels = (sequelize) => {
  const { User, Event, Invitation, Donation, Message } = sequelize.models;

  User.hasMany(Invitation, { foreignKey: 'userId', as: 'invitations' });
  Invitation.belongsTo(User, { foreignKey: 'userId', as: 'user', targetKey: 'id' });

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
};

module.exports = initModels;
