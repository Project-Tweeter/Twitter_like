const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userService = require("../models/user.js");

module.exports = () => {
  passport.use(
    new LocalStrategy({ passReqToCallback: true }, function (
      req,
      username,
      password,
      done
    ) {
      userService.findUser(username, function (err, user) {
        let bcrypt = require("bcryptjs");
        user = user[0];
        if (err) return done(err);

        if (!user) return done(null, false);

        //comparaison des passwords
        if (!bcrypt.compareSync(password, user.password))
          return done(null, false);

        return done(null, user);
      });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  return passport;
};
