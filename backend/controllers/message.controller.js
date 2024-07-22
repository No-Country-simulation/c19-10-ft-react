const MessageService = require("../services/message.service")


const messageService = new MessageService()

const register = async(req, res) => {
    try {
        const message = await messageService.sendMessage(req.body)
        console.log(message)
        res.status(201).json({ message: "Message sended successfully ", message });
  } catch (error) {
    res.status(400).json({ message: "Error sending message", error });
}

}

module.exports = {
    register
}