const Poll = require("../models/poll.model.js");
// const PollResult = require("./models/pollResult.model.js");
// const Question = require("./models/question.model.js");
let students = [];

async function connect(socket) {
  const user = socket.request.session.passport.user;
  socket.on("join", (joinCode) => {
    socket.room = joinCode;
    const alreadyJoined = students.some((student) => student.id == user._id);
    if (!alreadyJoined) {
      if (user.role === "student") {
        socket.join(`${joinCode}:students`);
        console.log(user.name.givenName);
        students.push({
          id: user._id,
          name: user.name.givenName,
          room: joinCode,
        });
        studentsInRoom = students.filter((student) => student.room == joinCode);
        console.log(`${students.length} student(s) in room ${joinCode}`);
        console.log(students);
        socket.to(`${joinCode}:teacher`).emit("students", studentsInRoom);
      } else {
        console.log("teacher joined");
        socket.join(`${joinCode}:teacher`);
      }
    }
  });
  socket.on("disconnect", () => {
    console.log("disconnecting...");
    console.log(students);
    students = students.filter((curr) => !curr.id === user._id);
    console.log(students);
    studentsInRoom = students.filter((student) => student.room === user.room);
    console.log(socket.room);
    socket.to(`${socket.room}:teacher`).emit("students", studentsInRoom);
  });
}

module.exports = connect;
