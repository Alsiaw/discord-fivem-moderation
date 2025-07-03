const { Collection, Events , EmbedBuilder,  AuditLogEvent} = require("discord.js")
const ayarlar = require("../../ayarlar.json");
const ms = require("ms")
const cooldown = new Collection()




const canvafy = require("canvafy")
const moment = require("moment")
moment.locale("tr")
require("moment-duration-format");

const afk = require("../../database/afk")






module.exports = {
	name: Events.VoiceStateUpdate,
	başlat: async( oldState, newState ) => {




     



  if (oldState.member.bot || !oldState.guild) return;

  const data = await afk.findOne({ guildID: oldState.guild.id, userID: oldState.member.id });
  if (data) {


    await afk.deleteOne({ guildID: oldState.guild.id, userID: oldState.member.id });
    if (oldState.member.displayName.includes("[AFK]") && oldState.member.manageable) await oldState.member.setNickname(oldState.member.displayName.replace("[AFK]", ""));


    const embed = new EmbedBuilder()
    .setColor('#041f49')
    .setFooter({ text: `🌐 ${ayarlar.Embed.authorembed} ・ ${moment(Date.now()).format("LLL")}` })
    .setDescription(`<a:mesaj:1327600246619901962> ・ ${oldState.member} *Ses kanalında hareketlilik sağladığınız için* ***afk*** *modundan çıkış sağladınız.*`)
    .setAuthor({
      name: `${oldState.member.displayName}`, 
      iconURL: oldState.member.user.avatarURL({dynamic: true})})


await oldState.member.send({ embeds: [embed] }).catch(() => {});





    }



















    }
}