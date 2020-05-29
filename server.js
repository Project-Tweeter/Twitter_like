const express = require('express');
const app = express();
const expbs = require('express-handlebars')
const bodyParser = require("body-parser");
const session = require("express-session");

app.engine('.hbs', expbs({
    defaultLayout: "main",
    extname: ".hbs"
}));
app.set('view engine', 'hbs');
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


// LE GET ET POST DU HOME AVEC LES TWEETS 
app.get('/home', (request,response) => {
    let Message = require('./models/message')
    Message.all(function(messages){
        response.render('home', {
            title:"Accueil",
            style: "home.css",
            message: messages})
    })
})

app.post('/home', (request,response)=>{
    // si le contenu du message est vide alors on lance une session error 
   if (request.body.message === undefined || request.body.message ===''){
       console.log("Problem !")
       response.redirect('/home')
   } 
   else {
    let Message = require('./models/message')
    Message.create(request.body.message, function (){
        response.redirect('/home')
    })
   }
})
// FIN

// LE GET ET POST DU HOME AVEC LES TWEETS 
app.get('/signup', (request,response) => {
    response.render('signup', {
        title:"Connexion",
        style: "signup.css",
    })
})

app.post('/signup', (request,response)=>{
  
    let User = require('./models/user')
    User.create(request.body.message, function (){
        response.redirect('/login')
    })
})
// FIN

app.get('/account', (request,response) => {
    response.render('account', {
        title:"Compte",
        style: "account.css"
    })
})
app.get('/login', (request,response) => {
    response.render('login', {
        title:"Login",
        style: "login.css",
    })
})


app.get("*", (request, response) => {
    response.status(404).render("404");
  });

app.listen(2000);