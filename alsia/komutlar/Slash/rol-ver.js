const {ChannelType  ,EmbedBuilder,ButtonBuilder, ActionRowBuilder,  PermissionsBitField, AttachmentBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ayarlar = require("../../../ayarlar.json")

const moment = require("moment");
moment.locale("tr")



const YetkiliDB = require("../../../database/yetkili-veri.js")
const roller = require("../../../database/perm-log.js")








module.exports = {
  data: new SlashCommandBuilder()
    .setName("rolver")
    .setDescription("Bir oyuncunun üzerinde olmayan bir permi vermeye işe yarar.")	
    .addUserOption(option =>
option.

setName('oyuncu')
.setDescription('Lütfen bir oyuncu seçiniz Örnek: alsiaw')
.setRequired(true))


  .addRoleOption(option => 
option.

setName('rol')
.setDescription('Verilicek rolü lütfen seçiniz Örnek: LSPD')
.setRequired(true)),




			alsia: async (client, interaction) => {
    

				const guild = interaction.guild

                const oyuncu = interaction.options.getMember('oyuncu')
                const rol = interaction.options.getRole('rol')



                const Warn = new EmbedBuilder()
                .setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
                .setColor("#490404")
                .setTimestamp()
                
                const roles = ayarlar.Yetkiler.Staff;
                const rolverilmez = ayarlar.Yetkiler.YasaklıPermler

                if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")] , ephemeral: true })
                if (!oyuncu) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Geçerli bir oyuncu seçiniz.*")] , ephemeral: true })
                if (!rol) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Geçerli bir rol seçiniz.*")] , ephemeral: true })
                if (interaction.member.id == oyuncu.id) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Kendinemi rol vericeksin.*")] , ephemeral: true })
                if (oyuncu && oyuncu.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Kendinden yüksek kişilere rol veremessin.*")] , ephemeral: true}).catch(() => {});
                if (interaction.member.roles.highest.comparePositionTo(rol) < 1) return interaction.reply({embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Kendinden yüksek kişilere rol veremessin.*")] , ephemeral: true}).catch(() => {});
                if (!oyuncu.manageable) return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Botun yetkisi yetmemektedir.*`)] , ephemeral: true  })
                if (rolverilmez.includes(rol.id)) return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Bu yasaklı bir permdir bot üzerinden verilemez.*`)] , ephemeral: true  })
                if (oyuncu.roles.cache.has(rol)) return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Bu rol zaten oyuncuda var.*`)] , ephemeral: true  })
                if (interaction.channelId !== ayarlar.Yetkiler.BotKomut) return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Sadece* <#${ayarlar.Yetkiler.BotKomut}> *kanalında kullanabilirsin*`)] , ephemeral: true  })




                await (oyuncu.roles.add(rol)).catch(() => {});
              //  await interaction.deferReply({  }).catch(() => {});


                const embed = new EmbedBuilder()
                .setColor('#041f49')
                .setDescription(`<a:utility:1327600287367696515> ・ ${oyuncu} *isimli oyuncuya* ${rol} *isimli rol başarılı bir şekilde eklendi.*
                
                <a:5961darkbluetea:1327585257578561548> ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}`)
                .setAuthor({
                  name: `${interaction.member.displayName}`, 
                  iconURL: interaction.member.user.avatarURL({dynamic: true})})
               await interaction.reply({embeds: [embed]}).catch(() => {});






               const embedss = new EmbedBuilder()
               .setColor('#041f49')
               .setAuthor({
                 name:`${ayarlar.Embed.authorembed} - ʀᴏʟᴇ ᴀᴅᴠɪꜱᴏʀ`, 
                 iconURL: guild.iconURL({dynamic: true})})
               .setDescription(`
               
               <:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` ${interaction.member}
               <a:5961darkbluetea:1327585257578561548> ・ \`ᴏʏᴜɴᴄᴜ:\` ${oyuncu}
        
               <a:utility:1327600287367696515> ・ \`ᴠᴇʀɪʟᴇɴ ʀᴏʟ:\` ${rol}
               <a:animated_clock29:1327586135039410223> ・ \`ᴛᴀʀıʜ: ${moment(Date.now()).format("LLL")}\``)
              
               .setThumbnail(interaction.member.user.avatarURL({dynamic:true}))
          client.channels.cache.get(ayarlar.KomutLOG.PermLOG).send({embeds: [embedss]})
        




          await YetkiliDB.updateOne(
            { Sunucu: interaction.guild.id , Yetkili: interaction.member.id
            },
{ 
    
    $set: {
    YetkiliAD: interaction.member.user.username
},

            
              $inc: {
                PermVerme: 1,
                GPermVerme: 1,
                HPermVerme: 1       
              }
            },
            { upsert: true }
          );








          await roller.findOneAndUpdate({ guildID: guild.id, user: oyuncu.id }, { $push: { rolx: { user: oyuncu.id , mod: interaction.member.id, tarih: moment(Date.now()).format("LLL"), rol: rol.id, state: "[+]"  } } }, { upsert: true });




























































































































































   
   
    }
 };
