const mongoose = require("mongoose");
const Role = require("./role.model.js");

const UserSchema = new mongoose.Schema({
  source: { type: String, required: [true, "source not specified"] },
  id: { type: String, default: null, unique: true },
  displayName: { type: String, required: true },
  name: { givenName: { type: String }, familyName: { type: String } },
  role: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
