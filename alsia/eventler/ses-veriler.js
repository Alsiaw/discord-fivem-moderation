const { Collection, Events , EmbedBuilder,  AuditLogEvent} = require("discord.js")
const ayarlar = require("../../ayarlar.json");
const ms = require("ms")
const cooldown = new Collection()




const canvafy = require("canvafy")
const moment = require("moment")
moment.locale("tr")
require("moment-duration-format");

const GunlukDB = require("../../database/gunluk-veri")


const voiceUser = require("../../database/voiceUser.js");
const voiceGuild = require("../../database/voiceGuild.js");

const joinedAt = require("../../database/voiceJoinedAt");
const guildChannel = require("../../database/voiceGuildChannel");
const userChannel = require("../../database/voiceUserChannel");
const voiceInfo = require("../../database/voiceInfo")

module.exports = {
	name: Events.VoiceStateUpdate,
	başlat: async( oldState, newState ) => {




     







  if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;

  if (!oldState.channelId && newState.channelId) await joinedAt.findOneAndUpdate({ userID: newState.id }, { $set: { date: Date.now() } }, { upsert: true }).catch(() => {});

  let joinedAtData = await joinedAt.findOne({ userID: oldState.id });

  if (!joinedAtData) await joinedAt.findOneAndUpdate({ userID: oldState.id }, { $set: { date: Date.now() } }, { upsert: true }).catch(() => {});
  joinedAtData = await joinedAt.findOne({ userID: oldState.id })
  const data = Date.now() - (joinedAtData.date || 0);

  if (oldState.channelId && !newState.channelId) {
    await saveDatas(oldState, oldState.channel, data).catch(() => {});
    await joinedAt.deleteOne({ userID: oldState.id }).catch(() => {});
  } else if (oldState.channelId && newState.channelId) {
    await saveDatas(oldState, oldState.channel, data).catch(() => {});
    await joinedAt.findOneAndUpdate({ userID: oldState.id }, { $set: { date: Date.now() } }, { upsert: true }).catch(() => {});
  }


  async function saveDatas(user, channel, data) {
  await voiceUser.findOneAndUpdate({ guildID: user.guild.id, userID: user.id }, { $inc: { topStat: data, dailyStat: data, weeklyStat: data, twoWeeklyStat: data } }, { upsert: true }).catch(() => {});
  await voiceGuild.findOneAndUpdate({ guildID: user.guild.id }, { $inc: { topStat: data, dailyStat: data, weeklyStat: data, twoWeeklyStat: data } }, { upsert: true }).catch(() => {});
  await guildChannel.findOneAndUpdate({ guildID: user.guild.id, channelID: oldState.channel.id }, { $inc: { channelData: data } }, { upsert: true }).catch(() => {});
  await userChannel.findOneAndUpdate({ guildID: user.guild.id, userID: user.id, channelID: channel.id }, { $inc: { channelData: data } }, { upsert: true }).catch(() => {});




  await GunlukDB.findOneAndUpdate(
      { Sunucu: oldState.guild.id
      },
      {
        $inc: {
          Ses: data       
        }
      },
      { upsert: true }
    );





  if (!oldState.channelId && newState.channelId) await voiceInfo.findOneAndUpdate({ userID: newState.id }, { $set: { date: Date.now() } }, { upsert: true }).catch(() => {});
  else if (oldState.channelId && !newState.channelId) await voiceInfo.deleteOne({ userID: oldState.id }).catch(() => {});

  }
































    }
}