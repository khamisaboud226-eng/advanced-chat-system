const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    text: String,
    voice: String,
    status: { type: String, default: "sent" },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Message", messageSchema);
