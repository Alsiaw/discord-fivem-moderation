 const { ContextMenuCommandBuilder , ApplicationCommandType , Events, ModalBuilder, TextInputBuilder, TextInputStyle , ActionRowBuilder ,  ButtonStyle, ButtonBuilder, ComponentType , EmbedBuilder, MessageActionRow, MessageButton,MessageEmbed,Client,CommandInteraction } = require('discord.js');

const canvafy = require("canvafy")
const moment = require("moment")
moment.locale("tr")
const discordModals = require('discord-modals');
const { Modal, TextInputComponent, SelectMenuComponent, showModal  } = require('discord-modals');
 const client = global.client;




const HexlerDB = require("../../../database/hexler.js");
const HexDB = require("../../../database/oyuncu-hex.js");
const ayarlar = require('../../../ayarlar.json');


module.exports = {
  data: new ContextMenuCommandBuilder()
          .setName('Hex Ekle')
          .setType(ApplicationCommandType.User),



          alsia: async (client, interaction) => {




           const guild = interaction.guild




           const target = interaction.member.guild.members.cache.get(interaction.targetId);
           const targetId = interaction.targetId

           const id = Math.floor(Math.random() * 99999) + 1000000;
//            const modal = new ModalBuilder()
//            .setCustomId('hexX-sistemi')
//            .setTitle(`${ayarlar.Embed.FormAD} - HEX SISTEMI`)

//            const favoriteColorInput = new TextInputBuilder()
//            .setCustomId('hesx')
//            .setLabel("Hex?")
//            .setStyle(TextInputStyle.Short)
//            .setRequired(true)
// .setMaxLength(17)
// .setPlaceholder('1100001418f23c8')

//            const secondActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);

//            modal.addComponents( secondActionRow);
       
//            await interaction.showModal(modal);



 





// // const modalxw = new Modal() 
// // .setCustomId(`myModal-${targetId}`)
// // .setTitle(`${ayarlar.Embed.FormAD} - HEX EKLE`)
// // .addComponents([
// //   new TextInputComponent()
// //     .setCustomId('hex')
// //     .setLabel('Hex?')
// //     .setStyle('SHORT')
// //     .setMinLength(0)
// //     .setMaxLength(17)
// //     .setPlaceholder('1100001418f23c8')
// //     .setRequired(true),
   

// // ]);




// // showModal(modalxw, {
// // client,
// // interaction,
// // });







// client.on('modalSubmit', async (modal) => {



  
//   if(modal.customId == `myModal-${targetId}`) {


//     const Hex = modal.getTextInputValue('hex')





// const Warn = new EmbedBuilder()
// .setAuthor({ name: modal.member.user.username , iconURL: modal.member.user.avatarURL({dynamic: true})})
// .setColor("#490404")
// .setTimestamp()

// const roles = ayarlar.Yetkiler.Staff;

// if (!modal.member.roles.cache.find(r => roles.includes(r.id))) return modal.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")]  })
// if (!target) return modal.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Geçerli bir oyuncu seçiniz.*")]  })
// if (modal.member.id == targetId) return modal.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Kendinemi Onay Vericeksin.*")]  })









// await modal.reply({ content: `${target} hex adresin güncellendi.` , ephemeral: true } );

// await target.roles.add(ayarlar.Permler.KarakterOnay).catch(() => {});




//                 const embedV2 = new EmbedBuilder()
//                 .setDescription(`<:8676gasp:1327585524231176192> ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}
//                 <a:5961darkbluetea:1327585257578561548> ・ \`ᴏʏᴜɴᴄᴜ:\` <@${targetId}>
                
//                 `)
//                 .setFooter({ text: `Ⓜ️ ${moment(Date.now()).format("LLL")}` })
//                                       .setAuthor({
//                                       name: `${ayarlar.Embed.authorembed} - ʜᴇx ꜱıꜱᴛᴇᴍı`, 
//                                       iconURL: guild.iconURL({dynamic: true})})
//                                       .setThumbnail(target.user.avatarURL({ dynamic: true }))
//                                       .setColor("#051b50")
//                                       .addFields(
//                                            { name: "**HEX:**",  value: `\`\`\`fix
// » ${Hex}\`\`\`
//                                            `, inline: true })

// await guild.channels.cache.get(ayarlar.KomutLOG.Hex).send({ embeds: [embedV2] })



//                         await HexDB.findOneAndUpdate({ Sunucu: guild.id , Oyuncu: targetId },
  
//                           { $set:
//                               { 
                                
//                      Hex: Hex,
                                
//                               } 
//                             }, 
//                             { upsert: true });
  
    
    
//                         await HexlerDB.findOneAndUpdate({ Sunucu: guild.id, Hex: Hex },
    
//                             { $push:
                            
//                               { Oyuncular:
//                                 { 
                                  
//                                   Oyuncu: targetId,
//                                   Yetkili: modal.member.id,
//                                   Hex: Hex,
//                                   Tarih: moment(Date.now()).format("LLL")
                                  
                    
//                                 } 
//                               } 
//                               }, 
//                               { upsert: true });

                           
// return guild.channels.cache.get("1029916185178947604").send({ content:  `!wlekle steam:${Hex} ${target}` })








//   }


// })




const modal = new ModalBuilder()
.setCustomId(`hexEkleme-${id}`)
.setTitle(`${ayarlar.Embed.FormAD} - HEX EKLE`);


const favoriteColorInput = new TextInputBuilder()
.setCustomId('hex')
.setLabel("Hex?")
.setStyle(TextInputStyle.Short);



const secondActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);

modal.addComponents(secondActionRow);

await interaction.showModal(modal).catch(() => {});















           client.on("interactionCreate", async interaction => {


            if (interaction.customId === `hexEkleme-${id}`) {

              const Hex = interaction.fields.getTextInputValue('hex');





const Warn = new EmbedBuilder()
.setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
.setColor("#490404")
.setTimestamp()

const roles = ayarlar.Yetkiler.Staff;

if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")]  })
if (!target) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Geçerli bir oyuncu seçiniz.*")]  })
if (interaction.member.id == target.id) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Kendinemi Onay Vericeksin.*")]  })





await interaction.deferReply({ ephemeral: true })

await interaction.editReply({ content: `${target} hex adresin güncellendi.` , ephemeral: true } );

await target.roles.add(ayarlar.Permler.KarakterOnay).catch(() => {});




                const embedV2 = new EmbedBuilder()
                .setDescription(`<:8676gasp:1327585524231176192> ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}
                <a:5961darkbluetea:1327585257578561548> ・ \`ᴏʏᴜɴᴄᴜ:\` <@${targetId}>
                
                `)
                .setFooter({ text: `Ⓜ️ ${moment(Date.now()).format("LLL")}` })
                                      .setAuthor({
                                      name: `${ayarlar.Embed.authorembed} - ʜᴇx ꜱıꜱᴛᴇᴍı`, 
                                      iconURL: guild.iconURL({dynamic: true})})
                                      .setThumbnail(target.user.avatarURL({ dynamic: true }))
                                      .setColor("#051b50")
                                      .addFields(
                                           { name: "**HEX:**",  value: `\`\`\`fix
» ${Hex}\`\`\`
                                           `, inline: true })

await guild.channels.cache.get(ayarlar.KomutLOG.Hex).send({ embeds: [embedV2] })



                        await HexDB.findOneAndUpdate({ Sunucu: guild.id , Oyuncu: targetId },
  
                          { $set:
                              { 
                                
                     Hex: Hex,
                                
                              } 
                            }, 
                            { upsert: true });
  
    
    
                        await HexlerDB.findOneAndUpdate({ Sunucu: guild.id, Hex: Hex },
    
                            { $push:
                            
                              { Oyuncular:
                                { 
                                  
                                  Oyuncu: targetId,
                                  Yetkili: interaction.member.id,
                                  Hex: Hex,
                                  Tarih: moment(Date.now()).format("LLL")
                                  
                    
                                } 
                              } 
                              }, 
                              { upsert: true });

                  
                              if(ayarlar.Uyarı.WlEkleme == false) return;

return guild.channels.cache.get(ayarlar.Uyarı.WlEklemeOda).send({ content:  `!wlekle steam:${Hex} ${target}` })












            
            
            
      
            }
            
            
          

           })


           return 













    //         const modal = new Modal() 
    //         .setCustomId('hexX-sistemi')
    //         .setTitle(`${ayarlar.Embed.FormAD} - HEX SISTEMI`)
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
      
           







// client.on('modalSubmit', async (modal) => {



  
//   if(modal.customId == 'hexX-sistemi') {


//     const Hex = modal.getTextInputValue('hex')
//     interaction.reply({ content: `${interaction.targetMember} => ${Hex}`})




//     return



//   }
 
//     const target = interaction.member.guild.members.cache.get(interaction.targetId);








// const Warn = new EmbedBuilder()
// .setAuthor({ name: modal.member.user.username , iconURL: modal.member.user.avatarURL({dynamic: true})})
// .setColor("#490404")
// .setTimestamp()

// const roles = ayarlar.Yetkiler.Staff;

// if (!modal.member.roles.cache.find(r => roles.includes(r.id))) return modal.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")]  })
// if (!target) return modal.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Geçerli bir oyuncu seçiniz.*")]  })
// if (modal.member.id == target.id) return modal.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Kendinemi Onay Vericeksin.*")]  })































































































// await target.roles.add(ayarlar.Permler.KarakterOnay).catch(() => {});





















//                 const embedV2 = new EmbedBuilder()
//                 .setDescription(`<:8676gasp:1327585524231176192> ・ \`ʏᴇᴛᴋıʟı:\` ${modal.member}
//                 <a:5961darkbluetea:1327585257578561548> ・ \`ᴏʏᴜɴᴄᴜ:\` <@${interaction.targetId}>
                
//                 `)
//                 .setFooter({ text: `Ⓜ️ ${moment(Date.now()).format("LLL")}` })
//                                       .setAuthor({
//                                       name: `${ayarlar.Embed.authorembed} - ʜᴇx ꜱıꜱᴛᴇᴍı`, 
//                                       iconURL: guild.iconURL({dynamic: true})})
//                                       .setThumbnail(target.user.avatarURL({ dynamic: true }))
//                                       .setColor("#051b50")
//                                       .addFields(
//                                            { name: "**HEX:**",  value: `\`\`\`fix
// » ${Hex}\`\`\`
//                                            `, inline: true })

// await guild.channels.cache.get(ayarlar.KomutLOG.Hex).send({ embeds: [embedV2] })



//                         await HexDB.findOneAndUpdate({ Sunucu: guild.id , Oyuncu: interaction.targetId },
  
//                           { $set:
//                               { 
                                
//                      Hex: Hex,
                                
//                               } 
//                             }, 
//                             { upsert: true });
  
    
    
//                         await HexlerDB.findOneAndUpdate({ Sunucu: guild.id, Hex: Hex },
    
//                             { $push:
                            
//                               { Oyuncular:
//                                 { 
                                  
//                                   Oyuncu: interaction.targetId,
//                                   Yetkili: modal.member.id,
//                                   Hex: Hex,
//                                   Tarih: moment(Date.now()).format("LLL")
                                  
                    
//                                 } 
//                               } 
//                               }, 
//                               { upsert: true });

//                             await  modal.reply({ content: `<@${interaction.targetId}> hex adresin güncellendi.` }).catch(() => {});
// return guild.channels.cache.get("1029916185178947604").send({ content:  `!wlekle steam:${Hex} ${target}` })

































  // })


















        }






}















