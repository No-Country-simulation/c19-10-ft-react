

const { Model, DataTypes } = require("sequelize");

const MESSAGE_TABLE = "Message"


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
    date: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "date"
    },
}

module.exports = {
    Message, 
    messageSchema,
}