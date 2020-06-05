const express = require("express");

const logoutRouter = express.Router();

logoutRouter.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});


module.exports = logoutRouter ;