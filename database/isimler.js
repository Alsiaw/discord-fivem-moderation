const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    Sunucu: String,
    Oyuncu: String,

    İsimler: { type: Array , default: [] }
});

module.exports = mongoose.model("isimler", ticketSchema);