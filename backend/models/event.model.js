const { Model, DataTypes } = require("sequelize");
const User = require("./users.model");
const { toDefaultValue } = require("sequelize/lib/utils");

const EVENT_TABLE = "event";

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
    primaryKey: true,
    type: DataTypes.UUID
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "title",
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "description",
  },
  date: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "date",
  },
  type: {
    allowNull: false,
    type: DataTypes.ENUM(
      "Casamiento",
      "Cumpleaños Infantil",
      "Cumpleaños de 15",
      "Cumpleaños de Adulto",
      "Evento Celebria",
      "Baby Shower",
      "Despedida de Soltero/a",
      "Evento Empresarial"
    ),
    toDefaultValue: "Evento Celebria",
    field: "type",
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
};

module.exports = {
  Event,
  eventSchema,
};
