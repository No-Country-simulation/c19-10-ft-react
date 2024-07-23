const invitationService = require('../services/invitation.service');

exports.createInvitation = async (req, res) => {
    try {
        const invitation = await invitationService.createInvitation(req.body);
        res.status(201).json(invitation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllInvitations = async (req, res) => {
    try {
        const invitations = await invitationService.getAllInvitations();
        res.status(200).json(invitations);
    } catch (error) {
        res.status (500).json({ error: error.message });
    }
};

exports.getInvitationById = async (req, res) => {
    try {
        const { id } = req.params;
        const invitation = await invitationService.getInvitationById(id);
        res.status(200).json(invitation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateInvitation = async (req, res) => {
    try {
        const { id } = req.params;
        const invitation = await invitationService.updateInvitation(id, req.body);
        res.status(200).json(invitation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteInvitation = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await invitationService.deleteInvitation(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};