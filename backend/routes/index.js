const express = require("express");

const usersRouter = require("./users.router");
const eventRouter = require("./event.router");
const messageRouter = require("./messageRoutes"); 
const invitationRouter = require("./InvitationRoute"); 

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/users", usersRouter);
  router.use("/event", eventRouter);
  router.use("/messages", messageRouter);
  router.use("/invitation", invitationRouter);
}

module.exports = routerApi;