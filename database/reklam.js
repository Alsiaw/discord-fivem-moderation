const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    SunucuID: { type: String, default: "" },
    KanalID: { type: Array, default: [] },
    Sistem: { type: Boolean, default: false }
});

module.exports = mongoose.model("reklam", ticketSchema);