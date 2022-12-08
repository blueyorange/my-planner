const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const QuestionSchema = new mongoose.Schema(
  {
    body: { type: String },
    choices: [{ type: String }],
    correct: [{ type: String }],
    tags: { type: [String], index: true },
    source: { type: String },
    images: [{ type: String }],
    type: { type: String },
  },
  { timestamps: true }
);

QuestionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Question", QuestionSchema);
