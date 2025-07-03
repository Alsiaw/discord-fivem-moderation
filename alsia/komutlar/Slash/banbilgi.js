const {ChannelType  ,EmbedBuilder, ActionRowBuilder , ButtonStyle, ButtonBuilder, ComponentType ,  PermissionsBitField, AttachmentBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ayarlar = require("../../../ayarlar.json")

const moment = require("moment");
moment.locale("tr")

const SunucuDB = require("../../../database/gunluk-veri.js");




module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban-sorgu")
    .setDescription("Bir oyuncunun sunucudan yasaklı olup olmadığını kontrol edersiniz.")
	.addStringOption(option =>
        option.
           setName('id')
          .setDescription('ID giriniz lütfen örnek: 278152550627409921')
          .setRequired(true)
    ),




			alsia: async (client, interaction) => {
    
				const ID = interaction.options.getString('id')

				const guild = interaction.guild
                const member = guild.members.cache.get(ID);





                const Warn = new EmbedBuilder()
                .setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
                .setColor("#490404")
                .setTimestamp()
                
                const roles = ayarlar.Yetkiler.Staff;
                
                if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")] , ephemeral: true })
                if (interaction.member.id == ID) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Kendinimi sorguluyorsun?*")] , ephemeral: true })




















                


                const row = new ActionRowBuilder()
                .addComponents(
            
            new ButtonBuilder()
            .setCustomId("unban")
            .setLabel("Yasaklanmasını Kaldır!")
            .setStyle(ButtonStyle.Danger)
            .setEmoji("<:Ban_Hammer1:1145674366374387783>"),


                )




                const uyarı = new EmbedBuilder()
                .setColor("#4f0006")
                .setAuthor({name:`${ayarlar.Embed.authorembed} - ʙᴀɴ ꜱᴏʀɢᴜʟᴀᴍᴀ`, iconURL: interaction.guild.iconURL({dynamic: true})})
                .setDescription(` 
                \`${ID}\` *ID'li Kullanıcı:*
                » *Sunucudan Yasaklı Değil!*`)
        
           
        
                interaction.guild.bans.fetch()
                .then(bans => {
                    if (!bans.has(ID)) {
                        return  interaction.reply({embeds: [uyarı]}).catch(() => {});
                    }})
            
                    interaction.guild.bans.fetch(ID).then(async ({ ids, reason }) => {
                    
                    //  await interaction.deferReply({  }).catch(() => {});




                

                        const ban = new EmbedBuilder()
                        .setColor("#041f49")
                        .setThumbnail(interaction.member.user.avatarURL({ dynamic: true}))
                        .setFooter({ text: moment(Date.now()).format("LLL")})
                        .setAuthor({name:`${ayarlar.Embed.authorembed} - ʙᴀɴ ꜱᴏʀɢᴜʟᴀᴍᴀ`, iconURL: interaction.guild.iconURL({dynamic: true})})
                        .setDescription(`
                        <@${ID}> - \`${ID}\` *ID'li Kullanıcının Yasaklanma Bilgisi:*
                        
                        \`${reason}\``)
        
                        return interaction.reply({embeds: [ban] ,  components: [row] }).catch(() => {});
                         
                         
                    }).catch(() => { 
                    });




                    var filter = (button) => button.user.id === interaction.member.id;
                    let collector = await interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, filter, time: 60000 })


                    collector.on("collect", async (button) => {
                                        
                      if(button.customId === "unban") {



                        interaction.guild.bans.fetch(ID).then(async ({ ids, reason }) => {

                          const Warn = new EmbedBuilder()
                          .setAuthor({ name: button.member.user.username , iconURL: button.member.user.avatarURL({dynamic: true})})
                          .setColor("#490404")
                          .setTimestamp()
                          
                          const roles = ayarlar.Yetkiler.BanYetki;
                          
                          if (!button.member.roles.cache.find(r => roles.includes(r.id))) return button.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")] , ephemeral: true })



                            await button.reply({ content: "*- Başarılı bir şekilde yasaklanması kaldırıldı!*" , ephemeral: true}).catch(() => {});




                            const embed = new EmbedBuilder()
                            .setColor('#041f49')
                            .setDescription(`<:bsanned:1327586232506515479> ・ <@${ID}> *isimli oyuncunun başarılı bir şekilde sunucudan yasaklanması kaldırıldı.*
                            
                            <a:5961darkbluetea:1327585257578561548> ・ \`ʏᴇᴛᴋɪʟɪ:\` ${button.member}`)
                            .setAuthor({
                              name: `${button.member.displayName}`, 
                              iconURL: button.member.user.avatarURL({dynamic: true})})

                              await button.message.edit({ embeds: [embed] , components: [] }).catch(() => {});

                     
                           
                     
                     
                     
                          
                            const embedss = new EmbedBuilder()
                            .setColor('#041f49')
                            .setAuthor({
                              name:`${ayarlar.Embed.authorembed} - ʏᴀꜱᴀᴋ ᴋᴀʟᴅıʀᴍᴀ`, 
                              iconURL: interaction.member.user.avatarURL({dynamic: true})})
                            .setDescription(`
                            <:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` ${button.member}
                            <a:5961darkbluetea:1327585257578561548> ・ \`ᴏʏᴜɴᴄᴜ:\` <@${ID}>
                                              `)
                           
                            .setThumbnail(guild.iconURL({dynamic:true}))
                            .addFields(
                                { name: "**TARIH:**",  value: `\`\`\`fix
${moment(Date.now()).format("LLL")} - CezaID: #35\`\`\`
                                `, inline: false },
                                { name:"**YASAK BILGI:**",  value: `\`\`\`fix
${reason}\`\`\`
                                          `, inline: true },
                                )
                                // .setImage(ayarlar.Resimler.moderasyonURL)
                       client.channels.cache.get(ayarlar.KomutLOG.BanLOG).send({embeds: [embedss]})
                     
                     
                       await button.guild.members.unban(ID, {reason: `Yetkili: ( ${button.member.user.tag} )  |  Tarih: ( ${moment(Date.now()).format("LLL")} )`}).catch(() => {}) 


                       await SunucuDB.findOneAndUpdate({ Sunucu: guild.id },

                        { $inc:
                            { 
                              
                   Unban: 1,
                              
                            } 
                          }, 
                          { upsert: true });






})





                      }

                    })

   
   
   
   
    }
 };
