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











  const reklam = ["discord.app", "discord.gg", "invite","discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az",]

  if (reklam.some(word => message.content.toLowerCase().includes(word)) ) {

    const { KanalID , Sistem } = await ReklamDB.findOne({ SunucuID: message.guild.id });

if(Sistem == false) return

    if (KanalID.includes(message.channel.id)) return false;

    
    const roles = ayarlar.Yetkiler.Staff;
    
    if (message.member.roles.cache.find(r => roles.includes(r.id)) || message.member.permissions.has(PermissionFlagsBits.Administrator)) return;




const ReklamLOG = new EmbedBuilder()
.setDescription(`<a:5961darkbluetea:1327585257578561548> ・ \`ᴋᴜʟʟᴀɴıᴄı:\` ${message.author}
<a:utility:1327600287367696515> ・ \`ᴋᴀɴᴀʟ:\` ${message.channel}`)
.setColor("#12073d")
.setFooter({ text: `🌐 ${moment(Date.now()).format("LLL")}` })
.setAuthor({
name:`${ayarlar.Embed.authorembed} - ʀᴇᴋʟᴀᴍ ꜱıꜱᴛᴇᴍı`, 
iconURL: message.guild.iconURL({dynamic: true})})
.setThumbnail(message.author.avatarURL({dynamic:true}))
.addFields(
{ name: "**ᴍᴇꜱᴀᴊ ıᴄᴇʀıɢı:**",  value: `\`\`\`fix
${message.content}\`\`\`
`, inline: false },
)





       message.guild.channels.cache.get(ayarlar.LOG.ReklamLOG).send({embeds: [ReklamLOG]}).catch(() => {});   


      await message.delete(message.author).catch(() => {});


const reklamalsia = new EmbedBuilder()
.setTitle(ayarlar.Embed.SunucuAD)
.setColor("#12073d")
.setDescription(`<a:5961darkbluetea:1327585257578561548> ・ ***Merhabalar, Bu sunucuda reklam koruma sistemi açıktır lütfen reklam yapmayınız.***`)
.setFooter({ text: moment(Date.now()).format("LLL") })
.setThumbnail(message.author.avatarURL({dynamic:true}))

      await message.channel.send({ content: `||${message.author}||`, embeds: [reklamalsia]}).then(mesaj => {
          setTimeout(function() {
            mesaj.delete().catch(() => {});
          }, 5000);
      })



  }













    }
}