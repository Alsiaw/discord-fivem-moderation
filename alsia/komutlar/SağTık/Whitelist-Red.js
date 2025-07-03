const { ContextMenuCommandBuilder ,  ActionRowBuilder ,  ModalBuilder, TextInputBuilder, TextInputStyle  , ButtonStyle, ButtonBuilder, ComponentType , EmbedBuilder, MessageActionRow, MessageButton,MessageEmbed,Client,CommandInteraction } = require('discord.js');

const canvafy = require("canvafy")
const moment = require("moment")
moment.locale("tr")
const discordModals = require('discord-modals');
const { Modal, TextInputComponent, SelectMenuComponent, showModal  } = require('discord-modals');
 const client = global.client;


const IDB = require("../../../database/ID.js");
const EtiketDB = require("../../../database/etiket-veri.js");
const SicilDB = require("../../../database/sicil.js");
const YetkiliDB = require("../../../database/yetkili-veri.js");
const SunucuDB = require("../../../database/gunluk-veri.js");
const KayıtDB = require("../../../database/kayıtlar.js");
const ayarlar = require('../../../ayarlar.json');


module.exports = {
  data: new ContextMenuCommandBuilder()
          .setName('Whitelist Red')
          .setType(2),



          alsia: async (client, interaction) => {




           const guild = interaction.guild
           const targetId = interaction.targetId

           const id = Math.floor(Math.random() * 99999) + 1000000;




           const modal = new ModalBuilder()
           .setCustomId(`wlwModal-${id}`)
           .setTitle(`${ayarlar.Embed.FormAD} - WL RED`);
           
           
           const favoriteColorInput = new TextInputBuilder()
           .setCustomId('sebep')
           .setLabel("Sebep?")
           .setStyle(TextInputStyle.Short)
           .setMinLength(1)
           .setMaxLength(20)
           .setPlaceholder("alsia Çoksel")
           .setRequired(true);
           
           const secondActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
           
           modal.addComponents(secondActionRow);
           
           await interaction.showModal(modal).catch(() => {});
      
           


           const target = interaction.member.guild.members.cache.get(targetId);


           client.on("interactionCreate", async interaction => {


            if (interaction.customId === `wlwModal-${id}`) {

    const Sebep = interaction.fields.getTextInputValue('sebep');


   










const Warn = new EmbedBuilder()
.setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
.setColor("#490404")
.setTimestamp()

const roles = ayarlar.Yetkiler.Staff;

if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")]  })
if (!target) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Geçerli bir oyuncu seçiniz.*")]  })
if (interaction.member.id == target.id) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Kendinemi red Vericeksin.*")]  })
if (target && target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Kendinden yüksek kişilere red veremessin.*")] }).catch(() => {});
if (!target.manageable) return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Botun yetkisi yetmemektedir.*`)]   })
//if (interaction.channelId !== ayarlar.Yetkiler.KayıtKomut) return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Sadece* <#${ayarlar.Yetkiler.KayıtKomut}> *kanalında kullanabilirsin*`)]   })











await interaction.deferReply({  ephemeral: true }).catch(() => {});



const ebmed = new EmbedBuilder()
.setDescription(`<a:5961darkbluetea:1327585257578561548> ・ ${target}, *İsimli oyuncu başarılı bir şekilde* ***red edildi.***

<:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}
<:8676gasp:1327585524231176192> ・ \`ꜱᴇʙᴇᴘ: ${Sebep}\``)
.setAuthor({
name: `${interaction.member.displayName}`, 
iconURL: interaction.member.user.avatarURL({dynamic: true})})
.setFooter({ text: moment(Date.now()).format("LLL") })
.setColor("#051b50")
.setThumbnail(target.user.avatarURL({dynamic: true}))

await interaction.editReply({ embeds: [ebmed] , ephemeral: true }).catch(() => {});











    const canvas = new Canvafy.WelcomeLeave()
    .setAvatar(target.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
    .setBackground("image", ayarlar.Resimler.moderasyonURL)
    // .setBackground("image", "https://cdn.discordapp.com/attachments/1112203212678778940/1116683500804911104/940f0c70c7a84209cca88535e7ce28a3.png")
    .setTitle("WL RED")
    .setDescription(`KULLANILMIYOR`)
    .setBorder("#dfa8d8")
    .setCezaID(`Yetkili: ${interaction.member.displayName}`)
    .setOyuncu(`Oyuncu: ${target.user.username}`)
    .setYetkili(`#100`)
    .setSebep(`Sebep: ${Sebep}`)
    .setAvatarBorder("#ffffff")
    .setOverlayOpacity(0.5)
    .build();



        const logembed = await guild.channels.cache.get(ayarlar.KomutLOG.redlog).send({ files: [{ attachment: welcome, name: "wlred-alsia-log.png" }] })

        const logembedd = await guild.channels.cache.get(ayarlar.KayıtSistemi.redOda).send({ files: [{ attachment: welcome, name: "wlred-alsia-log.png" }] })

        await IDB.findOneAndUpdate(
          { SunucuID: interaction.guild.id
          },
          {
            $inc: {
              ID: 1       
            }
          },
          { upsert: true }
        );



        const messageUsersData = await IDB.find({ SunucuID: interaction.guild.id })




        const messageUsers = messageUsersData
            .splice(0, 100)
            .map((x, index) => `${x.ID}`)
            .join("\n");
  




            const embedV2 = new EmbedBuilder()
            .setImage(`attachment://wlred-alsia-log.png`)
            .setDescription(`<:8676gasp:1327585524231176192> ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}
<a:5961darkbluetea:1327585257578561548> ・ \`ᴏʏᴜɴᴄᴜ:\` ${target} 
            
            `)
            .setFooter({ text: `Ⓜ️ RedID: #${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."} ・ ${moment(Date.now()).format("LLL")}` })
                                  .setAuthor({
                                  name: `${ayarlar.Embed.authorembed} - ᴡʟ ʀᴇᴅ`, 
                                  iconURL: guild.iconURL({dynamic: true})})
                                  .setThumbnail(target.user.avatarURL({ dynamic: true }))
                                  .setColor("#051b50")
                                  .addFields(
                                       { name: "**SEBEP:**",  value: `\`\`\`fix
» ${Sebep}\`\`\`
                                       `, inline: true })

        await logembed.edit({ embeds: [embedV2] , files: [{ attachment: welcome, name: "wlred-alsia-log.png" }] })    
        await logembedd.edit({ embeds: [embedV2] , files: [{ attachment: welcome, name: "wlred-alsia-log.png" }] })  








        await YetkiliDB.findOneAndUpdate({ Sunucu: guild.id, Yetkili: interaction.member.id },

          { $inc:
              { 
                
           WlRed: 1,
           GWlRed: 1,
           HWlRed: 1,
           ToplamKayıt: 1
           
              } 
            }, 
            { upsert: true });


            const HaftalıkDB = require("../../../database/haftalık-veri.js")


            await HaftalıkDB.findOneAndUpdate({ Sunucu: guild.id, Yetkili: interaction.member.id },

              { $inc:
                  { 
                    
               HWlRed: 1,
               ToplamKayıt: 1
               
                  },

                  $set: {

                    YetkiliAD: interaction.member.displayName
                                  }

                }, 
                { upsert: true });
    
        
      
        await EtiketDB.updateOne(
          { Sunucu: guild.id , ID: `#${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`},
          {
            $set: {
              Oyuncu: targetId,
              Yetkili: interaction.member.id,
              Tarih: moment(Date.now()).format("LLL"),
              Sebep: `ꜱᴇʙᴇᴘ: ${Sebep}`,
              SebepX: `Sebep: ${Sebep}`,
              YetkiliAD: interaction.member.user.username,
              OyuncuAD: target.user.username,
              Olay: "WL RED",
      
            }
          },
          { upsert: true }
        );






        await SicilDB.findOneAndUpdate({ Sunucu: guild.id, Oyuncu: targetId },

          { $push:
          
            { Sicil:
              { 
                
                Yetkili: interaction.member.id,
                Tarih: moment(Date.now()).format("LLL"),
                Sebep: "Veri Yok",
                Olay: "[WL RED]",
                ID: `#${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`,
                
  
              } 
            } 
            }, 
            { upsert: true });



           




                await SunucuDB.findOneAndUpdate({ Sunucu: guild.id },

                  { $inc:
                      { 
                        
             Red: 1,
                        
                      } 
                    }, 
                    { upsert: true });




                    await KayıtDB.findOneAndUpdate({ Sunucu: guild.id, Oyuncu: targetId },

                        { $push:
                        
                          { Kayıtlar:
                            { 
                              
                              Yetkili: interaction.member.id,
                              Tarih: moment(Date.now()).format("LLL"),
                              Sebep: `\`${Sebep}\``,
                              Durum: "<a:red:1327600270032764928>",
                              ID: `#${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`,
                              
                
                            } 
                          } 
                          }, 
                          { upsert: true });



















  }})


        }






}















