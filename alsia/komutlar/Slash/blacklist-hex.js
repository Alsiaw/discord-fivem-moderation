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
    .setName("blacklist")
    .setDescription("Bir oyuncunun hexi ile birlikte blackliste alırsınız.")
    .addStringOption(option =>
        option.
           setName('oyuncu')
          .setDescription('ID giriniz lütfen örnek: 278152550627409921')
          .setRequired(true)
    )
	.addStringOption(option =>
        option.
           setName('sebep')
          .setDescription('Sebep giriniz lütfen örnek: yan hesap')
          .setRequired(true)
    )
    .addStringOption(option =>   
        option
        .setName("hex")
        .setDescription("Hex giriniz lütfen örnek: 1100001418f23c8")
        .setRequired(true)
        ),




			alsia: async (client, interaction) => {
    
                const Oyuncu = interaction.options.getString('oyuncu')
				const Sebep = interaction.options.getString('sebep')
				const Hex = interaction.options.getString('hex')

				const guild = interaction.guild




const Warn = new EmbedBuilder()
.setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
.setColor("#490404")
.setTimestamp()

const roles = ayarlar.Yetkiler.Staff;

if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")] , ephemeral: true })
if (interaction.member.id == Oyuncu) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Kendinemi Ceza Vericeksin.*")] , ephemeral: true })
if (interaction.channelId !== ayarlar.Yetkiler.BotKomut) return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Sadece* <#${ayarlar.Yetkiler.BotKomut}> *kanalında kullanabilirsin*`)] , ephemeral: true  })



await HexID.findOneAndUpdate(
  { SunucuID: guild.id
  },
  {
    $inc: {
      ID: 1       
    }
  },
  { upsert: true }
);



const messageUsersData = await HexID.find({ SunucuID: guild.id })




const messageUsers = messageUsersData
    .splice(0, 100)
    .map((x, index) => `${x.ID}`)
    .join("\n");




                      const embed = new EmbedBuilder()
                      .setDescription(`<a:5961darkbluetea:1327585257578561548> ・ <@${Oyuncu}> *İsimli oyuncuya ait* \`steam:${Hex}\` *hex adresi blackliste eklenmiştir.*
                      
<:8676gasp:1327585524231176192> ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}
<a:duyuru:1327600220879716396> ・ \`ᴄᴇᴢᴀ ıᴅ: #${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}\``)
                      .setAuthor({
                      name: `${interaction.member.displayName}`, 
                      iconURL: interaction.member.user.avatarURL({dynamic: true})})
                      .setColor("#051b50")
          
          await interaction.reply({ embeds: [embed] }).catch(() => {});




const CezaMesaj = new EmbedBuilder()
.setDescription(`<:8676gasp:1327585524231176192> ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}
<a:5961darkbluetea:1327585257578561548> ・ \`ᴏʏᴜɴᴄᴜ:\` <@${Oyuncu}> 

`)
.setFooter({ text: `Ⓜ️ ${moment(Date.now()).format("LLL")}` })
                      .setAuthor({
                      name: `${ayarlar.Embed.authorembed} - ʙʟᴀᴄᴋʟıꜱᴛ ʜᴇx`, 
                      iconURL: guild.iconURL({dynamic: true})})
                      .setThumbnail(interaction.member.user.avatarURL({ dynamic: true }))
                      .setColor("#051b50")
                      .addFields(
                           { name: "**SEBEP:**",  value: `\`\`\`fix
» ${Sebep}\`\`\`
                           `, inline: false })
                           .addFields(
                            { name: "**HEX:**",  value: `\`\`\`fix
» ${Hex}\`\`\`
                            `, inline: false })
                    
await guild.channels.cache.get(ayarlar.BlacklistHex.YetkiliOda).send({ embeds: [CezaMesaj]})

 
  await HexDB.updateOne({ Sunucu: guild.id },
 

  { $push:
    
    { Hexler:
      { 
        
        Yetkili: interaction.member.id,
        Oyuncu: Oyuncu,
        Tarih: moment(Date.now()).format("LLL"),
        Sebep: `${Sebep}`,
        Hex: Hex,
        

      } 
    } 

    // {
    //   $set: {
    
    //       Yetkili: interaction.member.id,
    //       Oyuncu: Oyuncu,
    //       Tarih: moment(Date.now()).format("LLL"),
    //       Sebep: `${Sebep}`,
    //       Hex: Hex,
         
          
    //   }
  
      
      }, 
      { upsert: true });
 
 
 
 
 
 


























   
   
   
    }
 };
