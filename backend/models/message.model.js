const { Model, DataTypes } = require("sequelize");
const User = require('./users.model')
const Event = require('./event.model')

const MESSAGE_TABLE = "message"


class Message extends Model {
    static config(sequelize) {
        return {
            sequelize, 
            tableName: MESSAGE_TABLE,
            modelName: "Message",
            timestamps: true,
        };
    }
}

const messageSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        // type:DataTypes.UUID
    },
    message: {
        type: DataTypes.TEXT,
        field: "message"
    },
    date: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "date"
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
    Message, 
    messageSchema,
}