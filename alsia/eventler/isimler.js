const { Collection, Events , EmbedBuilder,  AuditLogEvent} = require("discord.js")
const ayarlar = require("../../ayarlar.json");
const ms = require("ms")
const cooldown = new Collection()
const canvafy = require("canvafy")


const moment = require("moment")
moment.locale("tr")
require("moment-duration-format");

const GunlukDB = require("../../database/gunluk-veri")
const IDB = require("../../database/ID")
const EtiketDB = require("../../database/etiket-veri.js")
const İsimDB = require("../../database/isimler.js")
const YetkiliDB = require("../../database/yetkili-veri.js");

module.exports = {
	name: Events.GuildMemberUpdate,
	başlat: async(newMember, oldMember) => {




        if (newMember.guild.id !== ayarlar.Bot.SunucuID) return


        if (oldMember.nickname != newMember.nickname) {
      
            const oldNickname = oldMember.nickname || `${newMember.user.username}`;
            const newNickname = newMember.nickname || `${newMember.user.username}`;
           
      
            const fetchedLogs = await newMember.guild.fetchAuditLogs({
              limit: 1,
              type: AuditLogEvent.MemberUpdate,
            });
      
            const isimLOG = newMember.guild.channels.cache.get(ayarlar.LOG.isimLOG);
            if (!isimLOG) return;
      
            const isimlog = fetchedLogs.entries.first();
            if (!isimlog) return;
            const { executor, target } = isimlog;
      
            const Embed = new EmbedBuilder().setColor('#051b50').setFooter({ text: moment(Date.now()).format("LLL") })
      
            await GunlukDB.updateOne(
                      { Sunucu: oldMember.guild.id
                      },
                      {
                        $inc: {
                          İsim: 1       
                        }
                      },
                      { upsert: true }
                    );
   

                    if(executor.id == ayarlar.Bot.botID) {


                                  const messageUsersData = await IDB.find({ SunucuID: newMember.guild.id })
                      
                      
                      
                      
                                  const messageUsers = messageUsersData
                                      .splice(0, 100)
                                      .map((x, index) => `${x.ID}`)
                                      .join("\n");
                      
                                  isimLOG.send({embeds:[Embed.setFooter({ text: `Ⓜ️ İsimID: #${messageUsers} ・ ${moment(Date.now()).format("LLL")}`}).setAuthor({name:`${newMember.user.username} - ISIM GUNCELLENDI`,iconURL:newMember.user.avatarURL({dynamic:true})}).setDescription(`<a:unlemsel:1327600285597569066> ・ *Bir kullanıcının ismi bir yetkili tarafından* *başarılı bir şekilde güncellenmiştir!* 
                            
                                  <:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` | ${executor} | 
                                  <a:5961darkbluetea:1327585257578561548> ・ \`ᴋᴜʟʟᴀɴıᴄı:\` | ${newMember} |
                                    
                                  ***Eski İsim;***
                                  \`\`\`diff\n- ${newNickname}\`\`\`
                                  ***Yeni İsim;***
                                  \`\`\`diff\n+ ${oldNickname}\`\`\`
                                  `).setThumbnail(newMember.user.avatarURL({dynamic:true}))]}).catch(() => {});
                      
                      
                                  return false;
                                }
                      
                      
                      
                      
                                if(executor.id !== ayarlar.Bot.botID) {
                      
                                  await IDB.findOneAndUpdate(
                                    { SunucuID: newMember.guild.id
                                    },
                                    {
                                      $inc: {
                                        ID: 1       
                                      }
                                    },
                                    { upsert: true }
                                  );
                      
                      
                                  const messageUsersData = await IDB.find({ SunucuID: newMember.guild.id })
                      
                      
                      
                      
                                  const messageUsers = messageUsersData
                                      .splice(0, 100)
                                      .map((x, index) => `${x.ID}`)
                                      .join("\n");
                      
                      
                                  isimLOG.send({embeds:[Embed.setFooter({ text: `Ⓜ️ İsimID: #${messageUsers} ・ ${moment(Date.now()).format("LLL")}`}).setAuthor({name:`${newMember.user.username} - ISIM GUNCELLENDI`,iconURL:newMember.user.avatarURL({dynamic:true})}).setDescription(`<a:unlemsel:1327600285597569066> ・ *Bir kullanıcının ismi bir yetkili tarafından* *başarılı bir şekilde güncellenmiştir!* 
                            
                                  <:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` | ${executor} | 
                                  <a:5961darkbluetea:1327585257578561548> ・ \`ᴋᴜʟʟᴀɴıᴄı:\` | ${newMember} |
                                    
                                  ***Eski İsim;***
                                  \`\`\`diff\n- ${newNickname}\`\`\`
                                  ***Yeni İsim;***
                                  \`\`\`diff\n+ ${oldNickname}\`\`\`
                                  `).setThumbnail(newMember.user.avatarURL({dynamic:true}))]}).catch(() => {});
                      
                      
                      
                      
                      
                      
                      
                                  await EtiketDB.updateOne(
                                    { Sunucu: newMember.guild.id , ID: `#${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`},
                                    {
                                      $set: {
                                        Oyuncu: newMember.id,
                                        Yetkili: executor.id,
                                        Tarih: moment(Date.now()).format("LLL"),
                                        Sebep: `ıꜱıᴍ: ${newNickname}`,
                                        SebepX: `Yeni İsmi: ${newNickname}`,
                                        YetkiliAD: newMember.user.username,
                                        OyuncuAD: executor.username,
                                        Olay: "ISIM GUNCELLENDI",
                                
                                      }
                                    },
                                    { upsert: true }
                                  );
                          
                          
                          
                          
                                      await YetkiliDB.findOneAndUpdate({ Sunucu: newMember.guild.id, Yetkili: executor.id },
                          
                                        { $inc:
                                            { 
                                              
                                         İsim: 1,
                                         Gİsim: 1,
                                         Hİsim: 1,
                                         
                                            } 
                                          }, 
                                          { upsert: true });
                      
                      
                                  await İsimDB.findOneAndUpdate({ Sunucu: newMember.guild.id, Oyuncu: newMember.id },
                        
                                    { $push:
                                    
                                      { İsimler:
                                        { 
                                          
                                          Yetkili: executor.id,
                                          Tarih: moment(Date.now()).format("LLL"),
                                          Yİsim: newNickname,
                                          Eİsim: oldNickname,
                                          ID: `#${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`,
                                          
                            
                                        } 
                                      } 
                                      }, 
                                      { upsert: true });
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                                  return false;
                                }


        }








    }
}