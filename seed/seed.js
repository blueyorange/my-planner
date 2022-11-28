const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();
const Question = require("../models/question.model");

async function run() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  let rawdata = fs.readFileSync("./seed/data/questions.json");
  let questions = JSON.parse(rawdata).questions;
  console.log(questions);

  await Question.insertMany(questions).then((res) => console.log(res));
  console.log("Finished.");
}

run();
