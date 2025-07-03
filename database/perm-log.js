const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    guildID: { type: String, default: "" },
    user: { type: String, default: "" },
    rolx: { type: Array, default: [] },
    mod: { type: String, default: "" },
    tarih: { type: String, default: "" },
    state: { type: String, default: "" },
});

module.exports = mongoose.model("perm-log", ticketSchema);