const express = require("express");
const router = express.Router();
const Question = require("../models/question.model.js");
const Poll = require("../models/poll.model.js");
const { marked } = require("marked");

router.get("/:joinCode", async (req, res, next) => {
  const { joinCode } = req.params;
  let poll = await Poll.findOne({ joinCode });
  if (!poll) {
    return res.render("poll-reject.njk");
  } else {
    const { body, options } = poll.question;
    const q = { body, options };
    return res.render("poll-student.njk", { q, parse: marked.parse });
  }
});

module.exports = router;
