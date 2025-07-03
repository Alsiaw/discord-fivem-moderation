const { Collection, Events , EmbedBuilder,  AuditLogEvent} = require("discord.js")
const ayarlar = require("../../ayarlar.json");
const ms = require("ms")
const cooldown = new Collection()
const canvafy = require("canvafy")
const moment = require("moment")
moment.locale("tr")
require("moment-duration-format");

const GunlukDB = require("../../database/gunluk-veri")
const snipek = require("../../database/snipe-channel.js");
const snipe = require("../../database/snipe-user.js");


module.exports = {
	name: Events.MessageDelete,
	başlat: async(message) => {




        if (message.guild.id !== ayarlar.Bot.SunucuID) return



        let logs = await message.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MessageDelete });
        let entry = logs.entries.first();
      
      
        const MesajLOG = message.guild.channels.cache.get(ayarlar.LOG.mesajLOG);
        if (!MesajLOG) return;
      
      
        const Embed = new EmbedBuilder().setColor('#051b50');
      
      
        var messageHadAttachment = message.attachments.map(x => x.proxyURL)[0]
        if (messageHadAttachment) {
      
      
         await snipe.findOneAndUpdate({ guildID: message.guild.id, channelID: (message.channelId || "1366784147875434628") }, { $set: { messageContent: message.content, userID: message.author.id, image: null, createdDate: message.createdTimestamp, deletedDate: Date.now() } }, { upsert: true });
          await snipek.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $set: { messageContent: message.content, channelID:(message.channelId || "1366784147875434628"), image: null, createdDate: message.createdTimestamp, deletedDate: Date.now() } }, { upsert: true });
      
          MesajLOG.send({embeds:[Embed.setAuthor({name:`${message.author.username} - DOSYA SILINDI`,iconURL:message.guild.iconURL({dynamic:true})}).setThumbnail(message.author.avatarURL({dynamic:true})).setFooter({ text: moment(Date.now()).format("LLL") }).setDescription(`<a:unlemsel:1327600285597569066> ・ *Bir yetkili veya kullanıcı tarafından* | \`${message.channel.name}\` | *isimli kanalda* *mesaj silindi!* \n \n <:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` | ${entry.executor} | \n  <a:5961darkbluetea:1327585257578561548> ・ \`ᴍᴇꜱᴀᴊ ꜱᴀʜıʙı:\` | ${message.member} |  \n\n ***Silinen Dosya:*** \n \`\`\`fix\n${message.attachments.map(x => x.proxyURL)}\`\`\` `)]}).catch(() => {});
      
      
        } else {
      
         await snipe.findOneAndUpdate({ guildID: message.guild.id, channelID:(message.channelId || "1366784147875434628") }, { $set: { messageContent: message.content, userID: message.author.id, image: null, createdDate: message.createdTimestamp, deletedDate: Date.now() } }, { upsert: true });
          await snipek.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $set: { messageContent: message.content, channelID: (message.channelId || "1366784147875434628"), image: null, createdDate: message.createdTimestamp, deletedDate: Date.now() } }, { upsert: true });
      
          MesajLOG.send({embeds:[Embed.setAuthor({name:`${message.author.username} - MESAJ SILINDI`,iconURL:message.guild.iconURL({dynamic:true})}).setThumbnail(message.author.avatarURL({dynamic:true})).setFooter({ text: moment(Date.now()).format("LLL") }).setDescription(`<a:unlemsel:1327600285597569066> ・ *Bir yetkili veya kullanıcı tarafından* | \`${message.channel.name}\` | *isimli kanalda* *mesaj silindi!* \n \n <:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` | ${entry.executor} | \n  <a:5961darkbluetea:1327585257578561548> ・ \`ᴍᴇꜱᴀᴊ ꜱᴀʜıʙı:\` | ${message.member} |  \n\n ***Silinen Mesaj:*** \n \`\`\`fix\n${message.content.replace(/`/g, "'")}\`\`\` `)]}).catch(() => {});
      
      
      
        }
      
      
        if (!message.attachments.first()) return false
      
          // await snipe.findOneAndUpdate({ guildID: message.guild.id, channelID: message.channel.id }, { $set: { messageContent: null, userID: message.author.id, image: message.attachments.first().proxyURL, createdDate: message.createdTimestamp, deletedDate: Date.now() } }, { upsert: true });
      
         MesajLOG.send({embeds:[Embed.setImage(message.attachments.first().proxyURL).setAuthor({name:`${message.author.username} - RESIM SILINDI`,iconURL:message.member.avatarURL({dynamic:true})}).setFooter({ text: moment(Date.now()).format("LLL") }).setDescription(`<:claim:1327586348244140082> ・ *Bir yetkili veya kullanıcı tarafından* | \`${message.channel.name}\` | *isimli kanalda* *mesaj silindi!* \n \n <:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` | ${entry.executor} | \n  <a:5961darkbluetea:1327585257578561548> ・ \`ᴍᴇꜱᴀᴊ ꜱᴀʜıʙı:\` | ${message.member} |  \n\n ***Silinen Resim:*** \n \`\`\`${message.content.replace(/`/g, "'")}\`\`\` `)]}).catch(() => {});
      
      








    }
}