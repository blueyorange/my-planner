const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/user.model");

async function run() {
  console.log("Accessing db...");
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await User.collection.drop();

  let users = JSON.parse(fs.readFileSync("./seed/data/users.json")).users;
  User.insertMany(users).then((result) => {
    console.log(result);
    process.exit();
  });
}

run();
