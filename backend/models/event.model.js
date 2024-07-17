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
        // type: DataTypes.UUID
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
    },
    date: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "date"
    },
     // img: {
    //     allowNull: true, 
    //     type: DataTypes.STRING,
    //     field: "img"
    // }
    // location: {
    //     allowNull: false,
    //     type: DataTypes.STRING,
    //     field: "location"
    // },
}

module.exports = {
    Event, 
    eventSchema,
}