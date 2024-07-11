// 👨🏽‍💻 Este archivo initModels sirve como determinación global de relaciones! para no tener que crear
// asociaciones dispersas por cada tabla que interacciona. Para agregar una nueva relacion se utiliza:
// 1 : Muchos -> hasMany > belongsTo
// 1 : 1 -> hasOne

const initModels = (sequelize) => {
    const { User, Event, Invitation, Donation, Message } = sequelize.models;

    User.hasMany(Invitation);
    Invitation.belongsTo(User, {
      foreignKey: 'userId',
    //   as: 'user_id',
    });
    Event.hasMany(Invitation);
    Invitation.belongsTo(Event, {
      foreignKey: 'eventId',
    //   as: 'event_id',
    });  

    User.hasMany(Donation);
    Donation.belongsTo(User, {
      foreignKey: 'userId',
    //   as: 'user_id',
    });
    Event.hasMany(Donation);
    Donation.belongsTo(Event, {
      foreignKey: 'eventId',
    //   as: 'user_id',
    });

    User.hasMany(Message);
    Message.belongsTo(User, {
    foreignKey: 'userId',
    // as: 'user_id',
    });
    Event.hasMany(Message);
    Message.belongsTo(Event, {
    foreignKey: 'eventId',
    // as: 'user_id',
    });
  
  };
  
  module.exports = initModels;