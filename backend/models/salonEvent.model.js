const { Model, DataTypes } = require("sequelize");
const Event = require("./event.model");
const Salon = require("./salon.model")

const SALON_EVENT_TABLE = "salonEvent";

class SalonEvent extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: SALON_EVENT_TABLE,
      modelName: "SalonEvent",
      timestamps: true,
    };
  }
}

const salonEventSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID
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
  salonId: {
    allowNull: false,
    type: DataTypes.UUID,
    references: {
      model: Salon,
      key: "id",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
    field: "salonId",
  },
  associationStatus: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: "associationStatus",
    defaultValue: false
  }
};

module.exports = {
  SalonEvent,
  salonEventSchema,
};
