module.exports = (request, response, next) => {
    if (request.isAuthenticated()) { 
      next();
    } else {
      response.redirect("/");
    }
  };