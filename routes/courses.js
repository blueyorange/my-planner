const express = require("express");
const router = express.Router();
const {Course, Outcome} = require('../models/course.model.js')

router.get("/", async (req, res) => {
  const modules = await Outcome.find({}).distinct('topic');
  console.log(modules)
  const courses = await Course.find({});
  if (req.user) {
    return res.render("courses.njk", { currentUser: req.user, courses });
  } else {
    return res.redirect("/auth/login");
  }
});

router.get("/:title", async (req, res) => {
  const courses = await Course.find({});
  const selectedCourse = await Course.findOne({title: req.params.title}).populate('outcomes').exec();
  if (req.user) {
    return res.render("courses.njk", { currentUser: req.user, courses, selectedCourse });
  } else {
    return res.redirect("/auth/login");
  }
});

module.exports = router;
