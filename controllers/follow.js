
const Follow = require('../models/follow')


// ici on a le controller follow pour HOME POST qui permet de gerer l'intégration du following dans ma base de données 
exports.postHomeSuggestions = (request, response) => {
    let idTarget = request.params.user_id;
    Follow.create(request.user.id_user, idTarget  , function (){
     response.redirect('/home/' + request.user.username);
    })
};