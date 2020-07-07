const User = require("../models/user");
const Message = require("../models/message");

// ici on utilise le controller User pour le HOME qui est relié à sa route GET
exports.getHome = (request, response) => {
  let currentUser = request.params.username;
  User.findUsersExceptMe(currentUser, function (error, users) {
    Message.postAllTweets(function (tweets) {
      response.render("home", {
        title: "Home",
        style: "home.css",
        me: request.user.username,
        tweet: tweets,
        user: users,
        username: request.user.username,
      });
    });
  });
};

// ici on utilise le controller User pour le PROFIL qui est relié à sa route GET
exports.getProfil = (request, response) => {
  let username = request.params.username;
  let test = request.user.id;
  User.findUsersExceptMe(username, function (error, users) {
    User.findUser(username, function (error, user) {
      Message.postAllTweetsCurrentUser(username, function (tweets) {
        response.render("profil", {
          title: "Profil",
          me: request.user.username,
          test: test,
          style: "profil.css",
          tweet: tweets,
          username: username,
          link: user[0].link,
          nom: user[0].nom,
          prenom: user[0].prenom,
          id: tweets.Id_tweet,
          user: users,
        });
      });
    });
  });
};

// ici on utilise le controller User pour le TWEET qui est relié à sa route GET
exports.getTweet = (request, response) => {
  let username = request.params.username;
  let id_tweet = request.params.id;
  User.findUsersExceptMe(username, function (error, users) {
    Message.postOneTweetCurrentUser(id_tweet, function (tweets) {
      response.render("tweet", {
        title: "Tweet",
        style: "tweet.css",
        tweet: tweets,
        me: username,
        user: users,
      });
    });
  });
};

// ici on utilise le controller User pour le SIGNUP qui est relié à sa route POST
exports.postSignup = (request, response) => {
  User.createUser(
    request.body.nom,
    request.body.prenom,
    request.body.email,
    request.body.birthday,
    request.body.password,
    request.body.username,
    request.body.link,
    function () {
      console.log("user crée !");
      response.redirect("/");
    }
  );
};

exports.postEdit = (request, response) => {
  User.updateUser(
    request.body.nom,
    request.body.prenom,
    request.body.email,
    request.body.username,
    request.body.link,
    request.user.id,
    function () {
      response.redirect("/");
    }
  );
};

exports.getEdit = (request, response) => {
  let username = request.params.username;
  User.findUser(username, function (error, user) {
    response.render("edit", {
      title: "Modifier",
      style: "edit.css",
      nom: user[0].nom,
      prenom: user[0].prenom,
      email: user[0].email,
      username: user[0].username,
      link: user[0].link,
      me: request.user.username,
    });
  });
};
