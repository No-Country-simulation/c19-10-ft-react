const { Model, DataTypes } = require("sequelize");
const Salon = require("./salon.model");

const SALON_IMAGE_TABLE = "salonImage";

class SalonImage extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: SALON_IMAGE_TABLE,
      modelName: "SalonImage",
      timestamps: true,
    };
  }
}

const salonImageSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID
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
  imageUrl: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "imageUrl",
    defaultValue: false
  }
};

module.exports = {
  SalonImage,
  salonImageSchema,
};
