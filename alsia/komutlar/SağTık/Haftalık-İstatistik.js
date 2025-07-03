const { ChannelType  , EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilderButtonBuilder, ActionRowBuilder, PermissionsBitField, AttachmentBuilder , ContextMenuCommandBuilder } = require('discord.js');

const canvafy = require("canvafy")
const moment = require("moment")
moment.locale("tr")


const ayarlar = require("../../../ayarlar.json")

const YetkiliDB = require("../../../database/yetkili-veri")
const messageUser = require("../../../database/messageUser");
const voiceUser = require("../../../database/voiceUser");







module.exports = {
  data: new ContextMenuCommandBuilder()
          .setName('Yetkili İstatistik')
          .setType(2),



          alsia: async (client, interaction) => {


            const target = interaction.member.guild.members.cache.get(interaction.targetId);


            const docs = await YetkiliDB.findOne({Yetkili: interaction.targetId});
            const docsx = await voiceUser.findOne({userID: interaction.targetId});
            const docsm = await messageUser.findOne({userID: interaction.targetId});




   
            const Warn = new EmbedBuilder()
            .setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
            .setColor("#490404")
            .setTimestamp()
            
            const roles = ayarlar.Yetkiler.Staff;
            if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")]  })
            if (!docs)  return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetkiliye ait hiç bir veri bulunmamaktadır.*")]  })







            // await interaction.deferReply({ content: "- Verileri Yükleniyor.."})




            const row = new ActionRowBuilder()
            .addComponents(
        
        new ButtonBuilder()
        .setCustomId("kapat")
        .setLabel("ɴᴏᴛ: ʏᴇᴛᴋıʟı ᴛᴏᴘʟᴀᴍ ıꜱᴛᴀᴛıꜱᴛıᴋıʀ")
        .setStyle(ButtonStyle.Danger)
        .setDisabled(true)
        .setEmoji("<:2700dndgray:1129950510573703168>"),

        
        );



            const profile = await new canvafy.Profile()
            .setUser(interaction.targetMember.id)
            .setGiriş(target.displayName)

              .setWhitelist(`${docs.WlRed}`) // Wl Red
              .setStaff(`${docs.WlOnay}`) // Wl Onay
              .setSes(`${moment.duration(docsx ? docsx.topStat : 0).format("H [Saat], m [dakika] s [saniye]")}`)
              .setMesaj(`${docsm ? docsm.topStat : 0} Mesaj`)
              .setÇıkış(`${docs.Unban}`) 
              .setBan(`${docs.Ban}`)
              .setUnban(`${docs.Unban}`)
              .setİsim(`${docs.İsim}`)
          .setWlCeza(`${docs.WlCeza}`)
          .setUyarı(`${docs.Uyarı}`)
          .setTicket(`${docs.Ticket}`)
              .setPermAdd(`${docs.PermVerme}`)
              .setPermRemove(`${docs.PermAlma}`)
        
              .setBorder("#e1bbe7")
              .setActivity({activity:{
              name: 'Visual Studio Code',
              type: 0,
              url: null,
              details: '📝 In canvafy ❓ 0 problems found',
              state: 'Working on package.json:45:5',
              applicationId: '810516608442695700',
              party: null,
              assets:{
                largeText: '📝 Editing a NPM',
                smallText: '❓ Visual Studio Code',
                largeImage: 'mp:external/CPFiq3MlvnvOKJSW6pUeZ7gfOdfcrLPtGK9dT3LrsCo/https/raw.githubusercontent.com/LeonardSSH/vscord/main/assets/icons/npm.png',
                smallImage: 'mp:external/Joitre7BBxO-F2IaS7R300AaAcixAvPu3WD1YchRgdc/https/raw.githubusercontent.com/LeonardSSH/vscord/main/assets/icons/vscode.png'
              }},
             largeImage:"https://raw.githubusercontent.com/LeonardSSH/vscord/main/assets/icons/js.png"
            })
          
            .build();
        



await interaction.deferReply({  files: [{
    attachment: profile,
    name: `alsia-profile.png`
  }]})


await interaction.editReply({  files: [{
    attachment: profile,
    name: `alsia-profile.png`
  }] , components: [row]})

  // const embedV2 = new EmbedBuilder()
  //           .setImage(`attachment://alsia-profile.png`)
  //                                 .setColor("#051b50")
  //                                 .setDescription(`<a:5961darkbluetea:1327585257578561548> ・ \`ʏᴇᴛᴋıʟı:\` ${target} `)
  //                                 .setAuthor({
  //                                   name:`${ayarlar.Embed.authorembed} - ʏᴇᴛᴋıʟı ıꜱᴛᴀᴛıꜱᴛıᴋ`, 
  //                                   iconURL: interaction.guild.iconURL({dynamic: true})})


    // await yenimsg.edit({ embeds: [embedV2] , files: [{ attachment: profile, name: "alsia-profile.png" }] , components: [row] })    


            

















          }

















          



}