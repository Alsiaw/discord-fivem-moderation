const { Collection, Events , EmbedBuilder,  AuditLogEvent} = require("discord.js")
const ayarlar = require("../../ayarlar.json");
const ms = require("ms")
const cooldown = new Collection()
const canvafy = require("canvafy")


const moment = require("moment")
moment.locale("tr")
require("moment-duration-format");

const GunlukDB = require("../../database/gunluk-veri")

module.exports = {
	name: Events.ChannelCreate,
	başlat: async(channel) => {



      
        if (channel.guild.id !== ayarlar.Bot.SunucuID) return

        const fetchedLogs = await channel.guild.fetchAuditLogs({
          limit: 1,
          type: AuditLogEvent.ChannelCreate,
        });
      
        const kanalLOG = channel.guild.channels.cache.get(ayarlar.LOG.AkanalLOG);
        if (!kanalLOG) return;
      
        const kanallog = fetchedLogs.entries.first();
        if (!kanallog) return;
      
      
      
        const { executor, target } = kanallog;
      
        let tür = {2: "Ses Kanalı",0: "Metin Kanalı",5: "Duyuru Kanalı",4: "Kategori",13:"Sahne",15:"Forum"}
      
      
        const embed = new EmbedBuilder()
        .setAuthor({
          name: executor.username,
          iconURL: executor.avatarURL({ dynamic: true })
      })
      .setThumbnail(executor.avatarURL({dynamic:true})) 
        .setDescription(`<a:unlemsel:1327600285597569066> ・ *Bir yetkili tarafından* | \`${channel.name} | ${channel.id}\` | *isimli kanal oluşturuldu.* 
        
        <:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` ${executor}
        <a:5961darkbluetea:1327585257578561548> ・ \`ᴋᴀɴᴀʟ:\` ${channel}
        
        <:5013bughunterpurple:1327585254751469629> ・ \`ᴋᴀɴᴀʟ ᴛᴜʀᴜ: ${tür[channel.type]}\``)
        .setColor("#12073d")
        .setFooter({ text: moment(Date.now()).format("LLL") })
      
      
        channel.guild.channels.cache.get(ayarlar.LOG.AkanalLOG).send({ embeds: [embed] })
      
      








    }
}