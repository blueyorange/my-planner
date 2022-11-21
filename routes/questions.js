const express = require("express");
const router = express.Router();
const Question = require("../models/question.model.js");
const { marked } = require("marked");

router.get("/", async (req, res) => {
  let { page = 1, limit = 18, tags } = req.query;
  page = Number(page);
  if (!page) {
    return next();
  }
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
  }).catch((err) => next(err, req, res, next));
  const numPagOptions = 5;
  const minAdvance = 3;
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

router.get("/view/:id", async (req, res, next) => {
  const { id } = req.params;
  return Question.findById(id)
    .then((q) => {
      q = {
        body: marked.parse(q.body),
        id: q._id.toString(),
        options: q.options,
        tags: q.tags,
      };
      return res.render("view-question.njk", { q });
    })
    .catch((err) => next(err));
});

router.get("/edit/:id", async (req, res, next) => {
  const { id } = req.params;
  return Question.findById(id)
    .then((q) => {
      q.id = q._id.toString();
      return res.render("edit-question.njk", { q });
    })
    .catch((err) => next(err));
});

router.post("/edit/:id", (req, res, next) => {
  const { id } = req.params;
  const body = req.body.body;
  const options = Object.keys(req.body)
    .filter((key) => /option-\d/.test(key))
    .map((key) => form[key]);
  const correct = req.body.correct;
  console.log(form);
  const question = {
    body: form["body"],
    options: Object.keys(form)
      .filter((key) => /option-\d/.test(key))
      .map((key) => form[key]),
  };
  console.log(question);
});

module.exports = router;
