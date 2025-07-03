const { Permissions, PermissionFlagsBits ,ActionRowBuilder , ButtonStyle, ButtonBuilder, ComponentType, EmbedBuilder, ChannelType } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");


const moment = require("moment")
moment.locale("tr")


const ayarlar = require('../../../ayarlar.json');



module.exports = {
  data: new SlashCommandBuilder()
  .setName('kanal')
  .setDescription('kanal kilitleyip/açabilirsiniz!')

  .addStringOption(option =>
    option.setName('secenek')
      .setDescription('secım yapınız lutfen')
      .setRequired(true)
      .addChoices(
        { name: 'Kilidi Aç', value: 'ac' },
        { name: 'Kilidi Kapat', value: 'kapat' },


      )),




			alsia: async (client, interaction) => {
    
                let guild = interaction.guild


                const {guildId,options,channel} = interaction;


                const secim = options.get("secenek").value;

    


                const Warn = new EmbedBuilder()
                .setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
                .setColor("#490404")
                .setTimestamp()
                
                const roles = ayarlar.Yetkiler.Staff;
                
                if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")] , ephemeral: true })
                if (!interaction.channel.manageable) return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Botun yetkisi yetmemektedir.*`)] , ephemeral: true  })



















             switch(secim){
              case "ac":









              const embed1 = new EmbedBuilder()
              .setColor('#041f49')
              .setFooter({ text: `🌐 ${ayarlar.Embed.authorembed} ・ ${moment(Date.now()).format("LLL")}` })
              .setDescription(`<a:5961darkbluetea:1327585257578561548> ・ ${interaction.member} *tarafından* ${interaction.channel} *isimli kanal bir yetkili tarafından başarılı bir şekilde* ***açıldı.***`)
              .setAuthor({
                name: `${interaction.member.displayName}`, 
                iconURL: interaction.member.user.avatarURL({dynamic: true})})
                await interaction.reply({embeds: [embed1]}).catch(() => {});
       
  
                await interaction.channel.permissionOverwrites.edit(ayarlar.Permler.Whitelist , {
                   
                    [PermissionFlagsBits.SendMessages]: true

                     })



















              break;
              case "kapat":


              const embed2 = new EmbedBuilder()
              .setColor('#041f49')
              .setFooter({ text: `🌐 ${ayarlar.Embed.authorembed} ・ ${moment(Date.now()).format("LLL")}` })
              .setDescription(`<a:5961darkbluetea:1327585257578561548> ・ ${interaction.member} *tarafından* ${interaction.channel} *isimli kanal bir yetkili tarafından başarılı bir şekilde* ***kilitlendi.***`)
              .setAuthor({
                name: `${interaction.member.displayName}`, 
                iconURL: interaction.member.user.avatarURL({dynamic: true})})
                await interaction.reply({embeds: [embed2]}).catch(() => {});
       
  
                await interaction.channel.permissionOverwrites.edit(ayarlar.Permler.Whitelist , {
                   
                    [PermissionFlagsBits.SendMessages]: false

                     })



















              break;
              default:
                  interaction.reply("Seçeneksiz İşlem Yapamazsın.").catch(() => {});
                  break;
              
              
              }





   
   
   
   
    }
 };


 
