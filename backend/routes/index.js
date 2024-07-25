const express = require("express");

const usersRouter = require("./users.router");
const eventRouter = require("./event.router");
const messageRouter = require("./message.router");
const invitationRouter = require("./invitation.router");
const postRouter = require("./post.router");
const postImagesRouter = require("./postImages.router");
const imageRouter = require("./image.router")
const donationRouter = require("./donation.router")


function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/users", usersRouter);
  router.use("/event", eventRouter);
  router.use("/messages", messageRouter);
  router.use("/invitation", invitationRouter);
  router.use("/post", postRouter);
  router.use("/image", imageRouter);
  router.use("/post_images", postImagesRouter);
  router.use("/donation", donationRouter);
  router.use("/images", postImagesRouter);
}

module.exports = routerApi;
