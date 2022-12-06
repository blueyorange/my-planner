const { isObjectIdOrHexString } = require("mongoose");
const Poll = require("../models/poll.model.js");
// const PollResult = require("./models/pollResult.model.js");
// const Question = require("./models/question.model.js");
let rooms = new Map();
let usersById = new Map();

function getNames(socket, roomName) {
  const ids = rooms.get(roomName);
  let names;
  if (ids) {
    names = [...ids]
      .map((id) => usersById.get(id))
      .filter((u) => u.role === "student")
      .map((u) => u.name.givenName);
  } else {
    names = [];
  }
  return names;
}

async function connect(io, socket) {
  const { user } = socket;
  usersById.set(user._id, user);
  socket.on("join", (roomName) => {
    console.log(`${user.name.givenName} joined`);
    socket.join(roomName);
    socket.roomName = roomName;
    let room;
    if (!rooms.has(roomName)) {
      room = new Set([user._id]);
      rooms.set(roomName, room);
    } else {
      room = rooms.get(roomName);
      room.add(user._id);
    }
    const names = getNames(socket, socket.roomName);
    io.to(roomName).emit("names", names);
  });
  socket.on("disconnect", () => {
    if (socket.roomName) {
      rooms.get(socket.roomName).delete(user._id);
      usersById.delete(socket.user._id);
      const names = getNames(socket, socket.roomName);
      io.to(socket.roomName).emit("names", names);
    }
  });
}

module.exports = connect;
