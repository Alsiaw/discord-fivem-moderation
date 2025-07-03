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
const HexlerDB = require("../../../database/hexler.js");
const HexDB = require("../../../database/oyuncu-hex.js");
const ayarlar = require('../../../ayarlar.json');


module.exports = {
  data: new ContextMenuCommandBuilder()
          .setName('Whitelist Onay')
          .setType(2),



          alsia: async (client, interaction) => {




           const guild = interaction.guild


           const targetId = interaction.targetId

           const id = Math.floor(Math.random() * 99999) + 1000000;

    //         const modal = new Modal() 
    //         .setCustomId(`whitelist-sistemi-${targetId}`)
    //         .setTitle(`${ayarlar.Embed.FormAD} - WL ONAY`)
    //         .addComponents([
    //           new TextInputComponent()
    //             .setCustomId('hex')
    //             .setLabel('Hex?')
    //             .setStyle('SHORT')
    //             .setMinLength(0)
    //             .setMaxLength(17)
    //             .setPlaceholder('1100001418f23c8')
    //             .setRequired(true),
               
    
    
              
    
    
    
    //         ]);
    
          
        
            
    //  showModal(modal, {
    //         client,
    //         interaction,
    //         });



            const modal = new ModalBuilder()
            .setCustomId(`wlOnay-${id}`)
            .setTitle(`${ayarlar.Embed.FormAD} - WL ONAY`);
            
            
            const favoriteColorInput = new TextInputBuilder()
            .setCustomId('hex')
            .setLabel("Hex?")
            .setStyle(TextInputStyle.Short)
            .setMinLength(14)
            .setMaxLength(18)
            .setPlaceholder("1100001418f23c8")
            .setRequired(true);
            
            const secondActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
            
            modal.addComponents(secondActionRow);
            
            await interaction.showModal(modal).catch(() => {});
            




            const target = interaction.member.guild.members.cache.get(interaction.targetId);




      
            client.on("interactionCreate", async interaction => {


              if (interaction.customId === `wlOnay-${id}`) {
  
                const Hex = interaction.fields.getTextInputValue('hex');
   





const Warn = new EmbedBuilder()
.setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
.setColor("#490404")
.setTimestamp()

const roles = ayarlar.Yetkiler.Staff;

if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")]  })
if (!target) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Geçerli bir oyuncu seçiniz.*")]  })
if (interaction.member.id == target.id) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Kendinemi Onay Vericeksin.*")]  })
if (target && target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Kendinden yüksek kişilere onay veremessin.*")] }).catch(() => {});
if (!target.manageable) return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Botun yetkisi yetmemektedir.*`)]   })
if (target.roles.cache.has(ayarlar.Permler.Whitelist)) return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Oyuncu zaten sunucuda kayıtlı.*`)]   })
//if (interaction.channelId !== ayarlar.Yetkiler.KayıtKomut) return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Sadece* <#${ayarlar.Yetkiler.KayıtKomut}> *kanalında kullanabilirsin*`)]   })












































































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
  












            await interaction.deferReply({ ephemeral: true }).catch(() => {});

      





            const ebmed = new EmbedBuilder()
            .setDescription(`<a:5961darkbluetea:1327585257578561548> ・ ${target}, *İsimli oyuncu başarılı bir şekilde* ***onaylandı.***
            
            <:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}
            <a:duyuru:1327600220879716396> ・ \`ᴋᴀʏıᴛ ıᴅ: #${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}\`
            <:8676gasp:1327585524231176192> ・ \`ʜᴇx ıᴅ: ${Hex}\``)
            .setAuthor({
            name: `${interaction.member.displayName}`, 
            iconURL: interaction.member.user.avatarURL({dynamic: true})})
            .setFooter({ text: moment(Date.now()).format("LLL") })
            .setColor("#051b50")
            .setThumbnail(target.user.avatarURL({dynamic: true}))

// await interaction.reply({ embeds: [ebmed] , components: [row3]}).catch(() => {});
await interaction.editReply({ embeds: [ebmed] ,  ephemeral: true }).catch(() => {});


await target.setNickname(`IC ISIM`).catch(() => {});
await target.roles.add(ayarlar.Permler.Whitelist).catch(() => {});
await target.roles.remove(ayarlar.Permler.Giriş).catch(() => {});













            const canvas = new Canvafy.WelcomeLeave()
            .setAvatar(target.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
            .setBackground("image", ayarlar.Resimler.moderasyonURL)
            // .setBackground("image", "https://cdn.discordapp.com/attachments/1112203212678778940/1116683500804911104/940f0c70c7a84209cca88535e7ce28a3.png")
            .setTitle("WL ONAY")
            .setDescription(`KULLANILMIYOR`)
            .setBorder("#dfa8d8")
            .setCezaID(`Yetkili: ${interaction.member.displayName}`)
            .setOyuncu(`Oyuncu: ${target.user.username}`)
            .setYetkili(`#100`)
            .setSebep(`Hex: ${Hex}`)
            .setAvatarBorder("#ffffff")
            .setOverlayOpacity(0.5)
            .build();
        
        
                const logembed = await guild.channels.cache.get(ayarlar.KomutLOG.onaylog).send({ files: [{ attachment: welcome, name: "wlonay-alsia-log.png" }] })
        
                const logembedz = await guild.channels.cache.get(ayarlar.KayıtSistemi.onayOda).send({ files: [{ attachment: welcome, name: "wlonay-alsia-log.png" }] })








                const embedV2 = new EmbedBuilder()
                .setImage(`attachment://wlonay-alsia-log.png`)
                .setDescription(`<:8676gasp:1327585524231176192> ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}
<a:5961darkbluetea:1327585257578561548> ・ \`ᴏʏᴜɴᴄᴜ:\` ${target} 
                
                `)
                .setFooter({ text: `Ⓜ️ OnayID: #${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."} ・ ${moment(Date.now()).format("LLL")}` })
                                      .setAuthor({
                                      name: `${ayarlar.Embed.authorembed} - ᴡʟ ᴏɴᴀʏ`, 
                                      iconURL: guild.iconURL({dynamic: true})})
                                      .setThumbnail(target.user.avatarURL({ dynamic: true }))
                                      .setColor("#051b50")
                                      .addFields(
                                           { name: "**HEX:**",  value: `\`\`\`fix
» ${Hex}\`\`\`
                                           `, inline: true })


        await logembed.edit({ embeds: [embedV2] , files: [{ attachment: welcome, name: "wlonay-alsia-log.png" }] })    

        await logembedz.edit({ embeds: [embedV2] , files: [{ attachment: welcome, name: "wlonay-alsia-log.png" }] })









        const HaftalıkDB = require("../../../database/haftalık-veri.js")


        await HaftalıkDB.findOneAndUpdate({ Sunucu: guild.id, Yetkili: interaction.member.id },

          { $inc:


              { 
                
           HWlOnay: 1,
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
              Oyuncu: target.id,
              Yetkili: interaction.member.id,
              Tarih: moment(Date.now()).format("LLL"),
              Sebep: `ʜᴇx: ${Hex}`,
              SebepX: `Hex: ${Hex}`,
              YetkiliAD: interaction.member.user.username,
              OyuncuAD: target.user.username,
              Olay: "WL ONAY",
              Yazı: `<a:5961darkbluetea:1327585257578561548> ・ **[WL ONAY]** ***${interaction.member} *tarafından* \`${Hex}\` *Hex adresi ile sunucuya başarılı bir şekilde kayıt edilmiştir.*`
      
            }
          },
          { upsert: true }
        );






        await SicilDB.findOneAndUpdate({ Sunucu: guild.id, Oyuncu: target.id },

          { $push:
          
            { Sicil:
              { 
                
                Yetkili: interaction.member.id,
                Tarih: moment(Date.now()).format("LLL"),
                Sebep: Hex,
                Olay: "[WL ONAY]",
                ID: `#${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`,
                
  
              } 
            } 
            }, 
            { upsert: true });



            await YetkiliDB.findOneAndUpdate({ Sunucu: guild.id, Yetkili: interaction.member.id },

              { $inc:
                  { 
                    
               WlOnay: 1,
               GWlOnay: 1,
               HWlOnay: 1,
               ToplamKayıt: 1
               
                  } 
                }, 
                { upsert: true });




                await SunucuDB.findOneAndUpdate({ Sunucu: guild.id },

                  { $inc:
                      { 
                        
             Whitelist: 1,
                        
                      } 
                    }, 
                    { upsert: true });



                    await KayıtDB.findOneAndUpdate({ Sunucu: guild.id, Oyuncu: target.id },

                      { $push:
                      
                        { Kayıtlar:
                          { 
                            
                            Yetkili: interaction.member.id,
                            Tarih: moment(Date.now()).format("LLL"),
                            Sebep: `\`${Hex}\``,
                            Durum: "<a:onay:1327600261698420767>",
                            ID: `#${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`,
                            
              
                          } 
                        } 
                        }, 
                        { upsert: true });





              
































  }})


        }






}















