const { Model, DataTypes } = require("sequelize");

const DONATION_TABLE = "Donation"


class Donation extends Model {
    static config(sequelize) {
        return {
            sequelize, 
            tableName: DONATION_TABLE,
            modelName: "Donation",
            timestamps: true,
        };
    }
}

const donationSchema = {
    id: {
        allowNull: false, 
        primaryKey: true,
        type: DataTypes.UUID
    },
    title: {
        type: DataTypes.STRING,
        field: "title"
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        field: "amount"
    },
    description:{
        type: DataTypes.TEXT,
        field: "decription",
    },
    date: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "date"
    },
}

module.exports = {
    Donation, 
    donationSchema,
}