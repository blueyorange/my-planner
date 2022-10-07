const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  source : {type: String, required: [true, "source not specified"]},
  id : {type: String, default: null},
  displayName : {type:String, required: true},
  name : {givenName : {type: String}, familyName : {type: String}}
});

module.exports = mongoose.model("User", UserSchema);
