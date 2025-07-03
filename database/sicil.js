const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    Sunucu: { type: String, default: "" },
    Sicil: { type: Array, default: [] },
    Oyuncu: { type: String, default: "" },




});

module.exports = mongoose.model("sicil", ticketSchema);