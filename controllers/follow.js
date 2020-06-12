const Follow = require("../models/follow");

// ici on a le controller follow pour HOME POST qui permet de gerer l'intégration du following dans ma base de données
exports.postHomeSuggestions = (request, response) => {
  let idTarget = request.params.user_id;
  // console.log(request.body.id_user)
  Follow.create(request.user.id_user, idTarget, function () {
    response.redirect("/home/" + request.user.username);
  });
};

exports.follow = (request, response) => {
  Follow.create(request.user.id_user, request.body.tofollow, (res) => {
    response.redirect("/home/" + request.user.username);
  });
};

exports.unfollow = (request, response) => {
    console.log(request.body)
  Follow.delete(request.user.id_user, request.body.unfollow, (res) => {
    response.redirect("/home/" + request.user.username);
  });
};


