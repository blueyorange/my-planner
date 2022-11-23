const express = require("express");
const router = express.Router();
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
    .populate("question")
    .then((poll) => {
      if (!poll) {
        return res.render("poll-reject.njk");
      } else {
        const { body, options, _id } = poll.question;
        const q = { _id, body, options };
        return res.render("poll-student.njk", {
          q,
          parse: marked.parse,
          userId: req.user._id,
          pollId: poll._id,
        });
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
