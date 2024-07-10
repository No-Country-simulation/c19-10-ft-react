const { Model, DataTypes } = require("sequelize");

const EVENT_TABLE = "event"

class Event extends Model {
    static config(sequelize) {
        return {
             sequelize, 
             tableName: EVENT_TABLE,
             modelName: "Event",
             timestamps: true,
        };
    }
}

const eventSchema = {
    id: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "title"
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "description"
    }
    // fecha: {
    //     allowNull: false,
    //     type: DataTypes.DATE,
    //     field: "fecha"
    // },
}

module.exports = {
    Event, 
    eventSchema,
}