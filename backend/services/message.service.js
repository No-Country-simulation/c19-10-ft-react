const { models } = require("../libs/sequelize")

class MessageService { 
    constructor() {}

    async sendMessage(messageData)  {
        const { message, date, userId, eventId } = messageData

        try {
            const newMessage = await models.Message.create({
                message,    
                date,
                userId,
                eventId
            })
            return newMessage
        } catch (error) {
            return error
        }
    }
}


module.exports = MessageService