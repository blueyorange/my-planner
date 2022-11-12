const express = require("express");
const router = express.Router();
const Question = require("../models/question.model.js");

router.get("/", (req, res) => {
    return res.render("questions.njk");
});

router.get("/create", (req, res) => {
    return res.render("edit-question.njk")
})

module.exports = router;
