const {ChannelType  ,EmbedBuilder,ButtonBuilder, ActionRowBuilder,  PermissionsBitField, AttachmentBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ayarlar = require("../../../ayarlar.json")



const canvafy = require("canvafy")
const moment = require("moment");
moment.locale("tr")



const GunlukDB = require("../../../database/gunluk-veri.js")
const IDB = require("../../../database/ID.js")
const EtiketDB = require("../../../database/etiket-veri.js")
const YetkiliDB = require("../../../database/yetkili-veri.js")
const İsimDB = require("../../../database/isimler.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("isim")
    .setDescription("Bir kullanıcının sunucudaki görünen ismini değiştirirsiniz.")
    .addUserOption(option =>
      option.
      
      setName('oyuncu')
      .setDescription('Lütfen bir oyuncu seçiniz Örnek: alsiaw')
      .setRequired(true))
    .addStringOption(option =>
        option.
           setName('isim')
          .setDescription('Lütfen isim giriniz Örnek: alsia')
          .setRequired(true)
          .setMinLength(1)
          .setMaxLength(20)
    ),




			alsia: async (client, interaction) => {
    

				const guild = interaction.guild

                const member = interaction.options.getMember('oyuncu')
                const isim = interaction.options.getString('isim')




                const Warn = new EmbedBuilder()
                .setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
                .setColor("#490404")
                .setTimestamp()
                
                const roles = ayarlar.Yetkiler.Staff;
                
                if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")] , ephemeral: true })
                if (!member) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Geçerli bir oyuncu seçiniz.*")] , ephemeral: true })
                if (interaction.member.id == member.id) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Kendinemi Ceza Vericeksin.*")] , ephemeral: true })
                if (member && member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Kendinden yüksek kişilere ceza veremessin.*")] , ephemeral: true}).catch(() => {});
                if (!member.manageable) return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Botun yetkisi yetmemektedir.*`)] , ephemeral: true  })
















                await IDB.findOneAndUpdate(
                  { SunucuID: guild.id
                  },
                  {
                    $inc: {
                      ID: 1       
                    }
                  },
                  { upsert: true }
                );
        
        
        
                const messageUsersData = await IDB.find({ SunucuID: guild.id })
        
        
        
        
                const messageUsers = messageUsersData
                    .splice(0, 100)
                    .map((x, index) => `${x.ID}`)
                    .join("\n");





                const embed = new EmbedBuilder() 
                .setTitle(`${ayarlar.Embed.authorembed} - ıꜱıᴍ ɢᴜɴᴄᴇʟʟᴇᴍᴇ ꜱıꜱᴛᴇᴍı`)
                .setDescription(`<:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` ${interaction.member}
                <a:5961darkbluetea:1327585257578561548> ・ \`ᴏʏᴜɴᴄᴜ:\` ${member}

                <a:tehlikesel:1327600281029967953> ・ \`ᴇꜱᴋɪ ıꜱᴍɪ: ${member.displayName}\`
                <:8676gasp:1327585524231176192> ・ \`ʏᴇɴı ıꜱᴍı: ${isim}\` 
                `)
                .setThumbnail(member.user.avatarURL({dynamic:true}))  
                .setColor('#200527')
                .setFooter({ text: `🌐 ID: #${messageUsers} ・ ${moment(Date.now()).format("LLL")}` })
                await interaction.reply({embeds: [embed]}).catch(() => {});










                const canvas = new Canvafy.WelcomeLeave()
                .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
                .setBackground("image", ayarlar.Resimler.moderasyonURL)
                // .setBackground("image", "https://cdn.discordapp.com/attachments/1112203212678778940/1116683500804911104/940f0c70c7a84209cca88535e7ce28a3.png")
                .setTitle("ISIM DEGISTIRILDI")
                .setDescription(`KULLANILMIYOR`)
                .setBorder("#dfa8d8")
                .setCezaID(`Yetkili: ${interaction.member.user.username}`)
                .setOyuncu(`Oyuncu: ${member.user.username}`)
                .setYetkili(`#100`)
                .setSebep(`İsim: ${isim}`)
                .setAvatarBorder("#ffffff")
                .setOverlayOpacity(0.5)
                .build();
            
            
                    const logembed = await guild.channels.cache.get(ayarlar.KomutLOG.İsimLOG).send({ files: [{ attachment: welcome, name: "isim-alsia-log.png" }] })










                  



                    const embedV2 = new EmbedBuilder()
                    .setImage(`attachment://isim-alsia-log.png`)
                    .setDescription(`<:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` ${interaction.member}
                    <a:5961darkbluetea:1327585257578561548> ・ \`ᴏʏᴜɴᴄᴜ:\` ${member}
                                    `)
                          .setColor('#040450')
                        .setFooter({ text: `🌐 ᴅᴇᴠ. ʙʏ ᴀʟꜱɪᴀ` })
                      .setThumbnail(interaction.member.user.avatarURL({dynamic:true})) 
                    .setAuthor({
                    name:`${ayarlar.Embed.authorembed} - ɪꜱɪᴍ ᴅᴇɢɪꜱᴛɪʀɪʟᴅɪ`, 
                    iconURL: guild.iconURL({dynamic: true})
                    })
                    .addFields(
                    { name: "**ESKI ISIM:**",  value: `\`\`\`fix
${member.displayName}\`\`\`
                    `, inline: false },
                    { name: "**YENI ISIM:**",  value: `\`\`\`fix
${isim}\`\`\`
                                        `, inline: false },
                    { name:"**TARIH:**",  value: `\`\`\`fix
${moment(Date.now()).format("LLL")} - IsımID: #${messageUsers.length > 0 ? messageUsers : "#1"}\`\`\`
                              `, inline: true },
                    )
            
            
                    await logembed.edit({ embeds: [embedV2] , files: [{ attachment: welcome, name: "isim-alsia-log.png" }] })   
























          


           
    




          await EtiketDB.updateOne(
            { Sunucu: guild.id , ID: `#${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`},
            {
              $set: {
                Oyuncu: member.id,
                Yetkili: interaction.member.id,
                Tarih: moment(Date.now()).format("LLL"),
                Sebep: `ıꜱıᴍ: ${isim}`,
                SebepX: `Yeni İsmi: ${isim}`,
                YetkiliAD: interaction.member.user.username,
                OyuncuAD: member.user.username,
                Olay: "ISIM GUNCELLENDI",
        
              }
            },
            { upsert: true }
          );
  
  
  
  
              await YetkiliDB.findOneAndUpdate({ Sunucu: guild.id, Yetkili: interaction.member.id },
  
                { $inc:
                    { 
                      
                 İsim: 1,
                 Gİsim: 1,
                 Hİsim: 1,
                 
                    } 
                  }, 
                  { upsert: true });


          await İsimDB.findOneAndUpdate({ Sunucu: guild.id, Oyuncu: member.id },

            { $push:
            
              { İsimler:
                { 
                  
                  Yetkili: interaction.member.id,
                  Tarih: moment(Date.now()).format("LLL"),
                  Yİsim: isim,
                  Eİsim: member.displayName,
                  ID: `#${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`,
                  
    
                } 
              } 
              }, 
              { upsert: true });
         
         
           await interaction.guild.members.cache.get(member.id).setNickname(`${isim}`).catch(() => {});





























   
   
    }
 };
