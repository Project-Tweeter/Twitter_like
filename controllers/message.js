const Message = require('../models/message')


// ici on a le controller message pour HOME POST qui permet de gerer l'intégration des messages tweetés dans ma base de données 

exports.postHomeTweets = (request, response) => {
    if (request.body.message === undefined || request.body.message ===''){
        console.log("Problem !")
        response.redirect('/home/' + request.user.username);
    }
    else {
         // let Message = require('../models/message')
         // console.log(request.user.id_user)
         Message.create(request.user.id_user, request.body.message, function (){
         response.redirect('/home/' + request.user.username);
     })
    }
};

exports.deleteTweet = (request, response) => {
    let tweet_id = request.params.Id_tweet;
    Message.deleteTweet( tweet_id, function (){
        response.redirect('/home/' + request.user.username);
})

};
// ici on utilise le controller message pour PROFIL 