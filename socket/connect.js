// const Poll = require("./models/poll.model.js");
// const PollResult = require("./models/pollResult.model.js");
// const Question = require("./models/question.model.js");
const users = [];

function connect(socket) {
  console.log("User connected");
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
