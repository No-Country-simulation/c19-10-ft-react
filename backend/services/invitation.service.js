const { Invitation } = require('../models/invitation.model');
const { v4: uuidv4 } = require('uuid');

const createInvitation = async (data) => {
    const { state, token, invitedEmail, userId, eventId } = data;
    const invitation = await Invitation.create({
        id: uuidv4(),
        state,
        token,
        invitedEmail,
        userId,
        eventId,
        invitationDate: new Date(),
        acceptationDate: null
    });
    return invitation;
};

const getAllInvitations = async () => {
    const invitations = await Invitation.findAll();
    return invitations;
};

const getInvitationById = async (id) => {
    const invitation = await Invitation.findByPk(id);
    if (!invitation) {
        throw new Error('Invitation not found');
    }
    return invitation;
};

const updateInvitation = async (id, data) => {
    const { state, token, invitedEmail, userId, eventId, acceptationDate } = data;
    const invitation = await Invitation.findByPk(id);
    if (!invitation) {
        throw new Error('Invitation not found');
    }
    await invitation.update({
        state,
        token,
        invitedEmail,
        userId,
        eventId,
        acceptationDate
    });
    return invitation;
};

const deleteInvitation = async (id) => {
    const invitation = await Invitation.findByPk(id);
    if (!invitation) {
        throw new Error('Invitation not found');
    }
    await invitation.destroy();
    return { message: 'Invitation deleted successfully' };
};

module.exports = {
    createInvitation,
    getAllInvitations,
    getInvitationById,
    updateInvitation,
    deleteInvitation
};