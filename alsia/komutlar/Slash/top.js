const { Permissions, ActionRowBuilder , StringSelectMenuBuilder , StringSelectMenuOptionBuilder, ButtonStyle, ButtonBuilder, ComponentType, EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");


const canvafy = require("canvafy")
const moment = require("moment");
const ayarlar = require('../../../ayarlar.json');
moment.locale("tr")






const messageUserChannel = require("../../../database/messageUserChannel");
const voiceUserChannel = require("../../../database/voiceUserChannel");
const messageUser = require("../../../database/messageUser");
const voiceUser = require("../../../database/voiceUser");
const voiceUserParent = require("../../../database/voiceUserParent");
const YetkiliDB = require("../../../database/yetkili-veri")
const HaftalıkDB = require("../../../database/haftalık-veri")









































module.exports = {
  data: new SlashCommandBuilder()
  .setName('top')
  .setDescription('Sunucudaki verileri görürsünüz.')

  .addStringOption(option =>
    option.setName('secenek')
      .setDescription('secım yapınız lutfen')
      .setRequired(true)
      .addChoices(
        { name: 'Mesaj', value: 'ac' },
        { name: 'Ses', value: 'kapat' },
        { name: 'Haftalık Kayıtlar', value: 'kayıt' },
        { name: 'Haftalık Cezalar', value: 'cezalar' },

      )),



			alsia: async (client, interaction) => {
    
                let guild = interaction.guild


                const {guildId,options,channel} = interaction;


                const secim = options.get("secenek").value;
                 const kanal = options.getChannel('channels')

             

    
                const Warn = new EmbedBuilder()
                .setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
                .setColor("#490404")
                .setTimestamp()
                
                const roles = ayarlar.Yetkiler.Staff;
                if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")] , ephemeral: true })







                const cezabuton = new ActionRowBuilder()
                .addComponents(
                
                new ButtonBuilder()
                .setCustomId("önceceza")
                .setLabel("Önceki Sayfa")
                .setStyle(ButtonStyle.Primary)
                .setEmoji("⏮️"),
                
                // new ButtonBuilder()
                // .setCustomId("kapatx")
                // .setLabel("İptal")
                // .setStyle(ButtonStyle.Danger)
                // .setEmoji("❌"),
                
                new ButtonBuilder()
                .setCustomId("sonraceza")
                .setLabel("Sonraki Sayfa")
                .setStyle(ButtonStyle.Primary)
                .setEmoji("⏭️"),
                
                );
                






                const row = new ActionRowBuilder()
                .addComponents(
                
                new ButtonBuilder()
                .setCustomId("öncex")
                .setLabel("Önceki Sayfa")
                .setStyle(ButtonStyle.Primary)
                .setEmoji("⏮️"),
                
                // new ButtonBuilder()
                // .setCustomId("kapatx")
                // .setLabel("İptal")
                // .setStyle(ButtonStyle.Danger)
                // .setEmoji("❌"),
                
                new ButtonBuilder()
                .setCustomId("sonrax")
                .setLabel("Sonraki Sayfa")
                .setStyle(ButtonStyle.Primary)
                .setEmoji("⏭️"),
                
                );
                
                
                





                const roww = new ActionRowBuilder()
                .addComponents(
                
                new ButtonBuilder()
                .setCustomId("öncexw")
                .setLabel("Önceki Sayfa")
                .setStyle(ButtonStyle.Primary)
                .setEmoji("⏮️"),
                
                // new ButtonBuilder()
                // .setCustomId("kapatx")
                // .setLabel("İptal")
                // .setStyle(ButtonStyle.Danger)
                // .setEmoji("❌"),
                
                new ButtonBuilder()
                .setCustomId("sonraxw")
                .setLabel("Sonraki Sayfa")
                .setStyle(ButtonStyle.Primary)
                .setEmoji("⏭️"),
                
                );
                



                const mesajrow = new ActionRowBuilder()
                .addComponents(
                
                new ButtonBuilder()
                .setCustomId("öncemesaj")
                .setLabel("Önceki Sayfa")
                .setStyle(ButtonStyle.Primary)
                .setEmoji("⏮️"),
                
                // new ButtonBuilder()
                // .setCustomId("kapatx")
                // .setLabel("İptal")
                // .setStyle(ButtonStyle.Danger)
                // .setEmoji("❌"),
                
                new ButtonBuilder()
                .setCustomId("sonramesaj")
                .setLabel("Sonraki Sayfa")
                .setStyle(ButtonStyle.Primary)
                .setEmoji("⏭️"),
                
                );




                const sesrow = new ActionRowBuilder()
                .addComponents(
                
                new ButtonBuilder()
                .setCustomId("önceses")
                .setLabel("Önceki Sayfa")
                .setStyle(ButtonStyle.Primary)
                .setEmoji("⏮️"),
                
                // new ButtonBuilder()
                // .setCustomId("kapatx")
                // .setLabel("İptal")
                // .setStyle(ButtonStyle.Danger)
                // .setEmoji("❌"),
                
                new ButtonBuilder()
                .setCustomId("sonrases")
                .setLabel("Sonraki Sayfa")
                .setStyle(ButtonStyle.Primary)
                .setEmoji("⏭️"),
                
                );



                const id = Math.floor(Math.random() * 99999) + 10000;



















































                switch(secim){
                  case "ac":
    



                  const messageUsersData = await messageUser.find({ guildID: interaction.guild.id }).sort({ topStat: -1 });

                  const messageTop = [];



                 messageUsersData.filter(alsia => interaction.guild.members.cache.get(alsia.userID)).map(async (x, index) => { messageTop.push({ top: index + 1, avatar: interaction.guild.members.cache.get(x.userID).user.displayAvatarURL({ extension: "png", forceStatic: true }), tag: interaction.guild.members.cache.get(x.userID).user.username, score: `${Number(x.topStat).toLocaleString()}` }) })

              

                 let page = 1;



                 const messageTopCanvas = await new canvafy.Top()
                 .setOpacity(0.7)
                 .setScoreMessage(`Mesaj:`)
                 .setabbreviateNumber(false)
.setBackground("image", ayarlar.Resimler.moderasyonURL)
                 .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff',  firstRank: '#0cd0e2', secondRank: '#f7c716', thirdRank: '#94610f' })
                 .setUsersData(messageTop.slice(page == 1 ? 0 : page * 5 - 5, page * 5))
                 .build();

                const mesajedit = await interaction.deferReply({ })

           
                 
                await interaction.editReply({files: [{ attachment: messageTopCanvas , name: `alsia-profile.png`    }]  , components: [mesajrow]   }).catch(() => {});
                 
                 
        





                 var filter = (button) => button.user.id === interaction.member.id;
                 let collector = await interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, filter, time: 60000 })  
                 
                 
                 





                 collector.on("collect", async (button) => {
                     



                  if(button.customId === "sonramesaj") {
                    await button.deferUpdate();
                  
                  
                               if (messageTop.slice((page + 1) * 5 - 5, (page + 1) * 5).length <= 0) return;
                               page += 1;
                               const rollogVeri = messageTop.slice(page == 1 ? 0 : page * 5 - 5, page * 5);
                           
                           
                               const messageTopCanvasXA = await new canvafy.Top()
                               .setOpacity(0.7)
                               .setScoreMessage(`Mesaj:`)
                               .setabbreviateNumber(false)
                               .setBackground("image", ayarlar.Resimler.moderasyonURL)
                               .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff',  firstRank: '#0cd0e2', secondRank: '#f7c716', thirdRank: '#94610f' })
                               .setUsersData(rollogVeri)
                               .build();
                           
                           
                               await mesajedit.edit({ files: [{ attachment: messageTopCanvasXA , name: `alsia-profile.png`    }]  })
                  
                  
                  
                              //  await button.deferUpdate();
                  
                  
                  
                           }
                   
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  if(button.customId === "öncemesaj") {
                  
                  if (page == 1) return;
                  await button.deferUpdate();

                  
                  
                  
                  
                  
                  if (messageTop.slice((page - 1) * 5 - 5, (page - 1) * 5).length <= 0) return;
                  page -= 1;
                  const rollogVeri = messageTop.slice(page == 1 ? 0 : page * 5 - 5, page * 5);
                  
                  
                  const messageTopCanvasXA = await new canvafy.Top()
                  .setOpacity(0.7)
                  .setScoreMessage(`Mesaj:`)
                  .setabbreviateNumber(false)
                  .setBackground("image", ayarlar.Resimler.moderasyonURL)
                  .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff',  firstRank: '#0cd0e2', secondRank: '#f7c716', thirdRank: '#94610f' })
                  .setUsersData(rollogVeri)
                  .build();
                  
                  
                  await mesajedit.edit({ files: [{ attachment: messageTopCanvasXA , name: `alsia-profile.png`    }]  }).deferUpdate();
                  // await button.deferUpdate();

                  
                           }
                  
                  
                  
                  
                          })










































              
                      


            












































































































                  break;
                  case "kapat":
    
















                  const voiceUsersData = await voiceUser.find({ guildID: interaction.guild.id }).sort({ topStat: -1 });
              
                  const voiceTop = []

                  voiceUsersData.filter(alsia => interaction.guild.members.cache.get(alsia.userID)).map(async (x, index) => { voiceTop.push({ top: index + 1, avatar: interaction.guild.members.cache.get(x.userID).user.displayAvatarURL({ extension: "png", forceStatic: true }), tag: interaction.guild.members.cache.get(x.userID).user.username, score: `${moment.duration(x.topStat).format("H [Saat], m [Dakika]")}` }) })

              
 
 
 
      


                  if (voiceTop.length > 0) {
              
                    let pagex = 1;

                    const VoiceTopGörselX = await new canvafy.Top()
                    .setOpacity(0.7)
                    .setScoreMessage(``)
                    .setabbreviateNumber(false)
                    .setBackground("image", ayarlar.Resimler.moderasyonURL)
                    .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff',  firstRank: '#0cd0e2', secondRank: '#f7c716', thirdRank: '#94610f' })
                    .setUsersData(voiceTop.slice(pagex == 1 ? 0 : pagex * 5 - 5, pagex * 5) )
                    .build();










                    const msgwwq =  await interaction.deferReply({  }).catch(() => {});


                    
                      await interaction.editReply({files: [{ attachment: VoiceTopGörselX , name: `alsia-profile.png`    }]  , components: [sesrow]   }).catch(() => {});
                    
              









                    var filter = (button) => button.user.id === interaction.member.id;
                    let collector = await interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, filter, time: 60000 })  
                    
                    
                    
   
   
   
   
   
                    collector.on("collect", async (button) => {
                        
   
   
   
                     if(button.customId === "sonrases") {
                      await button.deferUpdate();
                     
                     
                     
                                  if (voiceTop.slice((pagex + 1) * 5 - 5, (pagex + 1) * 5).length <= 0) return;
                                  pagex += 1;
                                  const rollogVeri = voiceTop.slice(pagex == 1 ? 0 : pagex * 5 - 5, pagex * 5);
                              
                              
                                  const SWSAW = await new canvafy.Top()
                                  .setOpacity(0.7)
                                  .setScoreMessage(``)
                                  .setabbreviateNumber(false)
                                  .setBackground("image", ayarlar.Resimler.moderasyonURL)
                                  .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff',  firstRank: '#0cd0e2', secondRank: '#f7c716', thirdRank: '#94610f' })
                                  .setUsersData(rollogVeri)
                                  .build();
                              
                              
                                  await msgwwq.edit({ files: [{ attachment: SWSAW , name: `alsia-profile.png`    }]  });
                     
                     
                     
                     
                     
                     
                              }
                      
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     if(button.customId === "önceses") {
                      await button.deferUpdate();
                     
                     if (pagex == 1) return;
                     
                     
                     
                     
                     
                     
                     if (voiceTop.slice((pagex - 1) * 5 - 5, (pagex - 1) * 5).length <= 0) return;
                     pagex -= 1;
                     const rollogVeri = voiceTop.slice(pagex == 1 ? 0 : pagex * 5 - 5, pagex * 5);
                     
                     
                     const SESXW = await new canvafy.Top()
                     .setOpacity(0.7)
                     .setScoreMessage(``)
                     .setabbreviateNumber(false)
                     .setBackground("image", ayarlar.Resimler.moderasyonURL)
                     .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff',  firstRank: '#0cd0e2', secondRank: '#f7c716', thirdRank: '#94610f' })
                     .setUsersData(rollogVeri)
                     .build();
                     
                     
                     await msgwwq.edit({ files: [{ attachment: SESXW , name: `alsia-profile.png`    }]  });
                     
                     
                              }
                     
                     
                     
                     
                             })
   
   























































                  }














































































                  break;
                  case "kayıt":
    









                  const YetkiliDatabase = await HaftalıkDB.find({ Sunucu: interaction.guild.id }).sort({ ToplamKayıt: -1 });

                  const kayıtTop = [];



                  YetkiliDatabase.filter(alsia => interaction.guild.members.cache.get(alsia.Yetkili)).map(async (x, index) => { kayıtTop.push({ top: index + 1, avatar: interaction.guild.members.cache.get(x.Yetkili).user.displayAvatarURL({ extension: "png", forceStatic: true }), tag: interaction.guild.members.cache.get(x.Yetkili).displayName, score: ` ONAY: ${x.HWlOnay} - RED: ${x.HWlRed} ` }) })

              
                 let pagew = 1;



        













                  if (kayıtTop.length > 0) {
                 


                    const KayıtTopCavnas = await new canvafy.Top()
                    .setOpacity(0.7)
                    .setScoreMessage(``)
                    .setabbreviateNumber(false)
                    .setBackground("image", ayarlar.Resimler.moderasyonURL)
                    .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff',  firstRank: '#0cd0e2', secondRank: '#f7c716', thirdRank: '#94610f' })
                    .setUsersData(kayıtTop.slice(pagew == 1 ? 0 : pagew * 5 - 5, pagew * 5) )
                    .build();





                    // await interaction.channel.send({files: [{ attachment: KayıtTopCavnas , name: `alsia-profile.png`    }]  , components: [rows]   }).catch(() => {});





                  const msgwq =  await interaction.deferReply({  }).catch(() => {});

                    
                      await interaction.editReply({files: [{ attachment: KayıtTopCavnas , name: `alsia-profile.png`    }]  , components: [row]   }).catch(() => {});
                    
                    
   
   
   
   
                    var filter = (button) => button.user.id === interaction.member.id;
                    let collector = await interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, filter })  
                    
                    
                    
   
   
   
   
   
                    collector.on("collect", async (button) => {
                        
   
   
   
                     if(button.customId === "sonrax") {
                      await button.deferUpdate();
                     
                     
                     
                                  if (kayıtTop.slice((pagew + 1) * 5 - 5, (pagew + 1) * 5).length <= 0) return;
                                  pagew += 1;
                                  const rollogVeri = kayıtTop.slice(pagew == 1 ? 0 : pagew * 5 - 5, pagew * 5);
                              
                              
                                  const KAYITA = await new canvafy.Top()
                                  .setOpacity(0.7)
                                  .setScoreMessage(``)
                                  .setabbreviateNumber(false)
                                  .setBackground("image", ayarlar.Resimler.moderasyonURL)
                                  .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff',  firstRank: '#0cd0e2', secondRank: '#f7c716', thirdRank: '#94610f' })
                                  .setUsersData(rollogVeri)
                                  .build();
                              
                              
                                  await msgwq.edit({ files: [{ attachment: KAYITA , name: `alsia-profile.png`    }]  });
                     
                     
                     
                     
                     
                     
                              }
                      
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     
                     if(button.customId === "öncex") {
                      await button.deferUpdate();
                     
                     if (pagew == 1) return;
                     
                     
                     
                     
                     
                     
                     if (kayıtTop.slice((pagew - 1) * 5 - 5, (pagew - 1) * 5).length <= 0) return;
                     pagew -= 1;
                     const rollogVeri = kayıtTop.slice(pagew == 1 ? 0 : pagew * 5 - 5, pagew * 5);
                     
                     
                     const KAYITW = await new canvafy.Top()
                     .setOpacity(0.7)
                     .setScoreMessage(``)
                     .setabbreviateNumber(false)
                     .setBackground("image", ayarlar.Resimler.moderasyonURL)
                     .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff',  firstRank: '#0cd0e2', secondRank: '#f7c716', thirdRank: '#94610f' })
                     .setUsersData(rollogVeri)
                     .build();
                     
                     
                     await msgwq.edit({ files: [{ attachment: KAYITW , name: `alsia-profile.png`    }]  });
                     
                     
                              }
                     
                     
                     
                     
                             })
   
   
   
   
   














































































                      }


























                      break;
                      case "cezalar":
        






                      const YetkiliDBCEZA = await YetkiliDB.find({ Sunucu: interaction.guild.id }).sort({ HWlCeza: -1 , HUyarı: -1 });

                      const CezalarTop = [];
    
    
    
                      YetkiliDBCEZA.filter(alsia => interaction.guild.members.cache.get(alsia.Yetkili)).map(async (x, index) => { CezalarTop.push({ top: index + 1, avatar: interaction.guild.members.cache.get(x.Yetkili).user.displayAvatarURL({ extension: "png", forceStatic: true }), tag: interaction.guild.members.cache.get(x.Yetkili).displayName, score: `UYARI: ${x.HUyarı} - WL CEZA: ${x.HWlCeza} ` }) })
    
                  
                     let pageceza = 1;
    
    
    
            
    
    
    
    
    
    
    
    
    
    
    
    
    
                      if (CezalarTop.length > 0) {
                     
    
    
                        const CezaCanvas = await new canvafy.Top()
                        .setOpacity(0.7)
                        .setScoreMessage(``)
                        .setabbreviateNumber(false)
                        .setBackground("image", ayarlar.Resimler.moderasyonURL)
                        .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff',  firstRank: '#0cd0e2', secondRank: '#f7c716', thirdRank: '#94610f' })
                        .setUsersData(CezalarTop.slice(pageceza == 1 ? 0 : pageceza * 5 - 5, pageceza * 5) )
                        .build();
    
    
    
    
    
                        // await interaction.channel.send({files: [{ attachment: KayıtTopCavnas , name: `alsia-profile.png`    }]  , components: [rows]   }).catch(() => {});
    
    
    
    
    
                      const cezamesaj =  await interaction.deferReply({  }).catch(() => {});
    
                        
                          await interaction.editReply({files: [{ attachment: CezaCanvas , name: `alsia-profile.png`    }]  , components: [cezabuton]   }).catch(() => {});
                        
                        
       
       
       
       
                        var filter = (button) => button.user.id === interaction.member.id;
                        let collector = await interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, filter })  
                        
                        
                        
       
       
       
       
       
                        collector.on("collect", async (button) => {
                            
       
       
       
                         if(button.customId === "sonraceza") {
                          await button.deferUpdate();
                         
                         
                         
                                      if (CezalarTop.slice((pageceza + 1) * 5 - 5, (pageceza + 1) * 5).length <= 0) return;
                                      pageceza += 1;
                                      const rollogVeri = CezalarTop.slice(pageceza == 1 ? 0 : pageceza * 5 - 5, pageceza * 5);
                                  
                                  
                                      const KAYITA = await new canvafy.Top()
                                      .setOpacity(0.7)
                                      .setScoreMessage(``)
                                      .setabbreviateNumber(false)
                                      .setBackground("image", ayarlar.Resimler.moderasyonURL)
                                      .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff',  firstRank: '#0cd0e2', secondRank: '#f7c716', thirdRank: '#94610f' })
                                      .setUsersData(rollogVeri)
                                      .build();
                                  
                                  
                                      await cezamesaj.edit({ files: [{ attachment: KAYITA , name: `alsia-profile.png`    }]  });
                         
                         
                         
                         
                         
                         
                                  }
                          
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         
                         if(button.customId === "önceceza") {
                          await button.deferUpdate();
                         
                         if (pageceza == 1) return;
                         
                         
                         
                         
                         
                         
                         if (CezalarTop.slice((pageceza - 1) * 5 - 5, (pageceza - 1) * 5).length <= 0) return;
                         pageceza -= 1;
                         const rollogVeri = CezalarTop.slice(pageceza == 1 ? 0 : pageceza * 5 - 5, pageceza * 5);
                         
                         
                         const KAYITW = await new canvafy.Top()
                         .setOpacity(0.7)
                         .setScoreMessage(``)
                         .setabbreviateNumber(false)
                         .setBackground("image", ayarlar.Resimler.moderasyonURL)
                         .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff',  firstRank: '#0cd0e2', secondRank: '#f7c716', thirdRank: '#94610f' })
                         .setUsersData(rollogVeri)
                         .build();
                         
                         
                         await cezamesaj.edit({ files: [{ attachment: KAYITW , name: `alsia-profile.png`    }]  });
                         
                         
                                  }
                         
                         
                         
                         
                                 })
       
       
       
       
       
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
                          }






























                  break;
                  default:
                      interaction.reply("Seçeneksiz İşlem Yapamazsın.").catch(() => {});
                      break;
                  
                  
                  }
    
    
    





   
   
    }
 };


 
