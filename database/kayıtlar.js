const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    Sunucu: { type: String, default: "" },
    Oyuncu: { type: String, default: "" },

    Kayıtlar: { type: Array , default: [] }

});

module.exports = mongoose.model("kayıtlar", ticketSchema);