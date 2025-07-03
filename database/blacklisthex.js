const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    // ID: { type: String, default: "" },
    Sunucu: { type: String, default: "" },
    Hexler: { type: Array, default: [] },
    // Yetkili: { type: String, default: "" },
    // Oyuncu: { type: String, default: "" },
    // Tarih: { type: String, default: "" },
    // Hex: { type: String, default: "" },
    // Sebep: { type: String, default: "" },





});

module.exports = mongoose.model("blacklisthex", ticketSchema);