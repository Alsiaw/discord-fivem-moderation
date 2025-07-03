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
	name: Events.VoiceStateUpdate,
	başlat: async( oldState, newState ) => {




        if (oldState.guild.id !== ayarlar.Bot.SunucuID) return

        let logs = await oldState.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberUpdate });
        let entry = logs.entries.first();
      
      
      
      
        const embeds = new EmbedBuilder()
        .setColor("#051b50")
        .setFooter({ text: `${moment(Date.now()).format("LLL")}`})
        
        const SesLOG = oldState.guild.channels.cache.get(ayarlar.LOG.sesLOG);
        if (!SesLOG) return;
        
        const sesExtraLOG = oldState.guild.channels.cache.get(ayarlar.LOG.sesExtraLOG);
        if (!sesExtraLOG) return;
        
        
        
        
        // if (!oldState.channel && newState.channel == "1122853672716607541") newState.member.roles.add("1122905361209376808")
        // if (oldState.channel && !newState.channel) newState.member.roles.remove("1122905361209376808")
        
        
        
        
        if (!oldState.channel && newState.channel) return SesLOG.send({ embeds: [embeds.setAuthor({name: `${newState.member.displayName} - GIRIS`, iconURL: newState.member.user.avatarURL({ dynamic: true })}).setDescription(` <:8676gasp:1327585524231176192> ・ \`ᴋᴜʟʟᴀɴɪᴄɪ:\` ${newState.member} - \`${newState.member.id}\` \n <:2124discordstagechannel:1327585187684417577> ・ \`ꜱᴇꜱ ᴋᴀɴᴀʟɪ:\` <#${newState.channel.id}>`)]}).catch(() => {});
        if (oldState.channel && !newState.channel) return SesLOG.send({ embeds: [embeds.setAuthor({name: `${newState.member.displayName} - CIKIS`, iconURL: newState.member.user.avatarURL({ dynamic: true })}).setDescription(` <:8676gasp:1327585524231176192> ・ \`ᴋᴜʟʟᴀɴɪᴄɪ:\` ${oldState.member} - \`${oldState.member.id}\` \n <:2124discordstagechannel:1327585187684417577> ・ \`ꜱᴇꜱ ᴋᴀɴᴀʟɪ:\` <#${oldState.channel.id}>`)] }).catch(() => {});
        if (oldState.channel && newState.channel && oldState.channel != newState.channel) return SesLOG.send({ embeds: [embeds.setAuthor({name: `${newState.member.displayName} - KANAL DEGISIKLIGI`, iconURL: newState.member.user.avatarURL({ dynamic: true })}).setDescription(`
        
        <:8676gasp:1327585524231176192> ・ \`ᴋᴜʟʟᴀɴɪᴄɪ:\` ${newState.member} - \`${newState.member.id}\`
        
        <:2124discordstagechannel:1327585187684417577> ・ \`ᴄɪᴋɪꜱ ʏᴀᴘɪʟᴀɴ ꜱᴇꜱ ᴋᴀɴᴀʟɪ:\` <#${oldState.channel.id}>
        <:2124discordstagechannel:1327585187684417577> ・ \`ɢɪʀɪꜱ ʏᴀᴘɪʟᴀɴ ꜱᴇꜱ ᴋᴀɴᴀʟɪ:\` <#${newState.channel.id}>`)] }).catch(() => {});
        if (oldState.channel.id && !oldState.streaming && newState.channel.id && newState.streaming) return sesExtraLOG.send({ embeds: [embeds.setDescription(`<:8676gasp:1327585524231176192> ・ ${newState.member} - \`${newState.member.id}\` *kullanıcısı* <#${newState.channel.id}> *adlı sesli kanalda yayın açtı!*`)] }).catch(() => {});
        if (oldState.channel.id && oldState.streaming && newState.channel.id && !newState.streaming) return sesExtraLOG.send({ embeds: [embeds.setDescription(`<:8676gasp:1327585524231176192> ・ ${newState.member} - \`${newState.member.id}\` *kullanıcısı* <#${newState.channel.id}> *adlı sesli kanalda yayını kapattı!*`)] }).catch(() => {});
        
        
        
        
        
        if (oldState.serverDeaf && !newState.serverDeaf) return sesExtraLOG.send({ embeds: [new EmbedBuilder().setColor("#051b50").setAuthor({ name:`${newState.member.displayName} - SAGIRLASTIRMASI KALDIRILDI`,iconURL: newState.member.user.avatarURL({dynamic:true})}).setFooter({ text: `${moment(Date.now()).format("LLL")}`}).setDescription(`
        
        <:8676gasp:1327585524231176192> ・ \`ᴋᴜʟʟᴀɴɪᴄɪ:\` ${newState.member} (\`${newState.member.id}\`)
        <:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` ${entry.executor} (\`${entry.executor.id}\`)
        <a:5961darkbluetea:1327585257578561548> ・ \`ꜱᴇꜱ ᴋᴀɴᴀʟɪ:\` <#${newState.channel.id}>`)]}).catch(() => {});
        
        
        if (!oldState.serverDeaf && newState.serverDeaf) return sesExtraLOG.send({ embeds: [new EmbedBuilder().setColor("#051b50").setAuthor({ name:`${newState.member.displayName} - SAGIRLARSTIRILDI`,iconURL: newState.member.user.avatarURL({dynamic:true})}).setFooter({ text: `${moment(Date.now()).format("LLL")}`}).setDescription(`
        
        <:8676gasp:1327585524231176192> ・  \`ᴋᴜʟʟᴀɴɪᴄɪ:\` ${newState.member} (\`${newState.member.id}\`)
        <:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` ${entry.executor} (\`${entry.executor.id}\`)
        <a:5961darkbluetea:1327585257578561548> ・ \`ꜱᴇꜱ ᴋᴀɴᴀʟɪ:\` <#${newState.channel.id}>`)]}).catch(() => {});
        
        
        
        
        
        
        if (oldState.serverMute && !newState.serverMute) return sesExtraLOG.send({ embeds: [new EmbedBuilder().setColor("#051b50").setAuthor({ name:`${newState.member.displayName} - SUSUTURULMASI KALDIRILDI`,iconURL: newState.member.user.avatarURL({dynamic:true})}).setFooter({ text: `${moment(Date.now()).format("LLL")}`}).setDescription(`
        
        <:8676gasp:1327585524231176192> ・  \`ᴋᴜʟʟᴀɴɪᴄɪ:\` ${newState.member} (\`${newState.member.id}\`)
        <:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` ${entry.executor} (\`${entry.executor.id}\`)
        <a:5961darkbluetea:1327585257578561548> ・ \`ꜱᴇꜱ ᴋᴀɴᴀʟɪ:\` <#${newState.channel.id}>`)]}).catch(() => {});
        
        
        if (!oldState.serverMute && newState.serverMute) return sesExtraLOG.send({ embeds: [new EmbedBuilder().setColor("#051b50").setAuthor({ name:`${newState.member.displayName} - SUSTURULDU`,iconURL: newState.member.user.avatarURL({dynamic:true})}).setFooter({ text: `${moment(Date.now()).format("LLL")}`}).setDescription(`
        
        <:8676gasp:1327585524231176192> ・  \`ᴋᴜʟʟᴀɴɪᴄɪ:\` ${newState.member} (\`${newState.member.id}\`)
        <:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` ${entry.executor} (\`${entry.executor.id}\`)
        <a:5961darkbluetea:1327585257578561548> ・ \`ꜱᴇꜱ ᴋᴀɴᴀʟɪ:\` <#${newState.channel.id}>`)]}).catch(() => {});







    }
}