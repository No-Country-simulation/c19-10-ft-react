const { Model, DataTypes } = require("sequelize");
const User = require("./users.model");
const Post = require("./post.model");

const COMMENT_TABLE = "comment";

class Comment extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: COMMENT_TABLE,
      modelName: "Comment",
      timestamps: true,
    };
  }
}

const commentSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  content: {
    allowNull: false,
    type: DataTypes.TEXT,
    field: "content",
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
  postId: {
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: Post,
      key: "id",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
    field: "postId",
  },
};

module.exports = {
  Comment,
  commentSchema,
};
