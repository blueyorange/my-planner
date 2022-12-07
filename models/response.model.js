const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema(
  {
    question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    answer: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Response", ResponseSchema);
