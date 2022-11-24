const mongoose = require("mongoose");
const Role = require("./role.model.js");

const UserSchema = new mongoose.Schema({
  source: { type: String, required: [true, "source not specified"] },
  id: { type: String, default: null, unique: true },
  displayName: { type: String, required: true },
  name: { givenName: { type: String }, familyName: { type: String } },
  role: { type: String, ref: "Role" },
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
});

UserSchema.methods.assignRole = async function (roleName) {
  console.log("In assignrole.");
  const role = await Role.findOne({ name: roleName });
  if (role) {
    this.role = role;
    this.permissions = role.permissions;
    this.save();
  } else {
    throw new Error({
      name: "Role error.",
      message: "Invalid role name for assignment.",
    });
  }
};

module.exports = mongoose.model("User", UserSchema);
