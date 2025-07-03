const mongoose = require("mongoose");

const afk = new mongoose.Schema({
    guildID: String,
    userID: String,
    gerekli: { type: Number, default: 100 },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 0 }
});

module.exports = mongoose.model("level", afk);