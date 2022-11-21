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
  }).catch((err) => next(err));

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

router.get("/create", (req, res, next) => {
  return res.render("question.njk", { q, mode: "create", parse: marked.parse });
});

router.get("/:id", (req, res, next) => {
  let { mode } = req.query;
  const { id } = req.params;
  return Question.findById(id)
    .then((q) => {
      return res.render("question.njk", { q, mode, parse: marked.parse });
    })
    .catch((err) => next(err));
});

function questionFromForm(form) {
  const { body, correct } = form;
  return {
    body,
    correct,
    type: "multiple-choice",
    options: Object.keys(form)
      .filter((key) => /option-\d/.test(key))
      .map((key) => form[key]),
  };
}

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const q = questionFromForm(req.body);
  console.log(q);
});

module.exports = router;
