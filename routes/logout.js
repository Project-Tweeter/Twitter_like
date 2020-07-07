const express = require("express");

const logoutRouter = express.Router();

logoutRouter.get("/logout", function (request, response) {
  request.logout();
  response.redirect("/");
});

module.exports = logoutRouter;
