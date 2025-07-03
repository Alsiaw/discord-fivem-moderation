const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    Sunucu: { type: String, default: "" },
    Yetkili: { type: String, default: "" },
    YetkiliAD: { type: String, default: "" },


ToplamKayıt: { type: Number, default: 0 },
HWlOnay: { type: Number, default: 0 },
HWlRed: { type: Number, default: 0 },





});

module.exports = mongoose.model("haftalıkverix", ticketSchema);