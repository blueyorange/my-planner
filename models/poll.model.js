const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema({
  joinCode: { type: String },
  question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  results: [{ type: mongoose.Schema.Types.ObjectId, ref: "PollResult" }],
  expired: { type: Boolean },
});

module.exports = mongoose.model("Poll", PollSchema);
