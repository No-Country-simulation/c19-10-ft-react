const { Model, DataTypes } = require("sequelize");
const User = require('./users.model');

const IMAGE_TABLE = "image"

class Image extends Model {
    static config(sequelize) {
        return {
             sequelize, 
             tableName: IMAGE_TABLE,
             modelName: "Image",
             timestamps: true,
        };
    }
}

const imageSchema = {
    id: {
        allowNull: false, 
        primaryKey: true,
        type: DataTypes.UUID
    },
    url: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "url"
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
}

module.exports = {
    Image, 
    imageSchema,
}