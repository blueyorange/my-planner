const Poll = require("../models/poll.model.js");
// const PollResult = require("./models/pollResult.model.js");
// const Question = require("./models/question.model.js");
let rooms = new Map();
let users = new Map();

async function connect(socket) {
  const { user } = socket;
  users.set(user._id, user.name.givenName);
  console.log(users);
  socket.on("join", (joinCode) => {
    let room;
    console.log(joinCode);
    if (!rooms.has(joinCode)) {
      room = new Set([user._id]);
      console.log("room", room);
      rooms.set(joinCode, room);
    } else {
      console.log("room", room);
      room = rooms.get(joinCode);
      room.add(user._id);
    }
    console.log(room);
    console.log(rooms.get(joinCode));
  });
  socket.on("disconnect", () => {
    console.log(`${socket.user.name.givenName} disconnected`);
  });
}

module.exports = connect;
