const mongoose = require("mongoose");
const Permission = require("./permission.model");

const RoleSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  permissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission",
    },
  ],
});

module.exports = mongoose.model("Role", RoleSchema);
