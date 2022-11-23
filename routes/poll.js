const express = require("express");
const router = express.Router();
const Question = require("../models/question.model.js");
const Poll = require("../models/poll.model.js");
const { marked } = require("marked");

router.get("/teacher/:joinCode", async (req, res, next) => {
  const { joinCode } = req.params;
  return Poll.findOne({ joinCode })
    .populate("question")
    .exec()
    .then((poll) => {
      console.log(poll);
      return res.render("poll-teacher.njk", {
        q: poll.question,
        parse: marked.parse,
        joinCode,
      });
    })
    .catch((err) => next(err));
});

router.get("/:joinCode", async (req, res, next) => {
  const { joinCode } = req.params;
  return Poll.findOne({ joinCode })
    .then((poll) => {
      if (!poll) {
        return res.render("poll-reject.njk");
      } else {
        const { body, options } = poll.question;
        const q = { body, options };
        return res.render("poll-student.njk", { q, parse: marked.parse });
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
