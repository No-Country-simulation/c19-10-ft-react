const { models } = require("../libs/sequelize");

class InvitationService {
  constructor() {}

  async createInvitation(invitationData) {
    const {
      state,
      token,
      invitedEmail,
      acceptationDate,
      invitationDate,
      userId,
      eventId,
    } = invitationData;

    try {
      const newInvitation = await models.Invitation.create({
        state,
        token,
        invitedEmail,
        acceptationDate,
        invitationDate,
        userId,
        eventId,
      });

      return newInvitation;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getInvitationById(id) {
    try {
      return await models.Invitation.findByPk(id);
    } catch (error) {
      console.error(error);
      throw new Error("Unable to get invitation");
    }
  }

  async getInvitationsByUserId(userId) {
    try {
      return await models.Invitation.findAll({ where: { userId } });
    } catch (error) {
      console.error(error);
      throw new Error("Unable to get invitations");
    }
  }

  async updateInvitation(id, invitationData) {
    try {
      const invitation = await this.getInvitationById(id);
      if (!invitation) {
        throw new Error("Invitation not found");
      }
      return await invitation.update(invitationData);
    } catch (error) {
      console.error(error);
      throw new Error("Unable to update invitation");
    }
  }

  async deleteInvitation(id) {
    try {
      const invitation = await this.getInvitationById(id);
      if (!invitation) {
        throw new Error("Invitation not found");
      }
      await invitation.destroy();
      return { deleted: true };
    } catch (error) {
      console.error(error);
      throw new Error("Unable to delete invitation");
    }
  }
}

module.exports = InvitationService;
