const express = require("express");
const isAuth = require("../middlewares/isAuth");
// ici je require mes 3 controllers
const userController = require("../controllers/user");
const messageController = require("../controllers/message");
const followController = require("../controllers/follow");

const homeRouter = express.Router();

// ici on retrouve le chemin de mes routes de la home, le middleware de l'authentification et l'export de mes controllers
homeRouter.get("/home/:username", isAuth, userController.getHome);
homeRouter.post("/home/:username", isAuth, messageController.postTweets);
homeRouter.post("/home/follow/:user_id", isAuth, followController.postHomeSuggestions);
homeRouter.post("/home/delete/:tweet_id", isAuth, messageController.deleteTweet);

module.exports = homeRouter;
