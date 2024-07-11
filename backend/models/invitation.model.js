const { Model, DataTypes } = require("sequelize");

const INVITATION_TABLE = "Invitation"


class Invitation extends Model {
    static config(sequelize) {
        return {
             sequelize, 
             tableName: INVITATION_TABLE,
             modelName: "Invitation",
             timestamps: true,
        };
    }
}

const invitationSchema = {
    id: {
        allowNull: false, 
        primaryKey: true,
        type: DataTypes.UUID
    },
    state: {
        allowNull: false,
        type: DataTypes.ENUM('PENDING', 'ACCEPTED', 'REJECTED'),
        field: "state"
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "token"
    },
    invitedEmail:{
        allowNull: false,
        type: DataTypes.STRING,
        validate: {isEmail: true},
        field: "invited_email",
    },
    acceptationDate: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "acceptation_date"
    },
    invitationDate: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "invitation_date"
    },
}

module.exports = {
    Invitation, 
    invitationSchema,
}