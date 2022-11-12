const express = require("express");
const cookieParser = require("cookie-parser");
const nunjucks = require("nunjucks");
const mongoose = require("mongoose");
const flash = require('connect-flash')
require("dotenv").config();
const {
  handleInvalidUrlErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./errors/errors");
var passport = require('passport');
var session = require('express-session');
const MongoStore = require('connect-mongo')

// routes
const home = require("./routes/home.js");
const auth = require("./routes/auth.js");
const questions = require("./routes/questions.js");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(session({
  secret: process.env.SECRET,
  store: MongoStore.create({mongoUrl: process.env.MONGO_URI}),
  saveUninitialized: false,
  resave: false,
  // cookie: {secure: true} // for use with HTTPS
}));
app.use(passport.authenticate('session'));
app.use(flash())

// SS rendering
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// DATABASE
//Set up default mongoose connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// routes
app.use("/", home);
app.use("/auth", auth);
app.use(function (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }
  res.locals.user = req.user
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
})
app.use("/questions", questions)
app.all("*", handleInvalidUrlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

app.listen(process.env.PORT)
