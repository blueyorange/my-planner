const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/user.model");
const Role = require("../models/role.model");
const Permission = require("../models/permission.model.js");
const { exit } = require("process");

async function run() {
  console.log("Accessing db...");
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await User.collection.drop();

  let permissions = JSON.parse(
    fs.readFileSync("./seed/data/permissions.json")
  ).permissions;
  try {
    permissions = await Permission.insertMany(permissions);
  } catch (err) {}
  console.log(permissions);

  let roles = JSON.parse(fs.readFileSync("./seed/data/roles.json")).roles;
  console.log(roles);
  for (let role of roles) {
    const permissionNames = role.permissions.map((p) => p.name);
    const permissions = await Permission.find({ $all: permissionNames });
    const permissionIds = permissions.map((p) => p._id);
    role.permissions = permissionIds;
  }
  try {
    await Role.insertMany(roles);
  } catch (err) {
    if (err.code == 11000) {
      console.log(`Duplicate key.`);
    }
  }

  let users = JSON.parse(fs.readFileSync("./seed/data/users.json")).users;
  users.forEach(async (user) => {
    user.role = await Role.findOne({ name: user.role });
    let userInDb = await User.findOne({ id: user.id });
    if (!userInDb) {
      userInDb = await User.create(user);
    }
    console.log(userInDb);
  });
  let adminUser = await User.findOne({ id: "112970617713664374486" });
  console.log(`Assigning admin role to ${adminUser.name.givenName}`);
  adminRole = roles.find((role) => (role.name = "Admin"));
  await adminUser.assignRole("Admin");
  console.log(await adminUser.can("edit-question"));
}

run();
