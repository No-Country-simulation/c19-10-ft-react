const { models } = require("../libs/sequelize");
const { sendEmailFunction } = require("../nodemailer/sendEmail");
const eventService = require("./event.service");
const EVENT_SERVICE = new eventService();
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { JWT_SECRET, CLIENT_BASE_URL } = process.env;
const jwt = require("jsonwebtoken");
const UsersService = require("./users.service");
const USER_SERVICE = new UsersService();

class InvitationService {
  constructor() {}

  async createInvitation(invitationData) {
    const { invitedEmail, userId, eventId } = invitationData;

    try {
      const newInvitation = await models.Invitation.create({
        id: uuidv4(),
        invitedEmail,
        invitationDate: new Date(),
        userId,
        eventId,
      });
      const userData = await USER_SERVICE.findById(userId);
      const eventData = await EVENT_SERVICE.findById(eventId);
      const token = jwt.sign(
        { invitationId: newInvitation.id, isInvitation: true, eventData },
        JWT_SECRET,
        {
          expiresIn: "15m",
        }
      );
      const invitation_url = `${CLIENT_BASE_URL}?token=${token}`;
      const emailOptions = {
        subject: "Tienes una invitación a un evento - Celebria !",
        text: `Has sido invitado al evento ${eventData.title}, puedes aceptar o rechazar la invitación ingresando al siguiente link: ${invitation_url}`,
      };
      const context = {
        name: userData.name,
        url: invitation_url,
      };
      await sendEmailFunction({
        email: invitedEmail,
        subject: emailOptions.subject,
        template: "Invitations",
        context,
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

  async getInvitationsByEventId(id) {
    try {
      return await models.Invitation.findAll({ where: { eventId: id } });
    } catch (error) {
      throw new Error("Unable to get invitations");
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
