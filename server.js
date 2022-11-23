const express = require("express");
const cookieParser = require("cookie-parser");
const nunjucks = require("nunjucks");
const mongoose = require("mongoose");
const flash = require("connect-flash");
require("https").globalAgent.options.rejectUnauthorized = false;
require("dotenv").config();
const {
  handleInvalidUrlErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./errors/errors");
var passport = require("passport");
var session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();

// Socket io
const Poll = require("./models/poll.model.js");
const PollResult = require("./models/pollResult.model.js");
const Question = require("./models/question.model.js");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
io.on("connection", (socket) => {
  socket.on("join", (joinCode) => {
    socket.join(joinCode);
  });
  socket.on("respond", (response) => {
    const { pollId, questionId, userId, answer } = response;
  });
});

// routes
const home = require("./routes/home.js");
const auth = require("./routes/auth.js");
const questions = require("./routes/questions.js");
const poll = require("./routes/poll.js");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    saveUninitialized: false,
    resave: false,
    // cookie: {secure: true} // for use with HTTPS
  })
);
app.use(passport.authenticate("session"));
app.use(flash());

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
  ignoreUndefined: true,
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
    return res.redirect("/");
  }
  res.locals.user = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.baseUrl = process.env["ORIGIN_URI"];
  res.locals.joinUrl = process.env["JOIN_URI"];
  next();
});
app.use("/poll", poll);
app.use("/questions", questions);
app.all("*", handleInvalidUrlErrors);
app.use(handleCustomErrors);

const { PORT = 3000 } = process.env;
console.log(`Listening on port ${PORT}...`);
server.listen(PORT);
