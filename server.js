const express = require('express');
const app = express();
const expbs = require('express-handlebars')
const bodyParser = require("body-parser");
const session = require("express-session");
const isAuth = require('./middlewares/isAuth');

app.engine('.hbs', expbs({
    defaultLayout: "main",
    extname: ".hbs"
}));
app.set('view engine', 'hbs');
app.use("/:username/assets", express.static("assets"));
app.use("/assets", express.static("assets"));


// body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//
// express-session
app.use(session({
    secret: 'tutu',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

const Handlebars = require("handlebars");
const MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

const passport = require("./passport/local_auth.js")();
app.use(passport.initialize());
app.use(passport.session());


// LE GET ET POST DU LOGIN AVEC LES TWEETS 
app.get('/', (request,response) => {
    response.render('login', {
        title:"Login",
        style: "login.css",
    })
})

// app.post('/', passport.authenticate('local', { 
//     successRedirect: '/home',
//     failureRedirect: '/' }));

app.post(
    "/",
    passport.authenticate("local", { failureRedirect: "/" }),
    function (req, res) {
        console.log(req.user);
        res.redirect('/home/' + req.user.username);
    }
);
// res.redirect('/home/' + req.user.username);
// FIN

// LE GET ET POST DU SIGNUP AVEC LES TWEETS 
app.get('/signup', (request,response) => {
    response.render('signup', {
        title:"Connexion",
        style: "signup.css",
    })
})

app.post('/signup', (request,response)=>{
    let User = require('./models/user')
    User.create(
        request.body.nom,
        request.body.prenom, 
        request.body.email,
        request.body.birthday,
        request.body.password,
        request.body.username,
        function (){
        console.log('user crée !')
        response.redirect('/')
    })
})
// FIN

// LE GET ET POST DU HOME AVEC LES TWEETS 
app.use(isAuth)
app.get('/home/:username',(request,response) => {
    let Message = require('./models/message')
    Message.all(function(messages){
        console.log(messages)
        response.render('home', {
            title:"Accueil",
            style: "home.css",
            message: messages})
    })
})

app.post('/home/:username', (request,response)=>{
    // si le contenu du message est vide alors on lance une session error 
   if (request.body.message === undefined || request.body.message ===''){
       console.log("Problem !")
       response.redirect('/home/' + request.user.username);
   }
   else {
        let Message = require('./models/message')
        console.log(request.user.id_user)
        Message.create(request.user.id_user, request.body.message, function (){
        response.redirect('/home/' + request.user.username);
    })
   }
})
// FIN

app.get('/profil/:username', (request,response) => {
    let Message = require('./models/message')
    Message.allUser(function(messages){
        console.log(messages)
        response.render('profil', {
            title:"Profil",
            style: "profil.css",
            message: messages,
            username : messages.username})
    })
})

app.get("*", (request, response) => {
    response.status(404).render("404");
  });

app.listen(4000);