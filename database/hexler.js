const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    Sunucu: { type: String, default: "" },
    Hex: { type: String, default: "" },

    Oyuncular: { type: Array , default: [] }

});

module.exports = mongoose.model("oyuncuhex", ticketSchema);