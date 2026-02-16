input.addEventListener("input", () => {
    socket.emit("typing", currentRoom, username);
});

socket.on("typing", (user) => {
    typingDiv.innerText = `${user} is typing...`;
    setTimeout(() => typingDiv.innerText = "", 2000);
});
let recorder;
navigator.mediaDevices.getUserMedia({ audio: true })
.then(stream => {
    recorder = new MediaRecorder(stream);
});
