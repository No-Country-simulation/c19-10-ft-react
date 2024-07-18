const { Model, DataTypes } = require("sequelize");
const User = require('./users.model');
const Event = require('./event.model');

const POST_TABLE = "post"

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
        type: DataTypes.UUID
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "title"
    },
    content: {
        allowNull: false,
        type: DataTypes.TEXT,
        field: "content"
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
}

module.exports = {
    Post, 
    postSchema,
}