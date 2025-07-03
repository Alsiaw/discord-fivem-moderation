const {ChannelType  ,EmbedBuilder, PermissionsBitField, AttachmentBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ayarlar = require("../../../ayarlar.json")

const moment = require("moment");
moment.locale("tr")



const AfkDB = require("../../../database/afk.js")


module.exports = {
  data: new SlashCommandBuilder()
    .setName("toplu-perm-al")
    .setDescription("Toplu bir şekilde oyunculardan perm almaya işe yarar.")
	.addRoleOption(option =>
        option.
           setName('rol')
          .setDescription('Alınıcak rolü lütfen seçiniz Örnek: LSPD')
          .setRequired(true)
    ),




			alsia: async (client, interaction) => {
    
        const rol = interaction.options.getRole('rol')

				const guild = interaction.guild






        const Warn = new EmbedBuilder()
        .setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
        .setColor("#490404")
        .setTimestamp()
        
        
        if (interaction.member.id !== "278152550627409921" && interaction.member.id !== "779994925348945949" && interaction.member.id !== "818422224247586866" && interaction.member.id !== "1114130360809312276") return interaction.reply({ content: "*- Bu Komutu Sadece Üst Yetkililer Kullanabilir.*" , ephemeral: true})


const rolverilmez = ["1091459215073214484", "1171751871384387604", "1091459292667859024", "1154807820177383425", "1091458835899764806"]

        if (rolverilmez.includes(rol.id)) { interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Bu yasaklı bir permdir bot üzerinden alınamaz üst yetkililere bildiriyorum!*`)] , ephemeral: true  })

const alsia = guild.members.cache.get("278152550627409921")
await alsia.send({ content: `${interaction.member} isimli yetkili ${rol.name} yasaklı olan rol'ü almaya çalıştı.`})
return;
      }

       // await interaction.deferReply({})


       





        const members = await guild.members.fetch() 






        const yuzdeHesapla = (p1, p2) => {
          const yapilan = p2 - p1;
          return ((yapilan * 100) / p2).toFixed(2)
        };
        
        const yaklasikSure = (count) => {
          const toplamSure = 1000 * count;
          const tahminiSureIng = moment.duration(toplamSure).format("d [gün] H [saat], m [dakika] s [saniye]")
        
        
          return tahminiSureIng;
        };
        
        
        
        const removeFromFilter = members.filter(m => m.roles.cache.has(ayarlar.Permler.Whitelist));
         const Garaguş = removeFromFilter.filter(m => m.roles.cache.has(rol.id))


        
        const removeFromCount = Garaguş.size;
        if (removeFromCount == 0) return interaction.reply({ content: 'Bu rol zaten kimsede yok!' })
        
        
        
                                          var islemYapilan = 1, kalanKisi = Garaguş.size;



                                          const embed = new EmbedBuilder()
                                          .setDescription(`<a:5961darkbluetea:1327585257578561548> ・ ${rol} *İsimli roldeki* \`${removeFromCount}\` *oyuncunun permleri alınıyor*
                                           
                                          <:8676gasp:1327585524231176192> ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}
                                          <:1709locked:1327585185864351756>・ \`ᴛᴀʜᴍıɴı ꜱᴜʀᴇ: ${yaklasikSure(kalanKisi)}\` `)
                                          .setAuthor({
                                          name: `${interaction.member.displayName}`, 
                                          iconURL: interaction.member.user.avatarURL({dynamic: true})})
                                          .setColor("#051b50")
                                  
                                  await interaction.reply({ embeds: [embed] }).catch(() => {});
                                  


                                          Garaguş.forEach(async (member) => {
                                              const timeout = setTimeout(async () => {
          
          
  
                                                
                                                const embed = new EmbedBuilder()
                                                .setColor("#051b50")
                                                .setDescription(`<a:5961darkbluetea:1327585257578561548> ・ *Bir oyuncudan daha perm çekildi.*`)
                                                .setFooter({ text: `🌐 ${ayarlar.Embed.authorembed} ・ ${moment(Date.now()).format("LLL")}` })
                                                .setThumbnail(member.user.avatarURL({dynamic:true}))
                                                .addFields(
                                                  { name: "**ꜱᴏʀᴜᴍʟᴜ ᴍᴏᴅᴇʀᴀᴛᴏʀ:**",  value: `${interaction.member}
                                                  `, inline: true },
                                                  { name: "**ᴏʏᴜɴᴄᴜ:**",  value: `${member}
                                                  `, inline: true },
                                                  { name: "**ᴀʟıɴᴀɴ ᴘᴇʀᴍ:**",  value: `${rol}
                                                  `, inline: true },
                                                  { name: "**ᴛᴏᴘʟᴀᴍ ᴏʏᴜɴᴄᴜ:**",  value: `\`${kalanKisi}/${removeFromCount}\`
                                                  `, inline: true },
                                                  { name: "**ᴛᴀʜᴍıɴı ꜱᴜʀᴇ:**",  value: `*${yaklasikSure(kalanKisi)}* \`(%${yuzdeHesapla(kalanKisi, Garaguş.size)})\`
                                                  `, inline: true },
                                                  )
                                                  client.channels.cache.get(ayarlar.KomutLOG.PermAlma).send({embeds: [embed]})
                                                
                                                
          
                                                  await  member.roles.remove(rol).catch(() => {});
                                                
                                                
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
                                                  clearTimeout(timeout)
                                                  kalanKisi = kalanKisi - 1;
                                                  if (kalanKisi == 0) {                                     
                                            
          
                                                    const embed = new EmbedBuilder()
                                                    .setColor("#ffffff")
                                                    .setDescription(`<a:5961darkbluetea:1327585257578561548> ・ *Bütün oyunculardan* ${rol} *isimli perm alındı.*`)
                                                    .setFooter({ text: `🌐 ${ayarlar.Embed.authorembed} ・ ${moment(Date.now()).format("LLL")}` })

                                                     await client.channels.cache.get(ayarlar.KomutLOG.PermAlma).send({embeds: [embed]})
          
          
          
          
          
          
          
          
          
                                                    }
                                              }, islemYapilan * 1000);
                                              
                                              islemYapilan = islemYapilan + 1;
                                         
                                         
                                            });
















   
   
   
   
    }
 };
