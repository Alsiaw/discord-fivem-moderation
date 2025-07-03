const { EmbedBuilder, PermissionsBitField } = require("discord.js");

const snipe = require("../../../database/snipe-channel.js")
const ayarlar = require("../../../ayarlar.json")

const moment = require("moment")
moment.locale("tr")

module.exports = {
    name: "snipe",
    aliases: ["snipe"],
    cooldown: 2000,
    alsia: async (client, message, args) => {

 
 
 
        const data = await snipe.findOne({ guildID: message.guild.id, channelID: message.channel.id });
       
        
        const Warn = new EmbedBuilder()
        .setAuthor({ name: message.member.user.username , iconURL: message.member.user.avatarURL({dynamic: true})})
        .setColor("#490404")
        .setTimestamp()
        
        const roles = ayarlar.Yetkiler.Staff;
        if (!message.member.roles.cache.find(r => roles.includes(r.id))) return message.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")] , ephemeral: true })
        if (!data)  return message.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Bu kanalda hiç kimseye ait veri bulunamadı.*")] , ephemeral: true })




        const yazı = new EmbedBuilder()
        .setDescription(`<a:mesaj:1327600246619901962> ・ \`ᴍᴇꜱᴀᴊ ꜱᴀʜıʙı:\` <@${data.userID}> - (\`${data.userID}\`)
        <a:utility:1327600287367696515> ・ \`ᴍᴇꜱᴀᴊ ıᴄᴇʀıɢı: ${data.messageContent ? `${data.messageContent}` : ""}\`
        <a:5961darkbluetea:1327585257578561548> ・ \`ᴍᴇꜱᴀᴊıɴ ʏᴀᴢıʟᴍᴀ ᴛᴀʀɪʜɪ: ${moment.duration(Date.now() - data.createdDate).format("D [gün], H [saat], m [dakika], s [saniye]")} önce\`
        <a:animated_clock29:1327586135039410223> ・ \`ᴍᴇꜱᴀᴊıɴ ꜱɪʟɪɴᴍᴇ ᴛᴀʀɪʜɪ: ${moment.duration(Date.now() - data.deletedDate).format("D [gün], H [saat], m [dakika], s [saniye]")} önce\``)
          .setColor("#050505")
          .setThumbnail(message.member.user.avatarURL({dynamic:true})) 
          .setFooter({ text: `🌐 ${ayarlar.Embed.authorembed} ・ ${moment(Date.now()).format("LLL")}` })


await message.reply({ embeds: [yazı]}).catch(() => {});
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
    }
 };

