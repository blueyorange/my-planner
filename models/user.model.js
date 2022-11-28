const mongoose = require("mongoose");
const Role = require("./role.model.js");

const UserSchema = new mongoose.Schema({
  source: { type: String, required: [true, "source not specified"] },
  id: { type: String, default: null, unique: true },
  displayName: { type: String, required: true },
  name: { givenName: { type: String }, familyName: { type: String } },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

UserSchema.methods.assignRole = async function (roleName) {
  const role = await Role.findOne({ name: roleName });
  if (role) {
    this.role = role;
    this.save();
  } else {
    throw new Error("Invalid role name for assignment.");
  }
};

UserSchema.methods.can = async function (permission) {
  if (!permission) {
    throw new Error("You must provide a permission name.");
  }
  const user = await this.populate({
    path: "role",
    model: "Role",
    populate: { path: "permissions", model: "Permission" },
  });
  return await user.role.permissions.some((p) => p.name === permission);
};

module.exports = mongoose.model("User", UserSchema);
