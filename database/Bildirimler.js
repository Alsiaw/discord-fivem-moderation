const mongoose = require("mongoose");

const afk = new mongoose.Schema({
    Sunucu: { type: String, default: "" },
    LegalPerm: { type: Number, default: "0" },
    İçerik: { type: Number, default: "0" },
    WeazelNews: { type: Number, default: "0" },
    Yenilikler: { type: Number, default: "0" },
    AktifBakım: { type: Number, default: "0" },
    Etkinlik: { type: Number, default: "0" },



});

module.exports = mongoose.model("bildirimler", afk);