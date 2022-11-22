const mongoose = require("mongoose");
const QuestionSchema = require("./question.model.js").schema;

const PollResultSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId },
    answer: { type: String },
    expired: { type: Boolean },
  },
  { timestamps: true }
);

const PollSchema = new mongoose.Schema({
  question: { type: QuestionSchema },
  joinCode: { type: String },
  teacher: { type: mongoose.Schema.Types.ObjectId },
  results: [{ type: PollResultSchema }],
});

module.exports = mongoose.model("Poll", PollSchema);
