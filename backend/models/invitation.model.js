const { Model, DataTypes } = require("sequelize");
const User = require('./users.model')
const Event = require('./event.model')

const INVITATION_TABLE = "invitation"


class Invitation extends Model {
    static config(sequelize) {
        return {
             sequelize, 
             tableName: INVITATION_TABLE,
             modelName: "Invitation",
             timestamps: false,
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
      },
      eventId: {
        allowNull: false,
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
    Invitation, 
    invitationSchema,
}