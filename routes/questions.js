const express = require("express");
const router = express.Router();
const Question = require("../models/question.model.js");
const { marked } = require("marked");

router.get("/", async (req, res) => {
  const numPagOptions = 5;
  let { page = 1, limit = 18, tags } = req.query;
  let query = {};
  let queryString = "";
  if (tags) {
    query = { tags: { $all: tags } };
    const queryParams = new URLSearchParams({ tags });
    queryString = queryParams.toString().replaceAll("%2C", "&tags=");
  } else {
    tags = "";
  }
  const { docs, total, pages } = await Question.paginate(query, {
    page,
    limit,
  });
  const minAdvance = Math.ceil(numPagOptions / 2 + 1);
  const startPaginate = page > minAdvance ? page - minAdvance : 1;
  let endPaginate = startPaginate + numPagOptions - 1;
  endPaginate = endPaginate > pages ? pages : endPaginate;
  questions = docs.map((doc) => {
    const question = {
      ...doc._doc,
      body: marked.parse(doc.body),
    };
    return question;
  });
  const allTags = await Question.find({}).distinct("tags");
  return res.render("questions.njk", {
    questions,
    total,
    pages,
    page,
    startPaginate,
    endPaginate,
    allTags,
    tags,
    queryString,
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
