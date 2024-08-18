const express = require("express");

const usersRouter = require("./users.router");
const eventRouter = require("./event.router");
const commentsRouter = require("./comment.router");
const invitationRouter = require("./invitation.router");
const postRouter = require("./post.router");
const donationRouter = require("./donation.router");
const salonRouter = require("./salon.router");
const salonEventRouter = require("./salonEvent.router");
const salonImageRouter = require("./salonImage.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/users", usersRouter);
  router.use("/event", eventRouter);
  router.use("/comment", commentsRouter);
  router.use("/invitation", invitationRouter);
  router.use("/post", postRouter);
  router.use("/donation", donationRouter);
  router.use("/salon", salonRouter);
  router.use("/salon/event", salonEventRouter);
  router.use("/salon/image", salonImageRouter);
}

module.exports = routerApi;
