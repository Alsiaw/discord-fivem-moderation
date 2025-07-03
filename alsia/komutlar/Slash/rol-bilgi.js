const {ChannelType  ,EmbedBuilder,ButtonBuilder, ActionRowBuilder,  PermissionsBitField, AttachmentBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ayarlar = require("../../../ayarlar.json")

const moment = require("moment");
moment.locale("tr")








module.exports = {
  data: new SlashCommandBuilder()
    .setName("rolbilgi")
    .setDescription("Sunucuda olan bir rol'ün bilgilerini alırsınız.")	

  .addRoleOption(option => 
option.

setName('rol')
.setDescription('Bilgisi alınıcak rolü seçiniz Örnek: LSPD')
.setRequired(true)),




			alsia: async (client, interaction) => {
    

				const guild = interaction.guild

                const rol = interaction.options.getRole('rol')




                const Warn = new EmbedBuilder()
                .setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
                .setColor("#490404")
                .setTimestamp()
                
                const roles = ayarlar.Yetkiler.Staff;
                
                if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")] , ephemeral: true })
                if (!rol) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Geçerli bir rol seçiniz.*")] , ephemeral: true })





                let sayı = rol.members.size
                if (sayı > 150) return interaction.reply({ content:`${rol} rolünde toplam ${sayı} kişi olduğundan dolayı rol bilgisini yollayamıyorum.`}).catch(() => {});
                let üyeler = rol.members.map(x => `<@${x.id}> - (\`${x.user.username}\`) `)
                let üyelers = rol.members.map(x => `<@${x.id}> `)
        







                if (sayı > 80) {


                    const embed = new EmbedBuilder()
                    .setColor('#041f49')
                    .setFooter({ text: `${ayarlar.Embed.authorembed} ❤️ ᴀʟꜱɪᴀ` })
                    .setAuthor({
                      name:`${interaction.member.displayName}`, 
                      iconURL: interaction.member.user.avatarURL({dynamic: true})})
                    
                           await interaction.reply({ embeds: [embed.setDescription(`
                           - ${rol} ***Rol bilgileri;***
                           - **Rol Rengi:** \`${rol.hexColor}\`
                           - **Rol ID:** \`${rol.id}\`
                           - **Rol Kişi Sayısı:** \`${sayı}\`
                           ─────────────────
                           - ***Roldeki Kişiler;***
                           ${üyelers.join("\n")}
                           `)]}).catch(() => {}); 
          
               
                return 
                }
          
                await interaction.deferReply({  }).catch(() => {});

          const embed = new EmbedBuilder()
          .setColor('#041f49')
        //   .setFooter({ text: `🌐 ${ayarlar.Embed.authorembed} ・ ${moment(Date.now()).format("LLL")}` })
        .setTitle(ayarlar.Embed.SunucuAD + ' - ROL BILGI')  
       .setURL(ayarlar.Bot.SunucuDavet)
       .setThumbnail(guild.iconURL({ dynamic: true }))
          .setImage(ayarlar.Resimler.UzunKısa)
                 await interaction.editReply({ embeds: [embed.setDescription(`
                   ${rol} - \`${rol.name}\`  **ıꜱıᴍʟı ʀᴏʟ ʙıʟɢıꜱı »**
          
                   <a:5961darkbluetea:1327585257578561548> ・ ʀᴏʟ ʀᴇɴɢɪ: \`${rol.hexColor}\`
                   <a:utility:1327600287367696515> ・ ʀᴏʟ ɪᴅ: \`${rol.id}\`
                   <:king_crown:1327600238407450697> ・ ʀᴏʟᴅᴇᴋɪ ᴋɪꜱɪ ꜱᴀʏɪꜱɪ: \`${sayı}\`
          
          
                  **ʀᴏʟᴇ ꜱᴀʜıᴘ ᴋᴜʟʟᴀɴıᴄıʟᴀʀ »**
          
                  ${üyeler.splice(0, 80).join("\n")}
                  `)]}).catch(() => {}); 
                  
          
               
                  
                  
          
                  
          
          
          
          
          

























































































































   
   
    }
 };
