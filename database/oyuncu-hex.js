const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    Sunucu: { type: String, default: "" },
    Oyuncu: { type: String, default: "" },

    Hex: { type: String , default: "" }

});

module.exports = mongoose.model("hex", ticketSchema);