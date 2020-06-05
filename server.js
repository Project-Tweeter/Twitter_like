require('dotenv').config()
const express = require('express');
const app = express();
const expbs = require('express-handlebars')
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require('connect-flash');


const router = require("./routes");


app.engine('.hbs', expbs({
    defaultLayout: "main",
    extname: ".hbs"
}));
app.set('view engine', 'hbs');

app.use("/:username/assets", express.static("assets"));
app.use("/:username/:id/assets", express.static("assets"));
app.use("/assets", express.static("assets"));


//lancement du body parser pour recupèrer et gérer les requêtes des formulaires
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//lancement de connect-flash pour les messages d'erreur à l'authentification
app.use(flash());

//lancement d'express session, avec le cookie, le temps de durée de la session en milliseconds
app.use(session({ 
    secret: 'secretjfhjgjhg', 
    cookie: { maxAge: 600000 }, 
    resave: false, 
    saveUninitialized: false}))

//lancement d'Handlebars et de moment Handlebars, pour afficher la date en direct
const Handlebars = require("handlebars");
const MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

const passport = require("./passport/local_auth.js")();
app.use(passport.initialize());
app.use(passport.session());

// ici on appelle les routes du dossier routes
app.use(router); 

app.listen(4000);