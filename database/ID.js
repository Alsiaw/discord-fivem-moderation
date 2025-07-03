const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    SunucuID: { type: String, default: "" },
    ID: { type: Number, default: 0 }

});

module.exports = mongoose.model("ID", ticketSchema);