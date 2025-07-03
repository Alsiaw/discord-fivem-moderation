const { Permissions, ActionRowBuilder , ButtonStyle, ButtonBuilder, ComponentType, EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");


const KayıtDB = require("../../../database/hexler.js");
const moment = require("moment")
moment.locale("tr")
const ayarlar = require("../../../ayarlar.json")



module.exports = {
  data: new SlashCommandBuilder()
  .setName('hex-oyuncular')
  .setDescription('Replies with your input!')
  .addStringOption(option =>
    option.
       setName('hex')
      .setDescription('Hex giriniz lütfen örnek: 1100001418f23c8')
      .setRequired(true)
),

  




			alsia: async (client, interaction) => {
    
                let guild = interaction.guild

                const sebep = interaction.options.getString('hex')
                const member = guild.members.cache.get(sebep);

    
    
                const Warn = new EmbedBuilder()
                .setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
                .setColor("#490404")
                .setTimestamp()
                
                const roles = ayarlar.Yetkiler.Staff;
                
                if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")] , ephemeral: true })


        
        
    
    

            const Veri = await KayıtDB.findOne({ Hex: sebep });
            if (!Veri) return interaction.reply({ content: "*- Veri Bulunamadı.*"}).catch(() => {});
            let page = 1;
            let rol = Veri.Oyuncular.sort((a, b) => b.Tarih - a.Tarih)
            let liste = rol.map((x , index) => `\`${index + 1}.\` - <@${x.Oyuncu}> - \`ᴛᴀʀɪʜ: ${x.Tarih}\``)
    await interaction.reply({ embeds: [new EmbedBuilder().setColor("#120f3f").setFooter({ text: "Sayfa #1"}).setThumbnail(interaction.member.user.avatarURL({dynamic: true})).setDescription(` <a:5961darkbluetea:1327585257578561548> ・ \`${sebep}\` ***isimli hex adresinin verileri;*** \n\n${liste.join('\n')}`).setTimestamp().setAuthor({ name: interaction.member.user.username, iconURL: guild.iconURL({ dynamic: true  }) })] , ephemeral: true  });

        
        
    
    
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
    }
 };
