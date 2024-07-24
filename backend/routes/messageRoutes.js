const express = require('express');
const messageController = require('../controllers/messageController');

const router = express.Router();

router.post('/create', messageController.SendMessage);
router.get('/:id', messageController.getMessageById);
router.get('/users/:userId/messages', messageController.getMessagesByUserId);
router.put('/:id', messageController.updateMessage);
router.delete('/delete/:id', messageController.deleteMessage);

module.exports = router;