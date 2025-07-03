const {ChannelType  ,EmbedBuilder, PermissionsBitField, AttachmentBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ayarlar = require("../../../ayarlar.json")
const { YamlDatabase } = require("five.db");
const db = new YamlDatabase();

const moment = require("moment");
moment.locale("tr")
const canvafy = require("canvafy")



const ms = require("ms");


const IDB = require("../../../database/ID.js");
const EtiketDB = require("../../../database/etiket-veri.js");
const SicilDB = require("../../../database/sicil.js");
const YetkiliDB = require("../../../database/yetkili-veri.js");
const SunucuDB = require("../../../database/gunluk-veri.js");








module.exports = {
  data: new SlashCommandBuilder()
    .setName("wlceza")
    .setDescription("Bir kullanıcıya wl ceza vermenize işe yarar.")
    .addUserOption(option =>
        option.
           setName('oyuncu')
          .setDescription('Oyuncu giriniz lütfen örnek: @alsiaw')
          .setRequired(true)
    )
  //   .addUserOption(option =>
  //     option.
  //        setName('verdiren')
  //       .setDescription('Oyuncu giriniz lütfen örnek: @alsiaw')
  //       .setRequired(true)
  // )
	.addStringOption(option =>
        option.
           setName('sebep')
          .setDescription('Sebep giriniz lütfen örnek: power gaming')
          .setRequired(true)
    )
    .addIntegerOption(option =>
        
        option
        .setName("süre")
        .setDescription("Süre giriniz lütfen örnek: 7")
        .setMaxValue(30)
        .setMinValue(1)
        .setRequired(true)
        )
        .addAttachmentOption(option =>
          option.
             setName('kanıt')
            .setDescription('Kanıt Dosyanızı Yükleyiniz.')
            .setRequired(false)),




			alsia: async (client, interaction) => {
    
                const Oyuncu = interaction.options.getMember('oyuncu')
				const Sebep = interaction.options.getString('sebep')
				const Süre = interaction.options.getInteger('süre')
        const File = interaction.options.getAttachment('kanıt') 
        const Verdiren = interaction.options.getMember('verdiren')
				const guild = interaction.guild




const Warn = new EmbedBuilder()
.setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
.setColor("#490404")
.setTimestamp()

const roles = ayarlar.Yetkiler.Staff;

if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")] , ephemeral: true })
if (!Oyuncu) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Geçerli bir oyuncu seçiniz.*")] , ephemeral: true })
if (interaction.member.id == Oyuncu.id) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Kendinemi Ceza Vericeksin.*")] , ephemeral: true })
if (Oyuncu && Oyuncu.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Kendinden yüksek kişilere ceza veremessin.*")] , ephemeral: true}).catch(() => {});
if (interaction.channelId !== ayarlar.Yetkiler.BotKomut) return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Sadece* <#${ayarlar.Yetkiler.BotKomut}> *kanalında kullanabilirsin*`)] , ephemeral: true  })
if (!Oyuncu.manageable) return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Botun yetkisi yetmemektedir.*`)] , ephemeral: true  })


const CezaVarmı = db.get("wlceza-" + Oyuncu.id)
if (CezaVarmı) return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Oyuncunun zaten whitelist cezası var.*`)] , ephemeral: true  })





































































































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





                      const embed = new EmbedBuilder()
                      .setDescription(`<a:5961darkbluetea:1327585257578561548> ・ ${Oyuncu} *İsimli oyuncuya* \`${Süre} Gün\` *whitelist cezası verilmiştir.*
                      
                      <:8676gasp:1327585524231176192> ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}
                      <a:duyuru:1327600220879716396> ・ \`ᴄᴇᴢᴀ ıᴅ: #${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}\``)
                      .setAuthor({
                      name: `${interaction.member.displayName}`, 
                      iconURL: interaction.member.user.avatarURL({dynamic: true})})
                      .setColor("#051b50")
          
          await interaction.reply({ embeds: [embed] }).catch(() => {});








          const welcome = await new canvafy.WelcomeLeave()
          .setAvatar(Oyuncu.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
          .setBackground("image", ayarlar.Resimler.moderasyonURL)
          .setTitle("WL CEZA") // Başlık olarak kullanılabilir
          .setDescription(`Yetkili: ${interaction.member.displayName} \n\n\n Oyuncu:  ${Oyuncu.user.username}  \n Ceza: ${Süre} Gün Wl`)
          .setBorder("#0e0707")
          .setAvatarBorder("#ffffff")
          .setOverlayOpacity(0.5)
          .build();
        
        const logembed = await guild.channels.cache.get(ayarlar.KomutLOG.CezaOda).send({
          files: [{ attachment: welcome, name: "wlceza-alsia.png" }]
        });
        
        const cezaembed = await guild.channels.cache.get(ayarlar.KomutLOG.wlcezaLOG).send({
          files: [{ attachment: welcome, name: "wlceza-alsia.png" }]
        });




                    
                    

                          //  ms("1w")




if (!File) {

  const CezaMesaj = new EmbedBuilder()
  .setImage(`attachment://wlceza-alsia.png`)
  .setDescription(`<:8676gasp:1327585524231176192> ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}
  <a:5961darkbluetea:1327585257578561548> ・ \`ᴏʏᴜɴᴄᴜ:\` ${Oyuncu} 
  
  `)
  .setFooter({ text: `Ⓜ️ CezaID: #${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."} ・ ${moment(Date.now()).format("LLL")}` })
                        .setAuthor({
                        name: `${ayarlar.Embed.authorembed} - ᴡʟ ᴄᴇᴢᴀ`, 
                        iconURL: guild.iconURL({dynamic: true})})
                        .setThumbnail(Oyuncu.user.avatarURL({ dynamic: true }))
                        .setColor("#051b50")
                        .addFields(
                             { name: "**SEBEP:**",  value: `\`\`\`fix
» ${Sebep}\`\`\`
                             `, inline: true })


                             await logembed.edit({  embeds: [CezaMesaj], files: [{ attachment: welcome, name: "wlceza-alsia.png" }] }).catch(() => {});
                             await cezaembed.edit({  embeds: [CezaMesaj], files: [{ attachment: welcome, name: "wlceza-alsia.png" }] }).catch(() => {});

}

if (File) {


  const CezaMesaj = new EmbedBuilder()
  .setImage(`attachment://wlceza-alsia.png`)
  .setDescription(`<:8676gasp:1327585524231176192> ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}
  <a:5961darkbluetea:1327585257578561548> ・ \`ᴏʏᴜɴᴄᴜ:\` ${Oyuncu} 

  <:1709locked:1327585185864351756>・ \`ᴋᴀɴıᴛ:\` [ᴛıᴋʟᴀ](${File.url})
  
  `)
  .setFooter({ text: `Ⓜ️ CezaID: #${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."} ・ ${moment(Date.now()).format("LLL")}` })
                        .setAuthor({
                        name: `${ayarlar.Embed.authorembed} - ᴡʟ ᴄᴇᴢᴀ`, 
                        iconURL: guild.iconURL({dynamic: true})})
                        .setThumbnail(Oyuncu.user.avatarURL({ dynamic: true }))
                        .setColor("#051b50")
                        .addFields(
                             { name: "**SEBEP:**",  value: `\`\`\`fix
» ${Sebep}\`\`\`
                             `, inline: true })

                             await logembed.edit({  embeds: [CezaMesaj], files: [{ attachment: welcome, name: "wlceza-alsia.png" }] }).catch(() => {});
                             await cezaembed.edit({  embeds: [CezaMesaj], files: [{ attachment: welcome, name: "wlceza-alsia.png" }] }).catch(() => {});


  
  }



let wlcezasüre =  ms(`${Süre}d`)
await db.set("wlceza-" + Oyuncu.id , { Oyuncu: Oyuncu.user.username , Yetkili: interaction.member.displayName , Gün: `${Süre} Gün` , Tarih: moment(Date.now()).format("LLL") , Süre:  Date.now() + wlcezasüre , İsim: Oyuncu.displayName  });
await interaction.guild.members.cache.get(Oyuncu.id).setNickname(`${Oyuncu.displayName} ${moment(Date.now() + wlcezasüre).format("LLL")}`).catch(() => {});

await Oyuncu.roles.add(ayarlar.Permler.WlCeza).catch(() => {});
await Oyuncu.roles.remove(ayarlar.Permler.KarakterOnay).catch(() => {});









await EtiketDB.updateOne(
    { Sunucu: guild.id , ID: `#${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`},
    {
      $set: {
        Oyuncu: Oyuncu.id,
        Yetkili: interaction.member.id,
        Tarih: moment(Date.now()).format("LLL"),
        Sebep: `ꜱᴇʙᴇᴘ: ${Sebep}`,
        SebepX: `Ceza: ${Süre} Gün Wl`,
        YetkiliAD: interaction.member.user.username,
        OyuncuAD: Oyuncu.user.username,
        Olay: "WL CEZA",
        Yazı: `<:bsanned:1327586232506515479> ・ **[WL CEZA]** ***${interaction.member} *tarafından* \`${Sebep}\` *sebebi ile sunucudan başarılı bir şekilde yasaklanmıştır.*`
 
      }
    },
    { upsert: true }
  );
 
 
 
  await SicilDB.findOneAndUpdate({ Sunucu: guild.id, Oyuncu: Oyuncu.id },
 
    { $push:
    
      { Sicil:
        { 
          
          Yetkili: interaction.member.id,
          Tarih: moment(Date.now()).format("LLL"),
          Sebep: `${Sebep} - ${Süre} Gün`,
          Olay: "[WL CEZA]",
          ID: `#${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`,
          
 
        } 
      } 
      }, 
      { upsert: true });
 
 
 
 
 
 
      await SunucuDB.findOneAndUpdate({ Sunucu: guild.id },
 
       { $inc:
           { 
             
  WlCeza: 1,
             
           } 
         }, 
         { upsert: true });
    


         await YetkiliDB.findOneAndUpdate({ Sunucu: guild.id, Yetkili: interaction.member.id },

            { $inc:
                { 
                  
             WlCeza: 1,
             GWlCeza: 1,
             HWlCeza: 1,
            
             
                } 
              }, 
              { upsert: true });




























   
   
   
    }
 };
