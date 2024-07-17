const { Model, DataTypes } = require("sequelize");
const User = require('./users.model');
const { toDefaultValue } = require("sequelize/lib/utils");

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
    type: {
        allowNull: false,
        type: DataTypes.ENUM("Casamiento","Cumpleaños", "Cumpleaños Infantil", "Cumpleaños de 15", "Cumpleaños de Adulto", "Baby Shower", "Despedida de Soltero/a", "Evento Empresarial"),
        toDefaultValue: "Cumpleaños",
        field: "type"
    },
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        field: "userId",
    }
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