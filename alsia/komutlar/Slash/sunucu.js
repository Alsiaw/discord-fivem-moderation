const { Permissions, ActionRowBuilder , ButtonStyle, ButtonBuilder, ComponentType, EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");


const moment = require("moment");
const ayarlar = require('../../../ayarlar.json');
moment.locale("tr")



module.exports = {
  data: new SlashCommandBuilder()
  .setName('sunucu')
  .setDescription('Sunucuya Aktif/Bakım/Restart Atmanıza İşe Yarar.')

  .addStringOption(option =>
    option.setName('durumu')
      .setDescription('The gif category')
      .setRequired(true)
      .addChoices(
        { name: 'Aktif', value: 'aktif' },
        { name: 'Bakım', value: 'bakım' },
      )),




			alsia: async (client, interaction) => {
    
                let guild = interaction.guild


                const {guildId,options,channel} = interaction;


                const secim = options.get("durumu").value;


                const Warn = new EmbedBuilder()
                .setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
                .setColor("#490404")
                .setTimestamp()
                
                const roles = ayarlar.Yetkiler.Staff;
                
                if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")] , ephemeral: true })




             switch(secim){
              case "aktif":








              const fivem =  new ButtonBuilder()
              .setLabel("🎮 ꜰıᴠᴇᴍ ʙᴀɢʟᴀɴ")
              .setURL(`https://servers.fivem.net/servers/detail/roep78`)
              .setStyle(ButtonStyle.Link)
              
              
              const ts3 =  new ButtonBuilder()
              .setLabel('🔊 ᴛꜱ ʙᴀɢʟᴀɴ')
              .setURL(`https://servers.fivem.net/servers/detail/roep78`)
              .setStyle(ButtonStyle.Link)

      
      
              const butonlar = new ActionRowBuilder()
              .addComponents([fivem, ts3 ]);
      
              const butonlarx = new ActionRowBuilder()
              .addComponents([fivem ]);
      
      
            const aktifalsia = new EmbedBuilder()
          .setTitle(`${guild.name}`)
      .setColor("#100261")
      .setImage(ayarlar.Resimler.AktifURL)
      .setTimestamp()
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setDescription(`<a:duyuru:1327600220879716396> *Sunucumuz* **AKTIF** *durumuna geçmiş bulunmaktadır, aşşağıda bulunan link ve butonlardan sunucumuza kısa bir süre içerisinde bağlantı yapabilirsiniz iyi oyunlar iyi eğlenceler dileriz.*
      
      <a:5961darkbluetea:1327585257578561548> \`ᴅᴜʀᴜᴍ:\` <:onday:1327600263242059848>   
      <a:utility:1327600287367696515> \`ᴋᴜʀᴜʟᴜᴍ:\` <#${ayarlar.FiveM.KurulumOda}>
      
      ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
      
      <:fivem:1327600224419577886> \`ꜰıᴠᴇᴍ: connect ${ayarlar.FiveM.SunucuIP}\`
      <:teamspeak20:1069934281566212146> \`ᴛꜱ: ${ayarlar.FiveM.SunucuTS}\`
      
      <:fivem:1327600224419577886> \`ꜰıᴠᴇᴍ:\` [Hızlı Bağlan](https://servers.fivem.net/servers/detail/roep78)
      
      ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
      
      <a:discorsel:1327600219017187380> [ᴅıꜱᴄᴏʀᴅ](${ayarlar.Bot.SunucuDavet}) | <:YouTube:1327585623623733258> [ʏᴏᴜᴛᴜʙᴇ](${ayarlar.FiveM.Youtube}) | <:twitch:1327600284104392715>  [ᴛᴡıᴛᴄʜ](${ayarlar.FiveM.Twitch}) | <:fivem:1327600224419577886> [ꜰıᴠᴇᴍ](${ayarlar.FiveM.FiveMURL})
      `)
          



          const aktifalsiaTS3 = new EmbedBuilder()
          .setTitle(`${guild.name}`)
      .setColor("#100261")
      .setImage(ayarlar.Resimler.AktifURL)
      .setTimestamp()
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setDescription(`<a:duyuru:1327600220879716396> *Sunucumuz* **AKTIF** *durumuna geçmiş bulunmaktadır, aşşağıda bulunan link ve butonlardan sunucumuza kısa bir süre içerisinde bağlantı yapabilirsiniz iyi oyunlar iyi eğlenceler dileriz.*
      
      <a:5961darkbluetea:1327585257578561548> \`ᴅᴜʀᴜᴍ:\` <:onday:1327600263242059848>   
      <a:utility:1327600287367696515> \`ᴋᴜʀᴜʟᴜᴍ:\` <#${ayarlar.FiveM.KurulumOda}>
      
      ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
      
      <:fivem:1327600224419577886> \`ꜰıᴠᴇᴍ: connect ${ayarlar.FiveM.SunucuIP}\`      
     <a:xafeaef:1327600291641823255> \`ꜰıᴠᴇᴍ:\` [Hızlı Bağlan](https://servers.fivem.net/servers/detail/roep78)
      
      ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
      
      <a:discorsel:1327600219017187380> [ᴅıꜱᴄᴏʀᴅ](${ayarlar.Bot.SunucuDavet}) | <:YouTube:1327585623623733258> [ʏᴏᴜᴛᴜʙᴇ](${ayarlar.FiveM.Youtube}) | <:twitch:1327600284104392715>  [ᴛᴡıᴛᴄʜ](${ayarlar.FiveM.Twitch}) | <:fivem:1327600224419577886> [ꜰıᴠᴇᴍ](${ayarlar.FiveM.FiveMURL})
      `)
          


      if( ayarlar.FiveM.Ts3Durumu == true ) {

        await interaction.reply({ embeds: [aktifalsia] , components: [butonlar]}).catch(() => {});
        interaction.channel.send({ content: "@everyone"}).then(message => { message.delete(); })

    return;
      }


      if( ayarlar.FiveM.Ts3Durumu == false ) {

        await interaction.reply({ embeds: [aktifalsiaTS3] , components: [butonlarx]}).catch(() => {});
        interaction.channel.send({ content: "@everyone"}).then(message => { message.delete(); })

    return;


      }

      
    




























              break;
              case "bakım":










              const fivemX =  new ButtonBuilder()
              .setLabel("🎮 ꜰıᴠᴇᴍ")
              .setURL(ayarlar.FiveM.FiveMURL)
              .setStyle(ButtonStyle.Link)
              
              const yutube =  new ButtonBuilder()
              .setLabel('🎉 ʏᴏᴜᴛᴜʙᴇ')
              .setURL(ayarlar.FiveM.Youtube)
              .setStyle(ButtonStyle.Link)
      
              const siksok =  new ButtonBuilder()
              .setLabel('🎧 ᴛᴡıᴛᴄʜ')
              .setURL(ayarlar.FiveM.Twitch)
              .setStyle(ButtonStyle.Link)
      
              const butonlarX = new ActionRowBuilder()
              .addComponents([fivemX , siksok, yutube ]);
      
      
      
      
            const BakıMalsia = new EmbedBuilder()
          .setTitle(`${guild.name}`)
          .setColor("#100261")
          .setImage(ayarlar.Resimler.BakımURL)
          .setTimestamp()
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setDescription(`<a:duyuru:1327600220879716396> *Sunucumuz* **BAKIM** *durumuna geçmiş bulunmaktadır, sunucu açılana kadar aşşağıda bulunan linklerden sunucu ile ilgili bilgi alabilir veya farklı oyunlar oynayarak zaman geçirebilirsiniz.*
      
      <a:5961darkbluetea:1327585257578561548> \`ᴅᴜʀᴜᴍ:\` <:offday:1327600257386807326>
      <a:utility:1327600287367696515> \`ᴋᴜʀᴜʟᴜᴍ:\` <#${ayarlar.FiveM.KurulumOda}>
      
      ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
      
      <:fivem:1327600224419577886> \`ꜰıᴠᴇᴍ: connect ${ayarlar.FiveM.SunucuIP}\`      
     <a:xafeaef:1327600291641823255> \`ꜰıᴠᴇᴍ:\` [Hızlı Bağlan](https://servers.fivem.net/servers/detail/roep78)
      
      ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
      
      <a:discorsel:1327600219017187380> [ᴅıꜱᴄᴏʀᴅ](${ayarlar.Bot.SunucuDavet}) | <:YouTube:1327585623623733258> [ʏᴏᴜᴛᴜʙᴇ](${ayarlar.FiveM.Youtube}) | <:twitch:1327600284104392715>  [ᴛᴡıᴛᴄʜ](${ayarlar.FiveM.Twitch}) | <:fivem:1327600224419577886> [ꜰıᴠᴇᴍ](${ayarlar.FiveM.FiveMURL})
      `)















      const BakıMalsiaTS3 = new EmbedBuilder()
      .setTitle(`${guild.name}`)
      .setColor("#100261")
      .setImage(ayarlar.Resimler.BakımURL)
  .setTimestamp()
  .setThumbnail(guild.iconURL({ dynamic: true }))
  .setDescription(`<a:duyuru:1327600220879716396> *Sunucumuz* **BAKIM** *durumuna geçmiş bulunmaktadır, sunucu açılana kadar aşşağıda bulunan linklerden sunucu ile ilgili bilgi alabilir veya farklı oyunlar oynayarak zaman geçirebilirsiniz.*
  
  <a:5961darkbluetea:1327585257578561548> \`ᴅᴜʀᴜᴍ:\` <:offday:1327600257386807326>
  <a:utility:1327600287367696515> \`ᴋᴜʀᴜʟᴜᴍ:\` <#${ayarlar.FiveM.KurulumOda}>
      
  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
  
  <:fivem:1327600224419577886> \`ꜰıᴠᴇᴍ: connect ${ayarlar.FiveM.SunucuIP}\`
  <:teamspeak20:1069934281566212146> \`ᴛꜱ: ${ayarlar.FiveM.SunucuTS}\`
  
  <:fivem:1327600224419577886> \`ꜰıᴠᴇᴍ:\` [Hızlı Bağlan](https://servers.fivem.net/servers/detail/roep78)
  
  
  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
  
  <a:discorsel:1327600219017187380> [ᴅıꜱᴄᴏʀᴅ](${ayarlar.Bot.SunucuDavet}) | <:YouTube:1327585623623733258> [ʏᴏᴜᴛᴜʙᴇ](${ayarlar.FiveM.Youtube}) | <:twitch:1327600284104392715>  [ᴛᴡıᴛᴄʜ](${ayarlar.FiveM.Twitch}) | <:fivem:1327600224419577886> [ꜰıᴠᴇᴍ](${ayarlar.FiveM.FiveMURL})
  `)






















   
      if( ayarlar.FiveM.Ts3Durumu == true ) {

        await interaction.reply({ embeds: [BakıMalsiaTS3] , components: [butonlarX]}).catch(() => {});
        interaction.channel.send({ content: "@everyone"}).then(message => { message.delete(); })

    return;
      }


      if( ayarlar.FiveM.Ts3Durumu == false ) {

        await interaction.reply({ embeds: [BakıMalsia] , components: [butonlarX]}).catch(() => {});
        interaction.channel.send({ content: "@everyone"}).then(message => { message.delete(); })

    return;


      }






















              break;
              default:
                  interaction.reply("Seçeneksiz İşlem Yapamazsın.").catch(() => {});
                  break;
              
              
              }





   
   
   
   
    }
 };


 
