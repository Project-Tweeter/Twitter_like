const express = require('express');



const router = express.Router();

// require des différentes routes du dossier routes
const passport = require("../passport/local_auth.js")();
const homeRouter = require("./home");
const profilRouter = require("./profil");
const signupRouter = require("./signup");
const tweetRouter = require("./tweet");
const logoutRouter = require("./logout");



// On laisse dans l'index les routes à la racine et l'erreur 404

router.get('/', (request,response) => {
    response.render('login', {
        title:"Login",
        style: "login.css",
        error: request.flash('error')
    })
})

router.post(
    "/",
    passport.authenticate("local", {    
    failureRedirect: "/",
    failureFlash: "Username ou password faux, recommencez !"}),
    function (request, response) {
        // console.log(req.user);
        response.redirect('/home/' + request.user.username);
    }
);

// Appels des différentes routes du Dossier routes
router.use(homeRouter);
router.use(profilRouter);
router.use(signupRouter);
router.use(tweetRouter);
router.use(logoutRouter);


router.get("*", (request, response) => {
    response.status(404).render("404", {
        style: "404.css"
    });
});


  module.exports = router;