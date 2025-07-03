const { Collection, Events ,PermissionFlagsBits, EmbedBuilder,  AuditLogEvent} = require("discord.js")
const ayarlar = require("../../ayarlar.json");
const ms = require("ms")
const cooldown = new Collection()


const moment = require("moment")
moment.locale("tr")
require("moment-duration-format");


const afk = require("../../database/afk")

module.exports = {
	name: Events.MessageCreate,
	başlat: async(message) => {













  const data = await afk.findOne({ guildID: message.guild.id, userID: message.member.id });

  if (data) {
  
  if (message.author.bot) return;
  
  
    const afkData = await afk.findOne({ guildID: message.guild.id, userID: message.member.id });
    await afk.deleteOne({ guildID: message.guild.id, userID: message.author.id });
    if (message.member.displayName.includes("[AFK]") && message.member.manageable) await message.member.setNickname(message.member.displayName.replace("[AFK]", ""));
    
  const afkexit = new EmbedBuilder()
  .setColor('#041f49')
  .setFooter({ text: `🌐 ${ayarlar.Embed.authorembed} ・ ${moment(Date.now()).format("LLL")}` })
  .setDescription(`<a:mesaj:1327600246619901962> ・ ${message.member}, \`${afkData.reason}\` *sebebiyle, girdiğiniz afk modundan çıktınız* \`${moment.duration(Date.now() - afkData.date).format("d [gün] H [saat], m [dakika] s [saniye]")}\` *süredir afk modunda idiniz.*`)
  .setAuthor({
  name: `${message.member.displayName}`, 
  iconURL: message.member.user.avatarURL({dynamic: true})})
  message.reply({embeds: [afkexit]}).then((e) => setTimeout(() => { e.delete().catch(() => {}); }, 10000)); 
  
    // message.reply({ content:`Afk modundan çıktınız. **${moment.duration(Date.now() - afkData.date).format("d [gün] H [saat], m [dakika] s [saniye]")}** süredir AFK'ydınız.`})
  }
  
  const member = message.mentions.members.first();
  if (!member) return;
  const afkData = await afk.findOne({ guildID: message.guild.id, userID: member.user.id });
  if (!afkData) return;
  
  
  const embeds = new EmbedBuilder()
        .setColor('#041f49')
        .setFooter({ text: `🌐 ${ayarlar.Embed.authorembed} ・ ${moment(Date.now()).format("LLL")}` })
        .setDescription(`<a:mesaj:1327600246619901962> ・ ${member.toString()} *kullanıcısı,* \`${afkData.reason}\` *sebebi ile* **${moment.duration(Date.now() - afkData.date).format("d [gün] H [saat], m [dakika] s [saniye]")}** *önce afk oldu!*`)
        .setAuthor({
          name: `${message.member.displayName}`, 
          iconURL: message.member.user.avatarURL({dynamic: true})})
       
          message.channel.send({ embeds: [embeds]}).then((e) => setTimeout(() => { e.delete().catch(() => {}); }, 10000)); 
  
  
  
























    }
}