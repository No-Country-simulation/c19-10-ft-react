const InvitationService = require("../services/InvitationServices");
const invitationService = new InvitationService();


    const createInvitation = async (req, res) => {
    try {
      const invitationData = req.body;
      const newInvitation = await invitationService.createInvitation(invitationData);
      res.status(201).json(newInvitation);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  const getInvitationById = async (req, res) => {
    try {
      const { id } = req.params;
      const invitation = await invitationService.getInvitationById(id);
      if (!invitation) {
        res.status(404).json({ message: 'Invitation not found' });
      } else {
        res.status(200).json(invitation);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  const getInvitationsByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const invitations = await invitationService.getInvitationsByUserId(userId);
      res.status(200).json(invitations);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  const updateInvitation = async (req, res) => {
    try {
      const { id } = req.params;
      const invitationData = req.body;
      const updatedInvitation = await invitationService.updateInvitation(id, invitationData);
      if (!updatedInvitation) {
        res.status(404).json({ message: 'Invitation not found' });
      } else {
        res.status(200).json(updatedInvitation);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  const deleteInvitation = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await invitationService.deleteInvitation(id);
      if (result.deleted) {
        res.status(200).json({ message: 'Invitation deleted successfully' });
      } else {
        res.status(404).json({ message: 'Invitation not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  module.exports = {
    createInvitation,
    getInvitationById,
    getInvitationsByUserId,
    updateInvitation,
    deleteInvitation
  };
  
