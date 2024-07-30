const initModels = (sequelize) => {
  const { User, Event, Invitation, Donation, Comment, Post } = sequelize.models;

  User.hasMany(Invitation, { foreignKey: "userId", as: "invitations" });
  Invitation.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
    targetKey: "id",
  });

  User.hasMany(Event, { foreignKey: "userId", as: "events" });
  Event.belongsTo(User, { foreignKey: "userId", as: "user", targetKey: "id" });

  User.hasMany(Donation, { foreignKey: "userId", as: "donations" });
  Donation.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
    targetKey: "id",
  });

  User.hasMany(Post, { foreignKey: "userId", as: "posts" });
  Post.belongsTo(User, { foreignKey: "userId", as: "user", targetKey: "id" });

  User.hasMany(Comment, { foreignKey: "userId", as: "comments" });
  Comment.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
    targetKey: "id",
  });

  Event.hasMany(Invitation, { foreignKey: "eventId", as: "invitations" });
  Invitation.belongsTo(Event, {
    foreignKey: "eventId",
    as: "event",
    targetKey: "id",
  });

  Event.hasMany(Donation, { foreignKey: "eventId", as: "donations" });
  Donation.belongsTo(Event, {
    foreignKey: "eventId",
    as: "event",
    targetKey: "id",
  });

  Event.hasMany(Post, { foreignKey: "eventId", as: "posts" });
  Post.belongsTo(Event, {
    foreignKey: "eventId",
    as: "event",
    targetKey: "id",
  });

  Post.hasMany(Comment, { foreignKey: "postId", as: "comments" });
  Comment.belongsTo(Post, {
    foreignKey: "postId",
    as: "post",
    targetKey: "id",
  });
};

module.exports = initModels;
