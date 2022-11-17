const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const QuestionSchema = new mongoose.Schema({
  body: { type: String },
  options: [{ type: String }],
  correct: [{ type: String }],
  tags: [{ type: String }],
  source: { type: String },
  images: [{ type: String }],
  type: { type: String },
});

QuestionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Question", QuestionSchema);
