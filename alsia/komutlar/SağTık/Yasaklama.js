const { ContextMenuCommandBuilder ,  ActionRowBuilder , ButtonStyle, ButtonBuilder, ModalBuilder, TextInputBuilder, TextInputStyle , ComponentType , EmbedBuilder, MessageActionRow, MessageButton,MessageEmbed,Client,CommandInteraction } = require('discord.js');

const canvafy = require("canvafy")
const moment = require("moment")
moment.locale("tr")
const discordModals = require('discord-modals');
const { Modal, TextInputComponent, SelectMenuComponent, showModal  } = require('discord-modals');
 const client = global.client;


const IDB = require("../../../database/ID.js");
const ayarlar = require('../../../ayarlar.json');
const EtiketDB = require("../../../database/etiket-veri.js");
const SicilDB = require("../../../database/sicil.js");
const SunucuDB = require("../../../database/gunluk-veri.js");
const YetkiliDB = require("../../../database/yetkili-veri.js");


module.exports = {
  data: new ContextMenuCommandBuilder()
          .setName('Yasakla')
          .setType(2),



          alsia: async (client, interaction) => {




           const guild = interaction.guild

           const member = guild.members.cache.get(interaction.targetMember);         


           const target = interaction.member.guild.members.cache.get(interaction.targetId);
           const targetId = interaction.targetId

           const id = Math.floor(Math.random() * 99999) + 1000000;






           const modal = new ModalBuilder()
           .setCustomId(`yasaklama-${id}`)
           .setTitle(`${ayarlar.Embed.FormAD} - YASAKLAMA`);
           
           
           const favoriteColorInput = new TextInputBuilder()
           .setCustomId('sebep')
           .setLabel("Sebep?")
           .setStyle(TextInputStyle.Short);
           
           
           
           const secondActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
           
           modal.addComponents(secondActionRow);
           
           await interaction.showModal(modal).catch(() => {});
           

    //         const modal = new Modal() 
    //         .setCustomId(`yasaklama-sistemi-${interaction.targetId}`)
    //         .setTitle(`${ayarlar.Embed.FormAD} - YASAKLAMA`)
    //         .addComponents([
    //           new TextInputComponent()
    //             .setCustomId('sebep')
    //             .setLabel('SEBEP?')
    //             .setStyle('SHORT')
    //             .setMinLength(0)
    //             .setMaxLength(20)
    //             .setPlaceholder('Bla Bla Bla')
    //             .setRequired(true),
               
    
    
              
    
    
    
    //         ]);
    
          
        
            
    //  showModal(modal, {
    //         client,
    //         interaction,
    //         });
      
           




    client.on("interactionCreate", async interaction => {


      if (interaction.customId === `yasaklama-${id}`) {

        const Sebep = interaction.fields.getTextInputValue('sebep');



    const Warn = new EmbedBuilder()
    .setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
    .setColor("#490404")
    .setTimestamp()
    
    const roles = ayarlar.Yetkiler.BanYetki;
    
    if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")]  })
    if (!target) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Geçerli bir oyuncu seçiniz.*")]  })
    if (interaction.member.id == target.id) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Kendinemi Ceza Vericeksin.*")]  })
    if (target && target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Kendinden yüksek kişilere ceza veremessin.*")] }).catch(() => {});
    if (!target.manageable) return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Botun yetkisi yetmemektedir.*`)]   })
    



 

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
  


            const embed = new EmbedBuilder()
            .setColor('#041f49')
            .setFooter({ text: moment(Date.now()).format("LLL") })
            .setDescription(`<:bsanned:1327586232506515479> ・ ${target} *isimli oyuncu sunucudan başarılı bir şekilde* \`${Sebep}\` *sebebi ile yasaklandı.*
            
            <:bugsal:1327586234876301332> ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}
            <a:5961darkbluetea:1327585257578561548> ・ \`ᴄᴇᴢᴀ ıᴅ: #${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}\``)
            .setAuthor({
              name: `${interaction.member.displayName}`, 
              iconURL: interaction.member.user.avatarURL({dynamic: true})})
            await interaction.reply({embeds: [embed] , ephemeral: true}).catch(() => {});
















            const canvas = new Canvafy.WelcomeLeave()
            .setAvatar(target.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
            .setBackground("image", ayarlar.Resimler.moderasyonURL)
            // .setBackground("image", "https://cdn.discordapp.com/attachments/1112203212678778940/1116683500804911104/940f0c70c7a84209cca88535e7ce28a3.png")
            .setTitle("YASAKLANDI")
            .setDescription(`KULLANILMIYOR`)
            .setBorder("#0e0707")
            .setCezaID(`Yetkili: ${interaction.member.displayName}`)
            .setOyuncu(`Oyuncu: ${target.user.username}`)
            .setYetkili(`#100`)
            .setSebep(`Sebep: ${Sebep}`)
            .setAvatarBorder("#ffffff")
            .setOverlayOpacity(0.5)
            .build();
        






            const row = new ActionRowBuilder()
            .addComponents(
        
        new ButtonBuilder()
        .setCustomId("anasayfa")
        .setLabel("ʙᴀɴ ɪᴛɪʀᴀᴢ ꜰᴏʀᴍʟᴀʀɪ ʙᴇʟʟɪ ᴀʀᴀʟɪᴋʟᴀʀʟᴀ ᴏᴋᴜɴᴍᴀᴋᴛᴀᴅɪʀ")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(true)
        .setEmoji("<:9200windowscalendar:1129943980570836992>"),
        
      
        );
    
            const banmesaj = new EmbedBuilder()
            .setAuthor({
              name: `${ayarlar.Embed.SunucuAD} -  Yasaklandınız!`, 
              iconURL: guild.iconURL({dynamic: true})})
            .setDescription(`<:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` ${interaction.member} 
            <a:5961darkbluetea:1327585257578561548> ・ \`ꜱᴇʙᴇᴘ: ${Sebep}\`
            <a:tehlikesel:1327600281029967953> ・ \`ᴄᴇᴢᴀ ıᴅ: #${messageUsers.length > 0 ? messageUsers : "#1"}\` 
            
            <a:discorsel:1327600219017187380> ・ [(ᴅɪꜱᴄᴏʀᴅ)](${ayarlar.Bot.SunucuDavet}) \n \n \`🌐 ${ayarlar.Embed.authorembed} ・ ${moment(Date.now()).format("LLL")}\``)
          .setImage('https://cdn.discordapp.com/attachments/912750000625319936/989882505861668884/2ff7864398ce94419154951206f048a5.gif')
          .setColor('#200527')
          .setThumbnail(guild.iconURL({dynamic:true}))
     




            await target.send({embeds: [banmesaj] , components: [row]}).catch(() => {});
            await guild.members.ban(targetId , {reason: `» Yetkili: ${interaction.member.user.username} \n » Sebep: ${Sebep} \n » Tarih: ${moment(Date.now()).format("LLL")} \n » CezaID: #${messageUsers.length > 0 ? messageUsers : "#1"}`}).catch(() => {});




        
                const logembed = await guild.channels.cache.get(ayarlar.KomutLOG.BanLOG).send({ files: [{ attachment: welcome, name: "ban-alsia-log.png" }] })
                const cezaembed = await guild.channels.cache.get(ayarlar.KomutLOG.CezaOda).send({ files: [{ attachment: welcome, name: "ban-alsia-log.png" }] })

                







                const CezaMesaj = new EmbedBuilder()
                .setImage(`attachment://ban-alsia-log.png`)
                .setDescription(`<:8676gasp:1327585524231176192> ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}
                <a:5961darkbluetea:1327585257578561548> ・ \`ᴏʏᴜɴᴄᴜ:\` ${target} 
                
                `)
                .setFooter({ text: `Ⓜ️ CezaID: #${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."} ・ ${moment(Date.now()).format("LLL")}` })
                                      .setAuthor({
                                      name: `${ayarlar.Embed.authorembed} - ʏᴀꜱᴀᴋʟᴀᴍᴀ`, 
                                      iconURL: guild.iconURL({dynamic: true})})
                                      .setThumbnail(target.user.avatarURL({ dynamic: true }))
                                      .setColor("#051b50")
                                      .addFields(
                                           { name: "**SEBEP:**",  value: `\`\`\`fix
» ${Sebep}\`\`\`
                                           `, inline: true })





     

     
      await logembed.edit({ embeds: [CezaMesaj] , files: [{ attachment: welcome, name: "ban-alsia-log.png" }] })    
      await cezaembed.edit({ embeds: [CezaMesaj] , files: [{ attachment: welcome, name: "ban-alsia-log.png" }] })    













    





   




      await EtiketDB.updateOne(
        { Sunucu: guild.id , ID: `#${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`},
        {
          $set: {
            Oyuncu: interaction.targetId,
            Yetkili: interaction.member.id,
            Tarih: moment(Date.now()).format("LLL"),
            Sebep: `ꜱᴇʙᴇᴘ: ${Sebep}`,
            SebepX: `Sebep: ${Sebep}`,
            YetkiliAD: interaction.member.user.username,
            OyuncuAD: target.user.username,
            Olay: "YASAKLAMA",
            Yazı: `<:bsanned:1327586232506515479> ・ **[BAN]** ***${interaction.member} *tarafından* \`${Sebep}\` *sebebi ile sunucudan başarılı bir şekilde yasaklanmıştır.*`
    
          }
        },
        { upsert: true }
      );



      await SicilDB.findOneAndUpdate({ Sunucu: guild.id, Oyuncu: interaction.targetId },

        { $push:
        
          { Sicil:
            { 
              
              Yetkili: interaction.member.id,
              Tarih: moment(Date.now()).format("LLL"),
              Sebep: Sebep,
              Olay: "[YASAKLAMA]",
              ID: `#${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`,
              

            } 
          } 
          }, 
          { upsert: true });






  }})




  await YetkiliDB.findOneAndUpdate({ Sunucu: guild.id, Yetkili: interaction.member.user.id },

    { $inc:
        { 
          
     Ban: 1,
     GBan: 1,
     HBan: 1,
     
        } 
      }, 
      { upsert: true });


















  //       }


          }



}















