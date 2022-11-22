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
    query.tags = { $all: tags };
    const queryParams = new URLSearchParams({ tags });
    queryString = queryParams.toString().replaceAll("%2C", "&tags=");
  } else {
    tags = "";
  }
  const { docs, total, pages } = await Question.paginate(query, {
    page,
    limit,
    sort: { createdAt: -1 },
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

router.get("/new", (req, res, next) => {
  return res.render("edit-question.njk", {
    method: "POST",
    action: "",
    parse: marked.parse,
    q: { body: "", options: Array(4) },
  });
});

router.post("/:id", (req, res, next) => {
  const { id } = req.params;
  const q = req.body;
  return Question.findByIdAndUpdate(id, q).then((result) => {
    console.log(result);
    return res.redirect(id);
  });
});

router.post("/", (req, res, next) => {
  const q = req.body;
  return Question.create(q).then((newQuestion) => {
    console.log(newQuestion);
    return res.redirect(newQuestion._id);
  });
});

router.get("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  return Question.findById(id)
    .then((q) => {
      return res.render("edit-question.njk", {
        q,
        parse: marked.parse,
      });
    })
    .catch((err) => next(err));
});

router.put("/:id", (req, res, next) => {});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  return Question.findById(id)
    .then((q) => {
      return res.render("question.njk", { q, parse: marked.parse });
    })
    .catch((err) => next(err));
});

router.get("/:id/delete", (req, res, next) => {
  const { id } = req.params;
  return Question.findByIdAndDelete(id)
    .then(() => {
      req.flash("success", "Question deleted.");
      return res.redirect("/questions");
    })
    .catch((err) => {
      req.flash("error", "Question not deleted.");
      return res.redirect("/questions");
    });
});

module.exports = router;
