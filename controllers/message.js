const Message = require("../models/message");

// ici on a le controller message pour HOME POST qui permet de gerer l'intégration des messages tweetés dans ma base de données

exports.postTweets = (request, response) => {
  if (request.body.message === undefined || request.body.message === "") {
    console.log("Problem !");
    response.redirect("/home/" + request.user.username);
  } else {
    Message.createTweet(request.user.id, request.body.message, function () {
      response.redirect("/home/" + request.user.username);
    });
  }
};

exports.deleteTweet = (request, response) => {
  let tweet_id = request.params.tweet_id;
  Message.deleteTweet(tweet_id, function () {
    response.redirect("/home/" + request.user.username);
  });
};
