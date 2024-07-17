const express = require("express");

const usersRouter = require("./users.router");
const eventRouter = require("./event.router");
const postRouter = require("./post.router");
const postImagesRouter = require("./postImages.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/users", usersRouter);
  router.use("/event", eventRouter);
  router.use("/post", postRouter);
  router.use("/images", postImagesRouter);
}

module.exports = routerApi;
