const mongoose = require("mongoose");
const {Schema, model} = mongoose;
require("dotenv").config();

const categorySchema = new Schema({
  ref: { type: String },
  description : {type: String},
  children: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
})

const courseSchema = new Schema({
  title: { type: String },
  categories : [{ type: Schema.Types.ObjectId, ref: 'Category' }]
});

module.exports.Course = model("Course", courseSchema);
module.exports.Category = model("Outcome", categorySchema);
