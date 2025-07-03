const { Schema, model } = require("mongoose");

const schema = Schema({
	guildID: { type: String, default: "" },
    Member: [String],
	topStat: { type: Number, default: 0 },
	dailyStat: { type: Number, default: 0 },
	weeklyStat: { type: Number, default: 0 },
    Zaman: { type: Number, default: 0 },
});

module.exports = model("messageDay", schema);
