const {models}=require('../libs/sequelize')         

class MessageService {
  constructor() {}
  async createMessage(messageData) {
    const { message, date, userId, eventId } = messageData;
    

    try {
    
      const newMessage = await models.Message.create(
        
        {

        
          message,
        date,
        userId,
        eventId,
      });

      return newMessage;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getMessageById(id) {
    try {
      return await models.Message.findByPk(id);
    } catch (error) {
      console.error(error);
    }
  }

  async getMessagesByUserId(userId) {
    return await this.Message.findAll({ where: { userId } });
  }

  async updateMessage(id, messageData) {
    try {
      const message = await this.getMessageById(id); 
      if (!message) {
        throw new Error("Message not found");
      }
      return await message.update(messageData);
    } catch (error) {
      console.error(error);
      throw new Error("Unable to update message");
    }
  }

  async deleteMessage(id) {
    try {
      const message = await this.getMessageById(id); // Cambiado a getMessageById
      if (!message) {
        throw new Error("Message not found");
      }
      await message.destroy();
      return { deleted: true };
    } catch (error) {
      console.error(error);
      throw new Error("Unable to delete message");
    }
  }
}

module.exports = MessageService;