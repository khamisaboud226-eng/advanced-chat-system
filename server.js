const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const crypto = require("crypto");
const Message = require("./models/Messages");

mongoose.connect("MONGO_URI=mongodb+srv://khamisaboud226_db_user:ChatApp2026@cluster0.6n5tsrj.mongodb.net/advanced-chat-sysrem");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use("/auth", require("./models/routes/auth"));
app.use(express.static("public"));

io.on("connection", (socket) => {

    socket.on("join-room", (room) => {
        socket.join(room);
    });

    socket.on("typing", (room, user) => {
        socket.to(room).emit("typing", user);
    });

    socket.on("private-message", async (data) => {

        const encrypted = crypto.createHash("sha256")
            .update(data.text)
            .digest("hex");

        const message = new Message({
            sender: data.sender,
            receiver: data.receiver,
            text: encrypted
        });

        await message.save();

        io.to(data.room).emit("private-message", {
            ...data,
            status: "delivered"
        });
    });

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Advanced chat running on port ${PORT}`);
});
// Version 1.1 sync