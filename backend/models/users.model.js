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
    primaryKey: true,
    type:DataTypes.UUID
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "name",
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true, 
    validate: {isEmail: true},
    field: "email",
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "password",
  },
  userType: {
    allowNull: false,
    defaultValue: "user",
    type: DataTypes.ENUM("user", "admin", "superAdmin"),
  }
};

module.exports = {
  User,
  userSchema,
};
