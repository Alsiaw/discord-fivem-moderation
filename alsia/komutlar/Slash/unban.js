const {ChannelType  ,EmbedBuilder, ActionRowBuilder , ButtonStyle, ButtonBuilder, ComponentType ,  PermissionsBitField, AttachmentBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ayarlar = require("../../../ayarlar.json")

const moment = require("moment");
moment.locale("tr")

const SunucuDB = require("../../../database/gunluk-veri.js");




module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Bir oyuncunun sunucudan yasağını kaldırırsınız.")
	.addStringOption(option =>
        option.
           setName('id')
          .setDescription('ID giriniz lütfen örnek: 278152550627409921')
          .setRequired(true)
    )
    .addStringOption(option =>
        option.
           setName('sebep')
          .setDescription('Sebep giriniz lütfen örnek: bla bla bla')
          .setRequired(true)
    ),



			alsia: async (client, interaction) => {
    
				const ID = interaction.options.getString('id')
				const sebep = interaction.options.getString('sebep')

				const guild = interaction.guild



                const Warn = new EmbedBuilder()
                .setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
                .setColor("#490404")
                .setTimestamp()
                
                const roles = ayarlar.Yetkiler.BanYetki;
                
                if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")] , ephemeral: true })
                if (interaction.member.id == ID) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Kendin yasağınımı kaldırıcaksın :)*")] , ephemeral: true })


                const uyarı = new EmbedBuilder()
                .setColor("#4f0006")
                .setAuthor({name:`${ayarlar.Embed.authorembed} - ʙᴀɴ ꜱᴏʀɢᴜʟᴀᴍᴀ`, iconURL: interaction.guild.iconURL({dynamic: true})})
                .setDescription(` 
                \`${ID}\` *ID'li Kullanıcı:*
                » *Sunucudan Yasaklı Değil!*`)

                try {
                  await interaction.guild.bans.fetch(ID)
              } catch (e) {
                 await interaction.reply({embeds: [uyarı]}).catch(() => {});
                  return;
              }



                        await interaction.guild.bans.fetch(ID).then(async ({ ids, reason }) => {



                    


    
                            const embed = new EmbedBuilder()
                            .setColor('#041f49')
                            .setDescription(`<:bsanned:1327586232506515479> ・ <@${ID}> *isimli oyuncunun başarılı bir şekilde sunucudan yasaklanması* \`${sebep}\` *sebebi ile kaldırıldı.*
                            
                            <a:5961darkbluetea:1327585257578561548> ・ \`ʏᴇᴛᴋɪʟɪ:\` ${interaction.member}`)
                            .setAuthor({
                              name: `${interaction.member.displayName}`, 
                              iconURL: interaction.member.user.avatarURL({dynamic: true})})

                              await interaction.reply({ embeds: [embed]  }).catch(() => {});

                     
                           
                     
                     
                     
                          
                            const embedss = new EmbedBuilder()
                            .setColor('#041f49')
                            .setAuthor({
                              name:`${ayarlar.Embed.authorembed} - ʏᴀꜱᴀᴋ ᴋᴀʟᴅıʀᴍᴀ`, 
                              iconURL: interaction.member.user.avatarURL({dynamic: true})})
                            .setDescription(`
                            <:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` ${interaction.member}
                            <a:5961darkbluetea:1327585257578561548> ・ \`ᴏʏᴜɴᴄᴜ:\` <@${ID}>
                                              `)
                           
                            .setThumbnail(guild.iconURL({dynamic:true}))
                            .addFields(
                                { name: "**TARIH:**",  value: `\`\`\`fix
${moment(Date.now()).format("LLL")}\`\`\`
                                `, inline: false },
                                { name:"**YASAK BILGI:**",  value: `\`\`\`fix
${reason}\`\`\`
                                          `, inline: true },
                                )
                                // .setImage(ayarlar.Resimler.moderasyonURL)
                       client.channels.cache.get(ayarlar.KomutLOG.UnbanLOG).send({embeds: [embedss]})
                     
                     
                       await interaction.guild.members.unban(ID, {reason: `Yetkili: ( ${interaction.member.user.username} )  |  Tarih: ( ${moment(Date.now()).format("LLL")} )`}).catch(() => {}) 


               

                       const YetkiliDB = require("../../../database/yetkili-veri.js");


                       await YetkiliDB.findOneAndUpdate({ Sunucu: guild.id, Yetkili: interaction.member.id },

                        { $inc:
                            { 
                              
                         Unban: 1,
                         GUnban: 1,
                         HUnban: 1,
                         
                            } 
                          }, 
                          { upsert: true });
                    




















})





                      

                   

   
   
   
   
    }
 };
