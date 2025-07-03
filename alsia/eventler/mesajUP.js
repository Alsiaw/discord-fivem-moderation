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
	name: Events.MessageUpdate,
	başlat: async(oldMessage , newMessage) => {




  if(oldMessage.content == newMessage.content) return;

        if (oldMessage.guild.id !== ayarlar.Bot.SunucuID) return
const member = oldMessage.guild.members.cache.get(oldMessage.member.id)


        const MesajLOG = oldMessage.guild.channels.cache.get(ayarlar.LOG.mesajLOG);
        if (!MesajLOG) return;

        const Embed = new EmbedBuilder().setColor('#051b50').setThumbnail(member.user.avatarURL({dynamic:true}));

        MesajLOG.send({embeds:[Embed.setAuthor({name:`${oldMessage.author.username} - MESAJ GUNCELLENDI`,iconURL: member.user.avatarURL({dynamic:true})}).setFooter({ text: moment(Date.now()).format("LLL") }).setDescription(`<:claim:1327586348244140082> ・ *Bir kullanıcı* | \`${oldMessage.channel.name}\` | *isimli kanalda kendi* *mesajını güncelledi!* \n \n <a:5961darkbluetea:1327585257578561548> ・ \`ᴍᴇꜱᴀᴊ ꜱᴀʜıʙı:\` | ${member} | \n \n ***Eski Mesaj:*** \n \`\`\`diff\n- ${oldMessage.content.replace(/`/g, "'")}\`\`\` \n \n ***Yeni Mesaj:*** \n \`\`\`diff\n+ ${newMessage.content.replace(/`/g, "'")}\`\`\` `)]}).catch(() => {});

   







    }
}