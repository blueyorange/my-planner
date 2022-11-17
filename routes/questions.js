const express = require("express");
const router = express.Router();
const Question = require("../models/question.model.js");

function getConsecutiveIntegers(start, end) {
    var out = [];
    for (var i = start; i <= end; i++) {
        out.push(i);
    }
    return out;
}

function getPageNumbers(page, totalPages) {
    const maxPages = 10;
    const offset = 5;
    console.log(typeof(page))
    const start = page > offset ? (1 + page) - offset : 1
    console.log(start)
    let end = start + maxPages - 1;
    end = end > totalPages ? totalPages : end
    return getConsecutiveIntegers(start, end)
}

router.get("/", async (req, res) => {
    let { page = 1, limit = 10 } = req.query;
    page = Number(page);
    limit = Number(limit);
    // const numResults = (await Question.find()).length;
    let numResults = 0;
    const totalPages = Math.ceil(numResults / limit);
    const pages = getPageNumbers(page, totalPages);
    const next = totalPages === pages.at(-1) ? false : true;
    console.log(pages)
    console.log(page)
    const questions =  await Question.find().limit(limit).skip(page*limit).exec();
    return res.render("questions.njk", {questions, pages, page, next, numResults});
});

router.get("/create", (req, res) => {
    return res.render("edit-question.njk")
})

router.post("/create", (req, res) => {
    const form = req.body;
    options = new Map();
    ['A', 'B', 'C', 'D'].forEach(letter => {
        options[letter] = form[`option-${letter}`]
    })
    const correct = form.correct;
    return Question.create({ question: form.question, options, correct }).then(q => res.render("view-question.njk", { q }));
})

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const q = Question.findById(id);
    console.log(q)
    return res.render("view-question.njk", {q});
})

module.exports = router;
