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
	name: Events.GuildBanRemove,
	başlat: async(ban) => {



        if (ban.guild.id !== ayarlar.Bot.SunucuID) return


        const logs = await ban.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberBanRemove });
        const entry = logs.entries.first();
      
      
        const BanLOG = ban.guild.channels.cache.get(ayarlar.LOG.banLOG);
        if (!BanLOG) return;
        const { executor, target } = entry;
      
      
        const Gralalsia = new EmbedBuilder()
        .setThumbnail(ban.user.avatarURL({dynamic:true}))
        .setColor('#051b50')
        .setAuthor({name:`${ban.user.username} - YASAK KALDIRILDI`, iconURL: ban.user.avatarURL({dynamic: true})})
        .setDescription(`<a:tehlikesel:1327600281029967953> ・ *Bir yetkili tarafından bir kullanıcının sunucuda olan yasaklanmasını başarılı bir şekilde kaldırdı.*
       
        <:8676gasp:1327585524231176192> ・ \`ʏᴀꜱᴀɢı ᴋᴀʟᴅıʀıʟᴀɴ::\` ${ban.user}
        <a:devil:1327600214617362463> ・ \`ʏᴀꜱᴀɢı ᴋᴀʟᴅıʀᴀɴ:\` ${executor}
        <a:animated_clock29:1327586135039410223> ・ \`ᴛᴀʀɪʜ: ${moment(Date.now()).format("LLL")}\`
      
        \`🌐 ${ayarlar.Embed.authorembed}\`
        `)  
      
      
        await GunlukDB.updateOne(
                { Sunucu: ban.guild.id
                },
                {
                  $inc: {
                    Unban: 1       
                  }
                },
                { upsert: true }
              );
      
  
      
      return ban.guild.channels.cache.get(ayarlar.LOG.unbanLOG).send({embeds: [Gralalsia]}).catch(() => {});   
      







    }
}