const messageService = require('../services/messageService');
const MESSAGESERVICE = new messageService();

 const SendMessage = async (req, res) => {
  try {
    const message = await MESSAGESERVICE.createMessage(req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getMessageById = async (req, res) => {
    try {
      const message = await MESSAGESERVICE.getMessageById(req.params.id);
      if (message) {
        res.json(message);
      } else {
        res.status(404).json({ error: 'Message not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const  getMessagesByUserId= async (req, res) => {
    try {
      const messages = await MESSAGESERVICE.getMessagesByUserId(req.params.userId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const updateMessage= async (req, res) => {
    try {
      const message = await MESSAGESERVICE.updateMessage(req.params.id, req.body);
      if (message) {
        res.json(message);
      } else {
        res.status(404).json({ error: 'Message not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const deleteMessage= async (req, res) =>{
    try {
      const success = await MESSAGESERVICE.deleteMessage(req.params.id);
      if (success) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: 'Message not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

module.exports = {
  SendMessage,
  getMessageById,
  getMessagesByUserId,
  updateMessage,
  deleteMessage
};
