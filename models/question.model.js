const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  body: { type: String },
  options: [{ type: String }],
  correct: [{ type: String }],
  tags: [{ type: String }],
  source: { type: String },
  images: [{ type: String }],
  type: { type: String },
});

module.exports = mongoose.model("Question", QuestionSchema);
