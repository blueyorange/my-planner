const express = require("express");
const router = express.Router();
const {Course, Outcome} = require('../models/course.model.js')

router.get("/", async (req, res) => {
  const modules = await Outcome.find({}).distinct('topic');
  console.log(modules)
  const courses = await Course.find({});
  return res.render("courses.njk", { currentUser: req.user, courses });
});

router.get("/:course", async (req, res) => {
  const courses = await Course.find({});
  const selectedCourse = await Course.findOne({title: req.params.course}).populate('outcomes').exec();
    return res.render("courses.njk", { currentUser: req.user, courses, selectedCourse });
});

module.exports = router;
