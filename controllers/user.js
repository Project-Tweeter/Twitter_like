const User = require("../models/user");
const Message = require('../models/message')


// ici on utilise le controller User pour le HOME qui est relié à sa route GET 
exports.getHome = (request, response) => {
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
};


// ici on utilise le controller User pour le PROFIL qui est relié à sa route GET 
exports.getProfil = (request, response) => {
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
    
};

// ici on utilise le controller User pour le TWEET qui est relié à sa route GET 
exports.getTweet = (request, response) => {

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
};


// ici on utilise le controller User pour le SIGNUP qui est relié à sa route POST
exports.postSignup = (request, response) => {
    User.create(
        request.body.nom,
        request.body.prenom, 
        request.body.email,
        request.body.birthday,
        request.body.password,
        request.body.username,
        request.body.link,
        function (){
        console.log('user crée !')
        response.redirect('/')
    })
};





