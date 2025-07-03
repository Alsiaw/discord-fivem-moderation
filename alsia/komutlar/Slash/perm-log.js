const { Permissions, ActionRowBuilder , ButtonStyle, ButtonBuilder, ComponentType, EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");


const roller = require("../../../database/perm-log.js");
const moment = require("moment")
moment.locale("tr")

const ayarlar = require("../../../ayarlar.json")

module.exports = {
  data: new SlashCommandBuilder()
  .setName('perm-log')
.setDescription('Bir oyuncunun perm geçmişini kontrol edersiniz.')
  .addStringOption(option =>
    option.
       setName('id')
      .setDescription('ID giriniz lütfen örnek: 278152550627409921')
      .setRequired(true)
),
  




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
            
            new ButtonBuilder()
            .setCustomId("kapat")
            .setLabel("Sayfaları Kapat")
            .setStyle(ButtonStyle.Danger)
            .setEmoji("❌"),
            
            new ButtonBuilder()
            .setCustomId("sonra")
            .setLabel("Sonraki Sayfa")
            .setStyle(ButtonStyle.Primary)
            .setEmoji("⏭️"),
            
            );
        
        
    
    

            const Veri = await roller.findOne({ user: sebep });
            if (!Veri)  return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Bu etiket ID'sine ait hiç bir veri bulunmamaktadır.*")] , ephemeral: true })
            let page = 1;
            let rol = Veri.rolx.sort((a, b) => b.tarih - a.tarih)
            let liste = rol.map((x , index) => `\`${x.tarih}\` » **${x.state}** » <@${x.mod}> » <@&${x.rol}>`)
            var msg = await interaction.reply({ embeds: [new EmbedBuilder().setColor("#120f3f").setFooter({ text: "Sayfa #1"}).setThumbnail(interaction.member.user.avatarURL({dynamic: true})).setDescription(`${liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join('\n')}`).setTimestamp().setAuthor({ name: member.user.username, iconURL: guild.iconURL({ dynamic: true  }) })], components: [row]});
            // interaction.reply({ content: "*Veriler başarılı bir şekilde paylaşıldı.*", ephemeral: true}).catch(() => {});
        
        
            var filter = (button) => button.user.id === interaction.member.id;
            let collector = await interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, filter, time: 60000 })
       
              
       

    

            collector.on("collect", async (button) => {
                  


            //  if (liste.length > 10) {
        
           if(button.customId === "sonra") {
            await button.deferUpdate();
        

                        if (liste.slice((page + 1) * 10 - 10, (page + 1) * 10).length <= 0) return;
                        page += 1;
                        let rollogVeri = liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n");
                       await msg.edit({ embeds: [new EmbedBuilder().setFooter({text:`Sayfa #${page}`}).setThumbnail(member.user.avatarURL({dynamic: true})).setColor("#120f3f").setDescription(`${rollogVeri}`).setTimestamp().setAuthor({ name: member.user.username, iconURL: guild.iconURL({ dynamic: true  }) })]});
        
                    }
            
           if(button.customId === "önce") {
            await button.deferUpdate();
        
            if (page == 1) return;


                        if (liste.slice((page - 1) * 10 - 10, (page - 1) * 10).length <= 0) return;
                        page -= 1;
                        let rollogVeri = liste.slice(page == 1 ? 0 : page * 10 - 10, page * 10).join("\n");
                        msg.edit({ embeds: [new EmbedBuilder().setFooter({text:`Sayfa #${page}`}).setThumbnail(member.user.avatarURL({dynamic: true})).setColor("#120f3f").setDescription(`${rollogVeri}`).setTimestamp().setAuthor({ name: member.user.username, iconURL: guild.iconURL({ dynamic: true  }) })]});
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
