const express = require("express");
const router = express.Router();
var passport = require("passport");
var GoogleStrategy = require("passport-google-oidc");
const User = require("../models/user.model.js");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "/auth/oauth2/redirect/google",
      scope: ["profile"],
    },
    async function verify(source, profile, cb) {
      const { id, name, displayName } = profile;
      const user = await User.findOne({ id, source }).exec();
      if (!user) {
        return User.create({ source, id, name, displayName }).then((user) =>
          cb(null, user)
        );
      } else {
        return cb(null, user);
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

router.get("/login/federated/google", passport.authenticate("google"));

router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: "/questions",
    failureRedirect: "/",
  })
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
