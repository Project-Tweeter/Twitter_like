const User = require("../models/user");
const Message = require("../models/message");
const Follow = require("../models/follow");

// ici on utilise le controller User pour le HOME qui est relié à sa route GET
exports.getHome = (request, response) => {
  let currentUser = request.params.username;
  User.allUser(currentUser, function (err, users) {
    Message.all(function (messages) {
      // console.log(messages)
      response.render("home", {
        title: "Home",
        style: "home.css",
        me: request.user.username,
        message: messages,
        user: users,
        username: request.user.username,
      });
    });
  });
};

// ici on utilise le controller User pour le PROFIL qui est relié à sa route GET
exports.getProfil = (request, response) => {
  console.log("profile");

  let username = request.params.username;
  let test = request.user.id_user;

  User.allUser(username, function (error, users) {
    User.findUser(username, function (error, user) {
      if (user[0]) var id = user[0].id_user;
      Follow.isFollow(request.user.id_user, id, (isFollow) => {
        console.log("lenght", isFollow.length);
        Message.allUser(username, function (messages) {
          response.render("profil", {
            title: "Profil",
            me: request.user.username,
            test: test,
            style: "profil.css",
            message: messages,
            isFollow: isFollow.length,
            username: username,
            users: user[0],
            id: messages.Id_tweet,
            user: users,
          });
        });
      });
    });
  });
};

// ici on utilise le controller User pour le TWEET qui est relié à sa route GET
exports.getTweet = (request, response) => {
  let username = request.params.username;
  let id_tweet = request.params.id;
  User.allUser(username, function (error, users) {
    Message.tweetUser(id_tweet, function (messages) {
      console.log(messages);
      response.render("tweet", {
        title: "Tweet",
        style: "tweet.css",
        message: messages,
        me: username,
        user: users,
      });
    });
  });
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
    request.user.id_user,
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
