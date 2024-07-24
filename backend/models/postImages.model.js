const { Model, DataTypes } = require("sequelize");
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
    imgId: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: Post,
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
      field: "imageId",
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
    }
  }
  
module.exports = {
    PostImages, 
    postImagesSchema,
}