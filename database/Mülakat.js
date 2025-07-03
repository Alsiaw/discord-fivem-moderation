const mongoose = require("mongoose");

const afk = new mongoose.Schema({
    Sunucu: { type: String, default: "" },
    ID: { type: Number, default: "" },


});

module.exports = mongoose.model("mülakatsal", afk);