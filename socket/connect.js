const Poll = require("../models/poll.model.js");
const Response = require("../models/response.model.js");
const Question = require("../models/question.model.js");

// room state objects identified by 4 character join code
const roomStateByJoinCode = new Map();

// holds current state of room
function createRoomState({ teacher }) {
  const studentsById = new Map();
  return Object.freeze({
    teacher,
    studentsById
  })
}

function createStudentState({ user, questions }) {
  const responses = [];
  return Object.freeze({ id: user._id, name: user.name.givenName, questions, responses, isConnected: true })
}

function connect(io, socket) {
  const { user } = socket;
  let roomName, studentState;

  socket.on("join", async (roomName, cb) => {
    let pollState, poll;
    // create room if doesn't already exist using poll data from db
    if (!rooms.has(roomName)) {
      poll = (await Poll.find({ joinCode: roomName }).populate('questions')).catch((e) => cb(e));
      if (!poll) return cb('poll not found')
      rooms.set(roomName, createRoomState(poll));
    } else {
      room = rooms.get(roomName);
    }

    if (!user._id === room.teacher._id) {
      // add user to students if not teacher
      socket.join(`${roomName}:students`);
      if (!room.studentsById.has(user._id)) {
        studentState = createStudentState({ user, questions: room.questions })
        room.studentsById.set(user._id, createStudentState(user));
        poll.students.push(user._id);
        (await poll.save()).catch((e) => cb(e));
      };
    } else {
      // teacher
      socket.join(`${roomName}:teacher`);
      io.to(`${roomName}:teacher`).emit(room.get(roomName));
      cb(null,)
    }
  });

  socket.on("disconnect", () => {
    if (roomName) {
      usersByRoomName.get(roomName).delete(user._id);
      usersById.delete(user._id);
      const names = getNames(roomName);
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
