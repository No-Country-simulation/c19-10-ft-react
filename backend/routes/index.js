const express = require("express");
const invitationRouter = require("./invitation.router");
const usersRouter = require("./users.router");
const eventRouter = require("./event.router");
const commentsRouter = require("./comment.router");
const postRouter = require("./post.router");
const donationRouter = require("./donation.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/users", usersRouter);
  router.use("/event", eventRouter);
  router.use("/comment", commentsRouter);
  router.use("/invitation", invitationRouter);
  router.use("/post", postRouter);
  router.use("/donation", donationRouter);
}

module.exports = routerApi;
