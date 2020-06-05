const express = require("express");
const isAuth = require('../middlewares/isAuth');
const userController = require("../controllers/user");

const tweetRouter = express.Router();


tweetRouter.get('/tweet/:username/:id',isAuth, userController.getTweet)

module.exports = tweetRouter;