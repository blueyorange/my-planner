const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    body: {type: String},
    options: { type: Map, of: String },
    correct: {type: String},
    tags: [{ type: String }],
});

module.exports = mongoose.model("Question", QuestionSchema);
