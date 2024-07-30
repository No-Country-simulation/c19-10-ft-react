const { Model, DataTypes } = require("sequelize");
const User = require("./users.model");
const Event = require("./event.model");

const POST_TABLE = "post";

class Post extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: POST_TABLE,
      modelName: "Post",
      timestamps: true,
    };
  }
}

const postSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  content: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: "content",
  },
  imageUrl: {
    allowNull: true,
    type: DataTypes.STRING,
    field: "imageUrl",
  },
  userId: {
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
    field: "userId",
  },
  eventId: {
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: Event,
      key: "id",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
    field: "eventId",
  },
};

module.exports = {
  Post,
  postSchema,
};
