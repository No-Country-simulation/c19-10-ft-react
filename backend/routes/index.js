const express = require("express");

const usersRouter = require("./users.router");
const eventRouter = require("./event.router");
const postRouter = require("./post.router");
const postImagesRouter = require("./postImages.router");

const messageRouter = require("./message.router")

const imageRouter = require("./image.router")


function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/users", usersRouter);
  router.use("/event", eventRouter);
  router.use("/post", postRouter);

  router.use("/images", postImagesRouter);
  router.use("/messages", messageRouter);

  router.use("/image", imageRouter);
  router.use("/post_images", postImagesRouter);

}

module.exports = routerApi;
