const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    guildID: { type: String, default: "" },
    channelID: { type: String, default: "" },
    userID: { type: String, default: "" },
    messageContent: { type: String, default: "x" },
    image: { type: String, default: "" },
    createdDate: { type: Number, default: Date.now() },
    deletedDate: { type: Number, default: Date.now() }
});

module.exports = mongoose.model("snipe-channel", ticketSchema);