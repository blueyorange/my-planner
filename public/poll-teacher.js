const socket = io();
const joinCode = window.location.href.split("/").pop();
socket.emit("join", joinCode, (err) => {
  console.log(err);
});
socket.on("names", (names) => {
  console.log(names);
  console.log(`${names.length} in room`);
  document.querySelector("#join-status").innerHTML = `${names.length} in room`;
  document.querySelector("#student-list").innerHTML = names
    .map((name) => `<span class="badge rounded-pill bg-primary">${name}</span>`)
    .reduce((acc, curr) => (acc += curr), []);
});
