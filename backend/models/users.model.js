const { Model, DataTypes } = require("sequelize");

const USERS_TABLE = "users";

class User extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: USERS_TABLE,
      modelName: "User",
      timestamps: true,
    };
  }
}

const userSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "name",
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "email",
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "password",
  },
  userType: {
    allowNull: false,
    // defaultValue: user,
    type: DataTypes.STRING,
  }
};

module.exports = {
  User,
  userSchema,
};
