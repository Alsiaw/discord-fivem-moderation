const { Collection, Events ,PermissionFlagsBits, EmbedBuilder,  AuditLogEvent} = require("discord.js")
const ayarlar = require("../../ayarlar.json");
const ms = require("ms")
const cooldown = new Collection()


const moment = require("moment")
moment.locale("tr")
require("moment-duration-format");

const GunlukDB = require("../../database/gunluk-veri")
const ReklamDB = require("../../database/reklam.js")
const HexDB = require("../../database/blacklisthex")

module.exports = {
	name: Events.MessageCreate,
	başlat: async(message) => {









    if (message.channel.id !== ayarlar.BlacklistHex.HexKontrolOda) return;
 

    const docs = await HexDB.findOne({Sunucu: message.guild.id});
    const hexler = docs.Hexler.sort((a, b) => b.Tarih - a.Tarih)
    const liste = hexler.map((x , index) => `${x.Hex}`)
    
    
    
    
    
    
    
    
        const blacklistliste = liste
        if(blacklistliste.some(alsia => message.content.includes(alsia))) {
    
    
    const uyarı = new EmbedBuilder()
    .setColor("#120f3f")
    .setFooter({ text: `Ⓜ️ ${moment(Date.now()).format("LLL")}`})
    .setDescription(`<a:5961darkbluetea:1327585257578561548> ・ ${message.member} *isimli oyuncu blacklist hex paylaştı hex:* \`steam:${message.content}\``)
    // .setTimestamp()
    .setAuthor({ name: message.member.displayName, iconURL: message.guild.iconURL({ dynamic: true  }) })
    
    
    await client.channels.cache.get(ayarlar.BlacklistHex.BlacklistHexUyarı).send({ embeds: [uyarı] , content: `||<@&${ayarlar.Permler.Yetkili}>||` })
    
    
    
    
    
    
    
    
    
         
    
    
    
    
      }


























    }
}