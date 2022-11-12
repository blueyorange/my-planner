const express = require("express");
const router = express.Router();
const Question = require("../models/question.model.js");

router.get("/", (req, res) => {
    return res.render("questions.njk");
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
    console.log(options)
    const correct = form.correct
    const q = Question.create({ question: form.question, options, correct }).then(q => console.log(q));
    return res.render("edit-question.njk")
})

module.exports = router;
