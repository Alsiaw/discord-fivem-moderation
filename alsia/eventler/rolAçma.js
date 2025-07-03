const { Collection, Events , EmbedBuilder,  AuditLogEvent} = require("discord.js")
const ayarlar = require("../../ayarlar.json");
const ms = require("ms")
const cooldown = new Collection()
const canvafy = require("canvafy")
const moment = require("moment")
moment.locale("tr")
require("moment-duration-format");


module.exports = {
	name: Events.GuildRoleCreate,
	başlat: async(role) => {




        if (role.guild.id !== ayarlar.Bot.SunucuID) return

        const fetchedLogs = await role.guild.fetchAuditLogs({
          limit: 1,
          type: AuditLogEvent.RoleCreate,
        });
      
        const rolLOG = role.guild.channels.cache.get(ayarlar.LOG.ArolLOG);
        if (!rolLOG) return;
      
        const rollog = fetchedLogs.entries.first();
        if (!rollog) return;
      
      
      
        const { executor, target } = rollog;
      
      
        const embed = new EmbedBuilder()
        .setAuthor({
          name: `${executor.username} - ROL ACILDI`,
          iconURL: executor.avatarURL({ dynamic: true })
      })
      .setThumbnail(executor.avatarURL({dynamic:true})) 
        .setDescription(`<a:unlemsel:1327600285597569066> ・ *Bir yetkili tarafından* | \`${role.name} | ${role.id}\` | *isimli rol*  *oluşturuldu.* 
        
        <:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` | ${executor} | 
        <a:5961darkbluetea:1327585257578561548> ・ \`ᴀᴄıʟᴀɴ ʀᴏʟ:\` | ${role} |`)
        .setColor("#12073d")
        .setFooter({ text: moment(Date.now()).format("LLL") })
      
      
        role.guild.channels.cache.get(ayarlar.LOG.ArolLOG).send({ embeds: [embed] })
      
      
      
      
      
      
      








    }
}