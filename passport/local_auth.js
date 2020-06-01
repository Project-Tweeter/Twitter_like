const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userService = require("../models/user.js");


module.exports = () => {
    //Setting the strategy for Passport
    passport.use(
      new LocalStrategy({ passReqToCallback: true }, function (req, username, password, done) {
        userService.findUser(username, function (err, user) {
          let bcrypt = require('bcryptjs');
          user = user[0];
          if (err) return done(err);
  
          if (!user) return done(null, false);
  
          //comparing user passwords - return if not a match
          if (!bcrypt.compareSync(password, user.password)) return done(null, false);
  
          return done(null, user);
        });
      })
    );
  
    //These two methods are required to keep the user logged in via the session
    passport.serializeUser(function (user, done) {
      done(null, user);
    });
  
    passport.deserializeUser(function (user, done) {
      done(null, user);
    });
  
    return passport;
  };
