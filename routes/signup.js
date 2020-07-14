const express = require("express");
const userController = require("../controllers/user");

const signupRouter = express.Router();

signupRouter.get("/signup", (request, response) => {
  response.render("signup", {
    title: "Connexion",
    style: "signup.css",
  });
});

signupRouter.post("/signup", userController.createUser);

module.exports = signupRouter;
