const mongoose = require("mongoose");
const QuestionSchema = require("./question.model.js").schema;

const PollResultSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    answer: { type: String },
    expired: { type: Boolean },
  },
  { timestamps: true }
);

const PollSchema = new mongoose.Schema({
  question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  joinCode: { type: String },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  results: [{ type: PollResultSchema }],
});

module.exports = mongoose.model("Poll", PollSchema);
