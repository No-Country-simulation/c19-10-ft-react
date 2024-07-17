const { Model, DataTypes } = require("sequelize");
const User = require('./users.model');
const Event = require('./event.model');
const Post = require("./post.model");

const POSTIMAGES_TABLE = "post_images"

class PostImages extends Model {
    static config(sequelize) {
        return {
             sequelize, 
             tableName: POSTIMAGES_TABLE,
             modelName: "PostImages",
             timestamps: true,
        };
    }
}

const postImagesSchema = {
    id: {
        allowNull: false, 
        primaryKey: true,
        type: DataTypes.UUID
    },
    url: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "url"
    },
    userId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        field: "userId",
      },
      eventId: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: Event,
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        field: "eventId",
      },
      postId: {
        allowNull: true,
        type: DataTypes.UUID,
        references: {
          model: Post,
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        field: "postId",
      },
}

module.exports = {
    PostImages, 
    postImagesSchema,
}