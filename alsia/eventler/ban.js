const { Collection, Events , EmbedBuilder,  AuditLogEvent} = require("discord.js")
const ayarlar = require("../../ayarlar.json");
const ms = require("ms")
const cooldown = new Collection()


const moment = require("moment")
moment.locale("tr")
require("moment-duration-format");

const GunlukDB = require("../../database/gunluk-veri")

module.exports = {
	name: Events.GuildBanAdd,
	başlat: async(ban) => {




        if (ban.guild.id !== ayarlar.Bot.SunucuID) return

        const logs = await ban.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberBanAdd });
        const entry = logs.entries.first();
      
      
        const BanLOG = ban.guild.channels.cache.get(ayarlar.LOG.banLOG);
        if (!BanLOG) return;
        const { executor, target } = entry;
      
      
      
        ban.guild.bans.fetch(ban.user).then( async ({ reason }) => {
      
      
      
      
            const kafakesecem = new EmbedBuilder()
            .setThumbnail(ban.user.avatarURL({dynamic:true}))
            .setColor('#051b50')
            .setAuthor({name:`${ban.user.username} - YASAKLANDI`, iconURL: ban.user.avatarURL({dynamic: true})})
            .setDescription(`<a:tehlikesel:1327600281029967953> ・ *Bir yetkili tarafından bir kullanıcı sunucudan başarılı bir şekilde yasaklandı.*
           
            <a:utility:1327600287367696515>・ \`ʏᴀꜱᴀᴋʟᴀɴᴀɴ:\` ${ban.user}
            <:8676gasp:1327585524231176192> ・ \`ʏᴀꜱᴀᴋʟᴀʏᴀɴ\` ${executor}
            <a:5961darkbluetea:1327585257578561548> ・ \`ꜱᴇʙᴇᴘ: ${reason || "Belirtilmemiş"}\`
          
            \`🌐 ${moment(Date.now()).format("LLL")}\`
            `)  
           
           
            await GunlukDB.updateOne(
                          { Sunucu: ban.guild.id
                          },
                          {
                            $inc: {
                              Ban: 1       
                            }
                          },
                          { upsert: true }
                        );
        
            return ban.guild.channels.cache.get(ayarlar.LOG.banLOG).send({embeds: [kafakesecem]}).catch(() => {});   
      
      
      
      
      
      
      
        }).catch(() => {});
      































    }
}