const mongoose = require("mongoose");
const {Schema} = mongoose;
require("dotenv").config();

// DATABASE
//Set up default mongoose connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const OutcomeSchema = new mongoose.Schema({
    description: {type: String, required: true},
    ref: {type: String},
    course: {type:Schema.Types.ObjectId, ref: 'Course'},
    topic: {type: String},
    subtopic: {type:String},
    module: {type: String}
});

const CourseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    outcomes: [{type:Schema.Types.ObjectId, ref: 'Outcome'}],
    description: {  type:String }
});

module.exports.Course = mongoose.model("Course", CourseSchema);
module.exports.Outcome = mongoose.model("Outcome", OutcomeSchema);
