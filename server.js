require("dotenv").config();
const express = require("express");
const expbs = require("express-handlebars");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("./config/local_auth.js")();
const Handlebars = require("handlebars");
const MomentHandler = require("handlebars.moment");
const router = require("./routes");

// Instanciation serveur Express
const app = express();

//Handlebars
app.engine(
  ".hbs",
  expbs({
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.use("/assets", express.static("assets"));

//moment Handlebars, pour afficher la date en direct
MomentHandler.registerHelpers(Handlebars);

//lancement du body parser pour recupérer et gérer les requêtes des formulaires
app.use(bodyParser.urlencoded({ extended: false }));
//lancement de connect-flash pour les messages d'erreur à l'authentification
app.use(flash());

//lancement d'express session, avec le cookie, le temps de durée de la session en milliseconds
app.use(
  session({
    secret: process.env.SECRET,
    cookie: { maxAge: 3600000 },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use(router);

app.listen(4000, () => {
  console.log("Server running at port 4000");
});
