const { Schema, model } = require("mongoose");

const schema = Schema({
	guildID: String,
	userID: String,
	channelID: String,
	channelData: { type: Number, default: 0 },
	GchannelData: { type: Number, default: 0 },
	HchannelData: { type: Number, default: 0 }

});

module.exports = model("messageUserChannel", schema);
