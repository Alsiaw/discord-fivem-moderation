const { EmbedBuilder, PermissionsBitField } = require("discord.js");

const HaftalıkDB = require("../../../database/haftalık-veri")
const ayarlar = require("../../../ayarlar.json")

const moment = require("moment")
moment.locale("tr")

module.exports = {
    name: "haftalık-sil",
    aliases: ["haftalık-veri-sil"],
    cooldown: 2000,
    alsia: async (client, message, args) => {

 
 
 
       
        
        const Warn = new EmbedBuilder()
        .setAuthor({ name: message.member.user.username , iconURL: message.member.user.avatarURL({dynamic: true})})
        .setColor("#490404")
        .setTimestamp()
        

        if (message.member.id !== "278152550627409921" || message.member.id !== "278152550627409921") return message.reply({ embeds: [Warn.setDescription("Bu komutu kullanmaya yetkin yetmiyor!")]})



        const yazı = new EmbedBuilder()
        .setDescription(`<a:utility:1327600287367696515> ・ Başarılı bir şekilde haftalık kayıt verileri sıfırlandı.
`)
          .setColor("#050505")
          .setThumbnail(message.member.user.avatarURL({dynamic:true})) 
          .setFooter({ text: `🌐 ${ayarlar.Embed.authorembed} ・ ${moment(Date.now()).format("LLL")}` })


await message.reply({ embeds: [yazı]}).catch(() => {});
 
 
await HaftalıkDB.deleteMany({ Sunucu: message.guild.id})
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
    }
 };

