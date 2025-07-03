const { Permissions, ActionRowBuilder , ButtonStyle, ButtonBuilder, ComponentType, EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");
const ayarlar = require("../../../ayarlar.json")


const HexDB = require("../../../database/oyuncu-hex.js");
const moment = require("moment");
moment.locale("tr")



module.exports = {
  data: new SlashCommandBuilder()
  .setName('hex-bul')
  .setDescription('Bir oyuncunun hex id sini bulmanıza yarar.')
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

        
    
    

            const Veri = await HexDB.find({ Oyuncu: sebep });
            const VeriX = await HexDB.findOne({ Oyuncu: sebep });

            if (!VeriX) return interaction.reply({ embeds: [new EmbedBuilder().setColor("#120f3f").setFooter({ text: ayarlar.Embed.authorembed}).setDescription(` <a:5961darkbluetea:1327585257578561548> ・ <@${sebep}> *isimli kullanıcının hex adresi bulunamadı.*`).setTimestamp().setAuthor({ name: interaction.member.user.username, iconURL: guild.iconURL({ dynamic: true  }) })] , ephemeral: true  });
            let page = 1;
            let liste = Veri.map((x , index) => `<@${sebep}> *isimli oyuncunun hex adresi:* \`steam:${x.Hex}\``)





    await interaction.reply({ embeds: [new EmbedBuilder().setColor("#120f3f").setFooter({ text: ayarlar.Embed.authorembed}).setDescription(` <a:5961darkbluetea:1327585257578561548> ・ ${liste}`).setTimestamp().setAuthor({ name: interaction.member.user.username, iconURL: guild.iconURL({ dynamic: true  }) })] , ephemeral: true  });

        
        
    
    
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
    }
 };
