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
        primaryKey: true,
        type: DataTypes.UUID
    },
    message: {
        type: DataTypes.TEXT,
        field: "message"
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
}

module.exports = {
    Message, 
    messageSchema,
}