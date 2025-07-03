const { Permissions, ActionRowBuilder , ButtonStyle, ButtonBuilder, ComponentType, EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");


const KayıtDB = require("../../../database/kayıtlar.js");
const moment = require("moment")
moment.locale("tr")
const ayarlar = require('../../../ayarlar.json');



module.exports = {
  data: new SlashCommandBuilder()
  .setName('kayıtlar')
  .setDescription('Replies with your input!')
  .addStringOption(stringOption =>
    stringOption
      .setName('id')
      .setDescription("Oyuncu ID giriniz."))
      .setDMPermission(true),

  




			alsia: async (client, interaction) => {
    
                let guild = interaction.guild

                const sebep = interaction.options.getString('id')
                const member = guild.members.cache.get(sebep);

    
    





                const Warn = new EmbedBuilder()
                .setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
                .setColor("#490404")
                .setTimestamp()
                
                const roles = ayarlar.Yetkiler.Staff;
                
                if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")] , ephemeral: true })
                if (!member) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Geçerli bir oyuncu seçiniz.*")] , ephemeral: true })


















                const row = new ActionRowBuilder()
                .addComponents(
            
            new ButtonBuilder()
            .setCustomId("önce")
            .setLabel("Önceki Sayfa")
            .setStyle(ButtonStyle.Primary)
            .setEmoji("⏮️"),
            
            // new ButtonBuilder()
            // .setCustomId("kapat")
            // .setLabel("Sayfaları Kapat")
            // .setStyle(ButtonStyle.Danger)
            // .setEmoji("❌"),
            
            new ButtonBuilder()
            .setCustomId("sonra")
            .setLabel("Sonraki Sayfa")
            .setStyle(ButtonStyle.Primary)
            .setEmoji("⏭️"),
            
            );
        
        
    
    

            const Veri = await KayıtDB.findOne({ Oyuncu: sebep });
            if (!Veri) return interaction.reply({ content: "<@" + sebep + "> kişisinin rol bilgisi veritabanında bulunmadı."}).catch(() => {});
            let page = 1;
            let rol = Veri.Kayıtlar.sort((a, b) => b.Tarih - a.Tarih)
            let liste = rol.map((x , index) => `\`${index + 1}.\` - ${x.Durum} \n\n <:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` <@${x.Yetkili}> \n  <a:5961darkbluetea:1327585257578561548> ・ \`ꜱᴇʙᴇᴘ/ʜᴇx:\` ${x.Sebep} \n  <a:duyuru:1327600220879716396> ・ \`ıᴅ: ${x.ID}\` \n   <a:utility:1327600287367696515> ・ \`ᴛᴀʀɪʜ: ${x.Tarih}\``)
            var msg = await interaction.reply({ embeds: [new EmbedBuilder().setColor("#120f3f").setFooter({ text: "Sayfa #1"}).setThumbnail(interaction.member.user.avatarURL({dynamic: true})).setDescription(`${liste.slice(page == 1 ? 0 : page * 5 - 5, page * 5).join('\n\n')}`).setTimestamp().setAuthor({ name: interaction.member.user.username, iconURL: guild.iconURL({ dynamic: true  }) })], components: [row]});
            // interaction.reply({ content: "*Veriler başarılı bir şekilde paylaşıldı.*", ephemeral: true}).catch(() => {});
        
        
            var filter = (button) => button.user.id === interaction.member.id;
            let collector = await interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, filter, time: 60000 })
       
              
       

    

            collector.on("collect", async (button) => {
                  


            //  if (liste.length > 10) {
        
           if(button.customId === "sonra") {
            await button.deferUpdate();
        

                        if (liste.slice((page + 1) * 5 - 5, (page + 1) * 5).length <= 0) return;
                        page += 1;
                        let rollogVeri = liste.slice(page == 1 ? 0 : page * 5 - 5, page * 5).join("\n\n");
                       await msg.edit({ embeds: [new EmbedBuilder().setFooter({text:`Sayfa #${page}`}).setThumbnail(member.user.avatarURL({dynamic: true})).setColor("#120f3f").setDescription(`${rollogVeri}`).setTimestamp().setAuthor({ name: interaction.member.user.username, iconURL: guild.iconURL({ dynamic: true  }) })]});
        
                    }
            
           if(button.customId === "önce") {
            await button.deferUpdate();
        
            if (page == 1) return;


                        if (liste.slice((page - 1) * 5 - 5, (page - 1) * 5).length <= 0) return;
                        page -= 1;
                        let rollogVeri = liste.slice(page == 1 ? 0 : page * 5 - 5, page * 5).join("\n\n");
                        msg.edit({ embeds: [new EmbedBuilder().setFooter({text:`Sayfa #${page}`}).setThumbnail(member.user.avatarURL({dynamic: true})).setColor("#120f3f").setDescription(`${rollogVeri}`).setTimestamp().setAuthor({ name: interaction.member.user.username, iconURL: guild.iconURL({ dynamic: true  }) })]});
                    }
           

                // }
            
                if(button.customId === "kapat") {
                  await button.deferUpdate();
              
                  row.components[0].setDisabled(true) 
                  row.components[1].setDisabled(true) 
                  row.components[2].setDisabled(true) 
                  msg.edit({  components: [row] }); 
              
                          }  
            
            
            
            
            })
            
            //   })
        
        
    
    
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
    }
 };
