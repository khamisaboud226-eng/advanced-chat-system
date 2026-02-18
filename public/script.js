const socket = io();

const messageContainer = document.getElementById("messages");
const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");

// Ask for a temporary name when they join
const username = prompt("Enter your name to join the chat:") || "Anonymous";

// Listen for incoming messages
socket.on("message", (data) => {
    const msgElement = document.createElement("div");
    msgElement.innerText = `${data.user}: ${data.text}`;
    messageContainer.appendChild(msgElement);
    messageContainer.scrollTop = messageContainer.scrollHeight; // Auto-scroll
});

// Send a message
chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = messageInput.value;

    // Send the message to the server
    socket.emit("sendMessage", { user: username, text: text });

    messageInput.value = ""; // Clear input
});
