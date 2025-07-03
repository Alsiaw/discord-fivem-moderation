const {ChannelType  ,EmbedBuilder, PermissionsBitField, AttachmentBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ayarlar = require("../../../ayarlar.json")


const moment = require("moment");
moment.locale("tr")
const canvafy = require("canvafy")




const HexDB = require("../../../database/blacklisthex.js");
const HexID = require("../../../database/hexid.js");








module.exports = {
  data: new SlashCommandBuilder()
    .setName("blacklist-iptal")
    .setDescription("Bir oyuncunun hexi ile birlikte blacklistten çıkarırsınız.")
    .addStringOption(option =>   
        option
        .setName("hex")
        .setDescription("Hex giriniz lütfen örnek: 1100001418f23c8")
        .setRequired(true)
        ),




			alsia: async (client, interaction) => {
    

				const Hex = interaction.options.getString('hex')

				const guild = interaction.guild




const Warn = new EmbedBuilder()
.setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
.setColor("#490404")
.setTimestamp()

const roles = ayarlar.Yetkiler.Staff;

if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")] , ephemeral: true })
if (interaction.channelId !== ayarlar.Yetkiler.BotKomut) return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Sadece* <#${ayarlar.Yetkiler.BotKomut}> *kanalında kullanabilirsin*`)] , ephemeral: true  })





                      const embed = new EmbedBuilder()
                      .setDescription(`<a:5961darkbluetea:1327585257578561548> ・ \`steam:${Hex}\` *hex adresi blacklist hex kategorisinden kaldırılmıştır.*
                      
<:8676gasp:1327585524231176192> ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}`)
                      .setAuthor({
                      name: `${interaction.member.displayName}`, 
                      iconURL: interaction.member.user.avatarURL({dynamic: true})})
                      .setColor("#051b50")
          
          await interaction.reply({ embeds: [embed] }).catch(() => {});




const CezaMesaj = new EmbedBuilder()
.setDescription(`<:8676gasp:1327585524231176192> ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}

`)
.setFooter({ text: `Ⓜ️ ${moment(Date.now()).format("LLL")}` })
                      .setAuthor({
                      name: `${ayarlar.Embed.authorembed} - ʙʟᴀᴄᴋʟıꜱᴛ ʜᴇx ıᴘᴛᴀʟ`, 
                      iconURL: guild.iconURL({dynamic: true})})
                      .setThumbnail(interaction.member.user.avatarURL({ dynamic: true }))
                      .setColor("#051b50")
                           .addFields(
                            { name: "**HEX:**",  value: `\`\`\`fix
» ${Hex}\`\`\`
                            `, inline: false })
                    
// await guild.channels.cache.get(ayarlar.KomutLOG.BlacklistHexLOG).send({ embeds: [CezaMesaj]})
await guild.channels.cache.get(ayarlar.BlacklistHex.YetkiliOda).send({ embeds: [CezaMesaj]})

 
  await HexDB.updateOne({ Sunucu: guild.id },
 

  { $pull:
    
    { Hexler:
      { 
        Hex: Hex,
        

      } 
    } 

      
      }, 
      { upsert: true });
 
 
 
 
 
 


























   
   
   
    }
 };
