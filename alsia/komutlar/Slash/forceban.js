const {ChannelType  ,EmbedBuilder, PermissionsBitField, AttachmentBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ayarlar = require("../../../ayarlar.json")

const moment = require("moment");
moment.locale("tr")




const IDB = require("../../../database/ID.js");
const EtiketDB = require("../../../database/etiket-veri.js");
const SicilDB = require("../../../database/sicil.js");




module.exports = {
  data: new SlashCommandBuilder()
    .setName("forceban")
    .setDescription("Sunucuda bulunmayan bir oyuncuyu zorla yasaklarsınız!")
	  .addStringOption(option =>
      option.
         setName('id')
        .setDescription('ID giriniz lütfen örnek: 278152550627409921')
        .setRequired(true)
  )
  .addStringOption(option =>
    option.
       setName('sebep')
      .setDescription('Sebep giriniz.')
      .setRequired(true)
),




			alsia: async (client, interaction) => {
    
				const oyuncu = interaction.options.getString('id')
                const sebep = interaction.options.getString('sebep')

				const guild = interaction.guild
                const member = guild.members.cache.get(oyuncu);

    


                const Warn = new EmbedBuilder()
                .setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
                .setColor("#490404")
                .setTimestamp()
                
                const roles = ayarlar.Yetkiler.BanYetki;
                
                if (member) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Oyuncu sunucuda bulunuyor /ban kullanbilirsiniz.*")] , ephemeral: true })
                if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")] , ephemeral: true })
                if (interaction.member.id == oyuncu) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Kendinemi Ceza Vericeksin.*")] , ephemeral: true })
                if (guild.members.cache.has(member) && interaction.member.roles.highest.position <= interaction.guild.members.cache.get(member).roles.highest.position) return interaction.reply({embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Kendinden yüksek kişilere ceza veremessin.*")] , ephemeral: true}).catch(() => {});
              //  if (!member.manageable) return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Botun yetkisi yetmemektedir.*`)] , ephemeral: true  })









   

                await IDB.findOneAndUpdate(
                  { SunucuID: guild.id
                  },
                  {
                    $inc: {
                      ID: 1       
                    }
                  },
                  { upsert: true }
                );
        
        
        
                const messageUsersData = await IDB.find({ SunucuID: guild.id })
        
        
        
        
                const messageUsers = messageUsersData
                    .splice(0, 100)
                    .map((x, index) => `${x.ID}`)
                    .join("\n");



                     await interaction.deferReply({  }).catch(() => {});


                const embed = new EmbedBuilder()
                .setColor('#041f49')
                .setDescription(`<:bsanned:1327586232506515479> ・ <@${oyuncu}> *isimli oyuncu sunucudan zorunlu bir şekilde* \`${sebep}\` *sebebi ile yasaklandı.*
                
                <:bugsal:1327586234876301332> ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}
                <a:5961darkbluetea:1327585257578561548> ・ \`ᴄᴇᴢᴀ ıᴅ: #${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}\``)
                .setAuthor({
                  name: `${interaction.member.displayName}`, 
                  iconURL: interaction.member.user.avatarURL({dynamic: true})})
                  await interaction.editReply({embeds: [embed]}).catch(() => {});
         
                
                  await interaction.guild.members.ban(oyuncu , {reason: `» Yetkili: ${interaction.member.user.tag} \n » Sebep: ${sebep} \n » Tarih: ${moment(Date.now()).format("LLL")} \n » CezaID: #${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`}).catch(() => {});






         
         


       const embedV2 = new EmbedBuilder()
       .setDescription(`<:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` ${interaction.member}
       <a:5961darkbluetea:1327585257578561548> ・ \`ᴏʏᴜɴᴄᴜ:\` <@${oyuncu}>
                       `)
             .setColor('#040450')
           .setFooter({ text: `🌐 ᴅᴇᴠ. ʙʏ ᴀʟꜱɪᴀ` })
         .setThumbnail(interaction.member.user.avatarURL({dynamic:true})) 
       .setAuthor({
       name:`${ayarlar.Embed.authorembed} - ʏᴀꜱᴀᴋʟᴀᴍᴀ`, 
       iconURL: interaction.guild.iconURL({dynamic: true})
       })
       .addFields(
       { name: "**SEBEP:**",  value: `\`\`\`fix
${sebep}\`\`\`
       `, inline: false },
       { name:"**TARIH:**",  value: `\`\`\`fix
${moment(Date.now()).format("LLL")} - CezaID: #${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}\`\`\`
                 `, inline: true },
       )



 await guild.channels.cache.get(ayarlar.KomutLOG.BanLOG).send({ embeds: [embedV2] })



   
   
   
   
       await EtiketDB.updateOne(
        { Sunucu: guild.id , ID: `#${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`},
        {
          $set: {
            Oyuncu: oyuncu,
            Yetkili: interaction.member.id,
            Tarih: moment(Date.now()).format("LLL"),
            Sebep: `ꜱᴇʙᴇᴘ: ${sebep}`,
            SebepX: `Sebep: ${sebep}`,
            YetkiliAD: interaction.member.user.username,
            OyuncuAD: oyuncu,
            Olay: "YASAKLAMA",
            Yazı: `<:bsanned:1327586232506515479> ・ **[BAN]** ***${interaction.member} *tarafından* \`${sebep}\` *sebebi ile sunucudan başarılı bir şekilde yasaklanmıştır.*`
     
          }
        },
        { upsert: true }
      );
     
     
     
      await SicilDB.findOneAndUpdate({ Sunucu: guild.id, Oyuncu: oyuncu },
     
        { $push:
        
          { Sicil:
            { 
              
              Yetkili: interaction.member.id,
              Tarih: moment(Date.now()).format("LLL"),
              Sebep: sebep,
              Olay: "[YASAKLAMA]",
              ID: `#${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`,
              
     
            } 
          } 
          }, 
          { upsert: true });
   
   
   
   
    }
 };
