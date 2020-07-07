const express = require("express");
const isAuth = require("../middlewares/isAuth");
const userController = require("../controllers/user");

const editRouter = express.Router();

editRouter.get("/edit/:username", isAuth, userController.getEdit);
editRouter.post("/edit/:username", isAuth, userController.postEdit);

module.exports = editRouter;
