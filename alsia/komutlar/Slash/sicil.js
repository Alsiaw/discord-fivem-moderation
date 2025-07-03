const { Permissions, ActionRowBuilder , ButtonStyle, ButtonBuilder, ComponentType, EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");
const ayarlar = require("../../../ayarlar.json")

const canvafy = require("canvafy")
const moment = require("moment");
moment.locale("tr")



const EtiketDB = require("../../../database/sicil.js")


module.exports = {
  data: new SlashCommandBuilder()
    .setName("sicil-sorgu")
    .setDescription("Discord ID'sinden Sorgulama Yaparsınız.")
	.addStringOption(option =>
        option.
           setName('id')
          .setDescription('ID giriniz lütfen örnek: 278152550627409921')
          .setRequired(true)
    ),




			alsia: async (client, interaction) => {
    
				const Oyuncu = interaction.options.getString('id')

				const guild = interaction.guild

    
              



                if(/@/i.test(Oyuncu)) return interaction.reply({ content: "*'<@>' > koymayınız örnek: 278152550627409921*" , ephemeral: true}).catch(() => {});

              
              
              
                const oyuncu = guild.members.cache.get(Oyuncu);


                const Warn = new EmbedBuilder()
                .setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
                .setColor("#490404")
                .setTimestamp()
                
                const roles = ayarlar.Yetkiler.Staff;

                if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")] , ephemeral: true })
                if (!oyuncu) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Geçerli bir oyuncu seçiniz.*")] , ephemeral: true })








                const row = new ActionRowBuilder()
                .addComponents(
            
            new ButtonBuilder()
            .setCustomId("öncex")
            .setLabel("Önceki Sayfa")
            .setStyle(ButtonStyle.Primary)
            .setEmoji("⏮️"),
            
            new ButtonBuilder()
            .setCustomId("kapatx")
            .setLabel("İptal")
            .setStyle(ButtonStyle.Danger)
            .setEmoji("❌"),
            
            new ButtonBuilder()
            .setCustomId("sonrax")
            .setLabel("Sonraki Sayfa")
            .setStyle(ButtonStyle.Primary)
            .setEmoji("⏭️"),
            
            );
           
           
       
       
   
               const Veri = await EtiketDB.findOne({ Oyuncu: Oyuncu });
               if (!Veri)  return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Bu etiket ID'sine ait hiç bir veri bulunmamaktadır.*")] , ephemeral: true })
               let page = 1;
               let rol = Veri.Sicil.sort((a, b) => b.Tarih - a.Tarih)
               let liste = rol.map((x , index) => `\`${index + 1}. - ${x.Olay} »\` \n\n <:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` <@${x.Yetkili}> \n  <a:5961darkbluetea:1327585257578561548> ・ \`ꜱᴇʙᴇᴘ/ʜᴇx: ${x.Sebep}\` \n  <a:duyuru:1327600220879716396> ・ \`ıᴅ: ${x.ID}\` \n   <a:utility:1327600287367696515> ・ \`ᴛᴀʀɪʜ: ${x.Tarih}\``)
            // let liste = rol.map((x , index) => `\`${index + 1}. - ${x.Olay} »\` \n\n **»** \`ʏᴇᴛᴋɪʟɪ:\` <@${x.Yetkili}> \n  **»** \`ꜱᴇʙᴇᴘ/ʜᴇx: ${x.Sebep}\` \n  **»** \`ıᴅ: ${x.ID}\` \n  **»** \`ᴛᴀʀɪʜ: ${x.Tarih}\``)

            var msg = await interaction.reply({ embeds: [new EmbedBuilder().setColor("#120f3f").setFooter({ text: `🌐 Sayfa #1`}).setThumbnail(oyuncu.user.avatarURL({dynamic: true})).setDescription(`${liste.slice(page == 1 ? 0 : page * 5 - 5, page * 5).join('\n\n')}`).setAuthor({ name: interaction.member.user.username, iconURL: guild.iconURL({ dynamic: true  }) })], components: [row]});
           
      
               var filter = (button) => button.user.id === interaction.member.id;
               let collector = await interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, filter, time: 60000 })
          
                 
          
   
       
   
               collector.on("collect", async (button) => {
                     


                // if (liste.length > 5) {
           
              if(button.customId === "sonrax") {
               await button.deferUpdate();
           

  
                           if (liste.slice((page + 1) * 5 - 5, (page + 1) * 5).length <= 0) return;
                           page += 1;
                           let rollogVeri = liste.slice(page == 1 ? 0 : page * 5 - 5, page * 5).join("\n\n");
                          await msg.edit({ embeds: [new EmbedBuilder().setFooter({text:`🌐 Sayfa #${page}`}).setThumbnail(oyuncu.user.avatarURL({dynamic: true})).setColor("#120f3f").setDescription(`${rollogVeri}`).setAuthor({ name: oyuncu.user.username, iconURL: guild.iconURL({ dynamic: true  }) })]});
           
                       }
               
              if(button.customId === "öncex") {
               await button.deferUpdate();
           
if (page == 1) return;

                           if (liste.slice((page - 1) * 5 - 5, (page - 1) * 5).length <= 0) return;
                           page -= 1;
                           let rollogVeri = liste.slice(page == 1 ? 0 : page * 5 - 5, page * 5).join("\n\n");
                           msg.edit({ embeds: [new EmbedBuilder().setFooter({text:`🌐 Sayfa #${page}`}).setThumbnail(oyuncu.user.avatarURL({dynamic: true})).setColor("#120f3f").setDescription(`${rollogVeri}`).setAuthor({ name: oyuncu.user.username, iconURL: guild.iconURL({ dynamic: true  }) })]});
                       }
              
            
                //    }
               
                   if(button.customId === "kapatx") {
                    await button.deferUpdate();
                
                    row.components[0].setDisabled(true) 
                    row.components[1].setDisabled(true) 
                    row.components[2].setDisabled(true) 
                    msg.edit({  components: [row] }); 
                
                            }   
               
               
               
               
               })
               








   
   
   
   
    }
 };
