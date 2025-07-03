const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    Sunucu: { type: String, default: "" },
    Yetkili: { type: String, default: "" },
    YetkiliAD: { type: String, default: "" },


ToplamKayıt: { type: Number, default: 0 },

    WlCeza: { type: Number, default: 0 },
    Uyarı: { type: Number, default: 0 },
    İsim: { type: Number, default: 0 },
    PermVerme: { type: Number, default: 0 },
    PermAlma: { type: Number, default: 0 },
  WlOnay: { type: Number, default: 0 },
  WlRed: { type: Number, default: 0 },
  Ban: { type: Number, default: 0 },
  Unban: { type: Number, default: 0 },
   Ticket: { type: Number, default: 0 },
   Hex: { type: Number, default: 0 },


  GWlCeza: { type: Number, default: 0 },
  GUyarı: { type: Number, default: 0 },
  Gİsim: { type: Number, default: 0 },
  GPermVerme: { type: Number, default: 0 },
  GPermAlma: { type: Number, default: 0 },
GWlOnay: { type: Number, default: 0 },
GWlRed: { type: Number, default: 0 },
GBan: { type: Number, default: 0 },
GUnban: { type: Number, default: 0 },
GTicket: { type: Number, default: 0 },
GHex: { type: Number, default: 0 },



HWlCeza: { type: Number, default: 0 },
HUyarı: { type: Number, default: 0 },
Hİsim: { type: Number, default: 0 },
HPermVerme: { type: Number, default: 0 },
HPermAlma: { type: Number, default: 0 },
HWlOnay: { type: Number, default: 0 },
HWlRed: { type: Number, default: 0 },
HBan: { type: Number, default: 0 },
HUnban: { type: Number, default: 0 },
HTicket: { type: Number, default: 0 },
HHex: { type: Number, default: 0 },





});

module.exports = mongoose.model("yetkiliveri", ticketSchema);