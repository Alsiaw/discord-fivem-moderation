const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    Sunucu: { type: String, default: "" },
    ID: { type: String, default: "" },

    Yetkili: { type: String, default: "" },
    Oyuncu: { type: String, default: "" },
    Sebep: { type: String, default: "" },
    SebepX: { type: String, default: "" },
    Olay: { type: String, default: "" },
    Tarih: { type: String, default: "" },
    Yazı: { type: String, default: "" },

YetkiliAD: { type: String, default: "" },
OyuncuAD: { type: String, default: "" }


});

module.exports = mongoose.model("etiketveri", ticketSchema);