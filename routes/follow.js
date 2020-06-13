const express = require("express");
const isAuth = require("../middlewares/isAuth");
const followController = require("../controllers/follow");
const followRouter = express.Router();

followRouter.post("/follow", isAuth, followController.follow);
followRouter.post("/unfollow", isAuth, followController.unfollow);

module.exports = followRouter;
