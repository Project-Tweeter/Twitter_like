const Follow = require("../models/follow");

// ici on a le controller follow pour HOME POST qui permet de gerer l'intégration du following dans ma base de données
exports.followUser = (request, response) => {
  let idTarget = request.params.user_id;
  Follow.create(request.user.id, idTarget,() => {
    response.redirect("/home/" + request.user.username);
  });
};
