const Poll = require("../models/poll.model.js");
// const PollResult = require("./models/pollResult.model.js");
// const Question = require("./models/question.model.js");
const users = [];

async function connect(socket) {
  const user = socket.request.session.passport.user;
  const joinCode = socket.request.session.joinCode;
  const poll = await Poll.findOne({ joinCode });
  if (!poll) {
    console.log();
  }
  if (user.role === "teacher" || user.role === "admin") {
    console.log("teacher log in...");
  }
  socket.on("join", (res) => {
    const { room } = res;
    res.socketId = socket.id;
    const alreadyJoined = users.find((user) => user.userId == res.userId);
    if (!alreadyJoined) {
      users.push(res);
    } else {
      socket.join(room);
    }
    studentsInRoom = users.filter((user) => user.room === res.room);
    socket.to(room).emit("join", studentsInRoom);
  });
}

module.exports = connect;
