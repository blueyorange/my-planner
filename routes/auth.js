const { response } = require("express");
const express = require("express");
const router = express.Router();
var passport = require("passport");
var GoogleStrategy = require("passport-google-oidc");
const User = require("../models/user.model.js");

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
      // All new users are students by default! *************
      const role = "student";
      const user = await User.findOne({ id, source }).exec();
      if (!user) {
        return User.create({
          source,
          id,
          name,
          displayName,
          role,
        }).then(async (user) => {
          cb(null, user);
        });
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

router.get("/login/federated/google", (req, res, next) => {
  console.log(req.session.targetUrl);
  passport.authenticate("google")(req, res, next);
});

router.get("/oauth2/redirect/google", (req, res, next) => {
  passport.authenticate("google", {
    successRedirect: req.session.targetUrl || "/",
    failureRedirect: "/auth/login",
    successFlash: { type: "success", message: "Log in successful!" },
    failureFlash: { type: "error", message: "Log in failed." },
  })(req, res, next);
});

router.get("/login", (req, res) => {
  return res.render("login.njk");
});

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
