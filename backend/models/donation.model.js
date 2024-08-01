const { Model, DataTypes } = require("sequelize");
const User = require("./users.model");
const Event = require("./event.model");

const DONATION_TABLE = "donation";

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
    type: DataTypes.UUID,
  },
  title: {
    allowNull: true,
    type: DataTypes.STRING,
    field: "title",
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    field: "amount",
  },
  description: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: "description",
  },
  paymentStatus: {
    type: DataTypes.ENUM("approved", "in_process", "failed"),
    toDefaultValue: "in_process",
    field: "payment_status",
  },
  date: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "date",
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
    allowNull: true,
    type: DataTypes.UUID,
    references: {
      model: Event,
      key: "id",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
    field: "eventId",
  },
};

module.exports = {
  Donation,
  donationSchema,
};
