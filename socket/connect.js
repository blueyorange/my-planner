const Poll = require("../models/poll.model.js");
// const PollResult = require("./models/pollResult.model.js");
// const Question = require("./models/question.model.js");
const students = [];

async function connect(socket) {
  const user = socket.request.session.passport.user;
  const joinCode = socket.request.session.joinCode;
  if (joinCode) {
    // only teacher has the joinCode in session
    socket.join(`${joinCode}:teacher`);
  }
  socket.on("join", (joinCode) => {
    socket.join(`${joinCode}:students`);
    user.room = joinCode;
    num = students.filter(student => student.room == joinCode)
    console.log(`${num} student(s) in room ${joinCode}`)
    io.to(`${joinCode}:teacher`).emit(students);
  });
}



module.exports = connect;
