const express = require("express");
const isAuth = require("../middlewares/isAuth");
// ici on require le controller user
const userController = require("../controllers/user");

const profilRouter = express.Router();

profilRouter.get("/profil/:username", isAuth, userController.getProfil);

module.exports = profilRouter;
