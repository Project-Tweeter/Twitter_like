require('dotenv').config()
const express = require('express');
const app = express();
const expbs = require('express-handlebars')
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require('connect-flash');
const isAuth = require('./middlewares/isAuth');


// lancement d'express Handlebars, moteur de template, avec un engine et un set
// le engine va permettre de precider le layout par default et le nom des fichiers
// de base, les fichiers se terminent par '.handlebars" et là j'ai fait en sorte de juste mettre '.hbs"
app.engine('.hbs', expbs({
    defaultLayout: "main",
    extname: ".hbs"
}));
app.set('view engine', 'hbs');
// app.use(cookieParser());
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



app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

// LE GET ET POST DU LOGIN AVEC LES TWEETS ---------------------------------------------------
app.get('/', (request,response) => {
    response.render('login', {
        title:"Login",
        style: "login.css",
        error: request.flash('error')
    })
})

app.post(
    "/",
    passport.authenticate("local", {    
    failureRedirect: "/",
    failureFlash: "Username ou password faux, recommencez !"}),
    function (req, res) {
        // console.log(req.user);
        res.redirect('/home/' + req.user.username);
    }
);
// FIN

// LE GET ET POST DU SIGNUP AVEC LES TWEETS ---------------------------------------------
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
// FIN -------------------------------------------------------------------------------------

// LE GET ET POST DU HOME AVEC LES TWEETS --------------------------------------------------
app.use(isAuth)

app.get('/home/:username',(request,response) => {
    let Message = require('./models/message')
    let User = require('./models/user')
    let currentUser = request.params.username
    User.allUser(currentUser, function(err, users){
    Message.all(function(messages){
        // console.log(messages)
        response.render('home', {
            title:"Home",
            style: "home.css",
            me : request.user.username,
            message: messages,
            user : users,
            username : request.user.username
        })
    })
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
        // console.log(request.user.id_user)
        Message.create(request.user.id_user, request.body.message, function (){
        response.redirect('/home/' + request.user.username);
    })
   }

})

app.post('/home/follow/:user_id', (request,response)=>{
   let Follow = require('./models/follow')
   let idTarget = request.params.user_id;
   Follow.create(request.user.id_user, idTarget  , function (){
    response.redirect('/home/' + request.user.username);
})
})
// FIN ------------------------------------------------------------------------------------------

// LE GET DU PROFIL AVEC LES TWEETS -------------------------------------------------------
app.get('/profil/:username', (request,response) => {
    let Message = require('./models/message')
    let User = require('./models/user')
    let username = request.params.username
    User.allUser(username, function(err, users){
    User.findUser(username, function(err, user){
        // console.log(user)
        Message.allUser(username,function(messages){
            response.render('profil', {
                title:"Profil",
                me : request.user.username,
                style: "profil.css",
                message: messages,
                username : username,
                link: user[0].link,
                id : messages.Id_tweet,
                user : users})
        })
    } )
})
})
// FIN -----------------------------------------------------------------------------------

// LE GET DU TWEET SEUL ------------------------------------------------------------------
app.get('/tweet/:username/:id', (request,response) => {
    let Message = require('./models/message')
    let User = require('./models/user')
    let username = request.params.username
    let id_tweet = request.params.id
    User.allUser(username, function(err, users){
        Message.tweetUser(id_tweet,function(messages){
            console.log(messages)
            response.render('tweet', {
                title:"Tweet",
                style: "tweet.css",
                message: messages,
                me : username,
                user : users})
        })
    })
})
// FIN -----------------------------------------------------------------------------------

// 404 -----------------------------------------------------------------------------------

app.get("*", (request, response) => {
    response.status(404).render("404", {
        style: "404.css"
    });
  });

app.listen(4000);