const express = require("express");
const router = express.Router();
const Question = require("../models/question.model.js");
const { marked } = require("marked");

router.get("/", async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  const { docs, total, pages } = await Question.paginate({}, { page, limit });
  const startPaginate = page > 4 ? page - 4 : 1;
  let endPaginate = startPaginate + 9;
  endPaginate = endPaginate > pages ? pages : endPaginate;
  questions = docs.map((doc) => {
    const question = {
      ...doc._doc,
      body: marked.parse(doc.body),
    };
    return question;
  });
  console.log(questions[1]);
  return res.render("questions.njk", {
    questions,
    total,
    pages,
    page,
    startPaginate,
    endPaginate,
  });
});

router.get("/create", (req, res) => {
  return res.render("edit-question.njk");
});

router.post("/create", (req, res) => {
  const form = req.body;
  options = new Map();
  ["A", "B", "C", "D"].forEach((letter) => {
    options[letter] = form[`option-${letter}`];
  });
  const correct = form.correct;
  return Question.create({ question: form.question, options, correct }).then(
    (q) => res.render("view-question.njk", { q })
  );
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const q = Question.findById(id);
  console.log(q);
  return res.render("view-question.njk", { q });
});

module.exports = router;
