const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  source : {type: String, required: [true, "source not specified"]},
  id : {type: String, default: null},
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    message: "Must contain at least 5 characters can include spaces",
    // usernames must be 5 chars or more
    match: /^[.\s]{5,}$/,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    message: "Must contain at least 8 characters and no spaces",
    match: /^[.\S]{8,}/,
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();
  // generate a salt
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(user.password, salt);
  // hash the password using our new salt
  user.password = hash;
  next();
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
