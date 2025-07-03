const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    Sunucu: { type: String, default: "" },
    Giriş: { type: Number, default: 0 },
    Çıkış: { type: Number, default: 0 },
    Hex: { type: Number, default: 0 },
    Mesaj: { type: Number, default: 0 },
    Ses: { type: Number, default: 0 },
    Ban: { type: Number, default: 0 },
    Unban: { type: Number, default: 0 },
    PermAdd: { type: Number, default: 0 },
    PermRemove: { type: Number, default: 0 },
    İsim: { type: Number, default: 0 },
    Whitelist: { type: Number, default: 0 },
    Red: { type: Number, default: 0 },
    Ticket: { type: Number, default: 0 },
    Uyarı: { type: Number, default: 0 },
    WlCeza: { type: Number, default: 0 },

});

module.exports = mongoose.model("günlükveri", ticketSchema);