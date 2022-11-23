const mongoose = require("mongoose");
const QuestionSchema = require("./question.model.js");

const PollResultSchema = new mongoose.Schema(
  {
    question: { type: QuestionSchema },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    answer: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PollResult", PollResultSchema);
