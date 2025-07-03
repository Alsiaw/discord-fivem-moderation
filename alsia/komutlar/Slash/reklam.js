const { Permissions, ActionRowBuilder , ButtonStyle, ButtonBuilder, ComponentType, EmbedBuilder, ChannelType } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");


const canvafy = require("canvafy")
const moment = require("moment")
moment.locale("tr")


const ReklamDB = require("../../../database/reklam.js");
const ayarlar = require('../../../ayarlar.json');



module.exports = {
  data: new SlashCommandBuilder()
  .setName('reklam')
  .setDescription('reklam sistemini açıp kapatırsınız!')

  .addStringOption(option =>
    option.setName('secenek')
      .setDescription('secım yapınız lutfen')
      .setRequired(true)
      .addChoices(
        { name: 'Sistemi Aç', value: 'ac' },
        { name: 'Sistemi Kapat', value: 'kapat' },
        { name: 'Kanal Ekle', value: 'kanal' },
        { name: 'Kanal Sil', value: 'kanalsil' },
        { name: 'İstisna Kanallar', value: 'istisna' },

      ))
      
   .addChannelOption((option) =>
 option.setName('channels')
 .setDescription('kanal seciniz')
 .setRequired(false)  
 .addChannelTypes(ChannelType.GuildText)
   ), 




			alsia: async (client, interaction) => {
    
                let guild = interaction.guild


                const {guildId,options,channel} = interaction;


                const secim = options.get("secenek").value;
                 const kanal = options.getChannel('channels')

    
                 const DB = await ReklamDB.findOne({ SunucuID: guild.id });
                 const DBX = await ReklamDB.find({ SunucuID: guild.id });




             

                const Warn = new EmbedBuilder()
                .setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
                .setColor("#490404")
                .setTimestamp()
                
                const roles = ayarlar.Yetkiler.Staff;
                
                if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")] , ephemeral: true })














             switch(secim){
              case "ac":


              const embed = new EmbedBuilder()
              .setColor('#041f49')
           // .setFooter({ text: moment(Date.now()).format("LLL") })
              .setDescription(`<a:5961darkbluetea:1327585257578561548> ・ *Başarılı bir şekilde sunucuda reklam sistemi açılmıştır istisna kanal eklemek için* \`/reklam Kanal Ekle [Kanal]\` *yaparak ekleyebilirsiniz.*
              
              <:bugsal:1327586234876301332> ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}`)
              .setAuthor({
                name: `${interaction.member.displayName}`, 
                iconURL: interaction.member.user.avatarURL({dynamic: true})})
             await interaction.reply({embeds: [embed] }).catch(() => {});
    

              // await guild.channels.cache.get(ayarlar.LOG.ReklamLOG).send({ embeds: [embed] }).catch(() => {});



              await ReklamDB.updateOne(
                { SunucuID: interaction.guild.id
                },
                {
                  $set: {
                    Sistem: true       
                  }
                },
                { upsert: true }
              );








              break;
              case "kapat":








              const ReklamKapat = new EmbedBuilder()
              .setColor('#041f49')
           // .setFooter({ text: moment(Date.now()).format("LLL") })
              .setDescription(`<a:5961darkbluetea:1327585257578561548> ・ *Başarılı bir şekilde sunucuda reklam kapatılmıştır.*
              
              <:bugsal:1327586234876301332> ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}`)
              .setAuthor({
                name: `${interaction.member.displayName}`, 
                iconURL: interaction.member.user.avatarURL({dynamic: true})})
             await interaction.reply({embeds: [ReklamKapat] }).catch(() => {});
    
            //  await guild.channels.cache.get(ayarlar.LOG.ReklamLOG).send({ embeds: [ReklamKapat] }).catch(() => {});



              await ReklamDB.updateOne(
                { SunucuID: interaction.guild.id
                },
                {
                  $set: {
                    Sistem: false    
                  }
                },
                { upsert: true }
              );













              break;
              case "kanal":


              if (DB.KanalID.includes(interaction.channel.id)) return interaction.reply({ content: "*- Eklemek İstediğiniz Kanal Zaten Bulunmakta!*"});


              const İstisnaKanal = new EmbedBuilder()
              .setColor('#041f49')
           // .setFooter({ text: moment(Date.now()).format("LLL") })
              .setDescription(`<a:5961darkbluetea:1327585257578561548> ・ *Başarılı bir şekilde* ${kanal} *isimli kanal reklam sistemi için istisna olarak belirlendi.*
              
              <:bugsal:1327586234876301332> ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}`)
              .setAuthor({
                name: `${interaction.member.displayName}`, 
                iconURL: interaction.member.user.avatarURL({dynamic: true})})
             await interaction.reply({embeds: [İstisnaKanal] }).catch(() => {});
    

            //  await guild.channels.cache.get(ayarlar.LOG.ReklamLOG).send({ embeds: [İstisnaKanal] }).catch(() => {});



              await ReklamDB.updateOne(
                { SunucuID: interaction.guild.id
                },
                {
                  $push: {
                    KanalID: kanal.id    
                  }
                },
                { upsert: true }
              );






              break;
              case "kanalsil":



              if (!DB.KanalID.includes(interaction.channel.id)) return interaction.reply({ content: "*- Silmek İstediğiniz Kanal Zaten Bulunmamakta!*"});




              const alsiaGG = new EmbedBuilder()
              .setColor('#041f49')
           // .setFooter({ text: moment(Date.now()).format("LLL") })
              .setDescription(`<a:5961darkbluetea:1327585257578561548> ・ *Başarılı bir şekilde* ${kanal} *isimli kanal reklam sistemi için istisna kanal listesinden çıkarıldı.*
              
              <:bugsal:1327586234876301332> ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}`)
              .setAuthor({
                name: `${interaction.member.displayName}`, 
                iconURL: interaction.member.user.avatarURL({dynamic: true})})
             await interaction.reply({embeds: [alsiaGG] }).catch(() => {});
    
            //  await guild.channels.cache.get(ayarlar.LOG.ReklamLOG).send({ embeds: [alsiaGG] }).catch(() => {});




              await ReklamDB.updateOne(
                { SunucuID: interaction.guild.id
                },
                {
                  $pull: {
                    KanalID: kanal.id    
                  }
                },
                { upsert: true }
              );










              break;
              case "istisna":



              const İstisnalar = DBX
              .splice(0, 200)
              .map((x, index) => `\`${index + 1}.\` - <#${x.KanalID}>`)
              .join("\n");



           const İstisnaalsia = new EmbedBuilder()
           .setColor('#041f49')
            .setFooter({ text: moment(Date.now()).format("LLL") })
              .setDescription(`<a:5961darkbluetea:1327585257578561548> ・ ***Reklam Koruma Sisteminde İstisna Sayılan Kanalların Listesi;***

${İstisnalar.length > 0 ? İstisnalar : "*- Herhangi Bir İstisna Kanal Bulunmamaktadır.*"}             `)
              .setAuthor({
                name: `${interaction.member.displayName}`, 
                iconURL: interaction.member.user.avatarURL({dynamic: true})})
             await interaction.reply({embeds: [İstisnaalsia] }).catch(() => {});

















              break;
              default:
                  interaction.reply("Seçeneksiz İşlem Yapamazsın.").catch(() => {});
                  break;
              
              
              }





   
   
   
   
    }
 };


 
