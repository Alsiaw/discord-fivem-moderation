const { Collection, Events , EmbedBuilder,  AuditLogEvent} = require("discord.js")
const ayarlar = require("../../ayarlar.json");
const ms = require("ms")
const cooldown = new Collection()
const moment = require("moment")
moment.locale("tr")
require("moment-duration-format");


module.exports = {
	name: Events.GuildMemberRemove,
	başlat: async(member) => {







        if (member.guild.id !== ayarlar.Bot.SunucuID) return



        const logs = await member.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberKick });
        const entry = logs.entries.first();
      

        const kickLOG = member.guild.channels.cache.get(ayarlar.LOG.kickLOG);
        if (!kickLOG) return;


        
        const { executor, target , reason } = entry;



        const entryx = await member.guild
        .fetchAuditLogs()
        .then(audit => audit.entries.first());
      if (entryx.action == `MEMBER_KICK`) {
    if(!entryx || !entryx.executor || Date.now()-entryx.createdTimestamp > 10000) return;


        const kafakesecem = new EmbedBuilder()
        .setThumbnail(member.user.avatarURL({dynamic:true}))
        .setColor('#051b50')
        .setAuthor({name:`${member.user.username} - SUNUCUDAN ATILDI`, iconURL: member.user.avatarURL({dynamic: true})})
        .setDescription(`<a:tehlikesel:1327600281029967953> ・ *Bir yetkili tarafından bir kullanıcı sunucudan başarılı bir şekilde atıldı.*
       
        <:8676gasp:1327585524231176192> ・ \`ʏᴇᴛᴋıʟı:\` ${executor}
        <a:devil:1327600214617362463> ・ \`ᴋıᴄᴋ ᴀᴛıʟᴀɴ:\` ${member}
        <a:5961darkbluetea:1327585257578561548> ・ \`ꜱᴇʙᴇᴘ: ${reason}\`
        <a:animated_clock29:1327586135039410223> ・ \`ᴛᴀʀɪʜ: ${moment(Date.now()).format("LLL")}\`
      
        \`🌐 ${ayarlar.Embed.authorembed}\`
        `)  


        return member.guild.channels.cache.get(ayarlar.LOG.kickLOG).send({embeds: [kafakesecem]}).catch(() => {});   




      }























    }
}