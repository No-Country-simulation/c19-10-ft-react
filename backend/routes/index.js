const express = require("express");

const usersRouter = require("./users.router");
const eventRouter = require("./event.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/users", usersRouter);
  router.use("/event", eventRouter);
}

module.exports = routerApi;
