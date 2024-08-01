const express = require("express");
const router = express.Router();
const invitationController = require("../controllers/invitation.controller");

router.post("/create", invitationController.createInvitation);

router.get("/event/:id", invitationController.getInvitationsByEventId);

router.get("/:id", invitationController.getInvitationById);

router.get("/user/:userId", invitationController.getInvitationsByUserId);

router.put("/:id", invitationController.updateInvitation);

router.delete("/:id", invitationController.deleteInvitation);

module.exports = router;
