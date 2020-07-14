const express = require("express");
const isAuth = require("../middlewares/isAuth");
const userController = require("../controllers/user");

const editRouter = express.Router();

editRouter.get("/edit/:username", isAuth, userController.showEditPage);
editRouter.post("/edit/:username", isAuth, userController.updateUser);

module.exports = editRouter;
