const { Model, DataTypes } = require("sequelize");
const User = require("./users.model");

const SALON_TABLE = "salon";

class Salon extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: SALON_TABLE,
      modelName: "Salon",
      timestamps: true,
    };
  }
}

const salonSchema = {
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
  telefono: {
    allowNull: true,
    type: DataTypes.STRING,
    field: "telefono",
  },
  email: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: true,
    validate: { isEmail: true },
    field: "email",
  },
  instagram: {
    allowNull: true,
    type: DataTypes.STRING,
    field: "instagram"
  },
  facebook: {
    allowNull: true,
    type: DataTypes.STRING,
    field: "facebook"
  },
  webUrl:{
    allowNull: true,
    type: DataTypes.STRING,
    field: "web_url"
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
  Salon,
  salonSchema,
};
