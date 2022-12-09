const Poll = require("../models/poll.model.js");
const Response = require("../models/response.model.js");
const Question = require("../models/question.model.js");
let rooms = new Map();
let usersById = new Map();

function getNames(roomName) {
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

function connect(io, socket) {
  const { user } = socket;
  let roomName;
  usersById.set(user._id, user);

  socket.on("join", (joinCode, cb) => {
    cb("done");
    roomName = joinCode;
    console.log(`${user.name.givenName} joined`);
    if (socket.rooms) socket.join(roomName);
    let room;
    if (!rooms.has(roomName)) {
      room = new Set([user._id]);
      rooms.set(roomName, room);
    } else {
      room = rooms.get(roomName);
      room.add(user._id);
    }
    const names = getNames(roomName);
    io.to(roomName).emit("names", names);
  });

  socket.on("disconnect", () => {
    if (roomName) {
      rooms.get(roomName).delete(user._id);
      usersById.delete(user._id);
      const names = getNames(roomName);
      console.log(names);
      io.to(roomName).emit("names", names);
    }
  });

  socket.on("answer", async ({ questionId, answer }) => {
    const question = await Question.findById(questionId);
    if (question) {
      Response.create({
        user: user._id,
        question: questionId,
        answer,
        isCorrect: answer === question.correct,
      });
    }
  });
}

module.exports = connect;
