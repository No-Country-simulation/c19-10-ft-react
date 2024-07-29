const { Model, DataTypes } = require("sequelize"); // Asegúrate de que `sequelize` esté correctamente importado
const User = require("./users.model").User; // Asegúrate de que la ruta sea correcta
const Event = require("./event.model").Event; // Asegúrate de que la ruta sea correcta
const Message = require("./message.model").Message; // Asegúrate de que la ruta sea correcta

const POST_TABLE = "posts"; // Nombre de la tabla en la base de datos

class Post extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: POST_TABLE,
      modelName: "Post",
      timestamps: true,
    };
  }

  static associate(models) {
    // Relación con User
    this.belongsTo(models.User, { foreignKey: "userId", as: "user" });

    // Relación con Message
    this.belongsTo(models.Message, { foreignKey: "messageId", as: "message" });

    // Relación con Event
    this.belongsTo(models.Event, { foreignKey: "eventId", as: "event" });
  }
}

const postSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true, // Ajusta según tus necesidades
    field: "title",
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true, // Ajusta según tus necesidades
    field: "content",
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User, // Referencia al modelo User
      key: "id",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
    field: "userId",
  },
  messageId: {
    type: DataTypes.UUID,
    allowNull: true, // Ajusta según tus necesidades
    references: {
      model: Message, // Referencia al modelo Message
      key: "id",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
    field: "messageId",
  },
  eventId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Event, // Referencia al modelo Event
      key: "id",
    },
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
    field: "eventId",
  },
};

module.exports = {
  Post,
  postSchema,
};