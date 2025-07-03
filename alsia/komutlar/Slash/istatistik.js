const { Permissions, ActionRowBuilder , StringSelectMenuBuilder , StringSelectMenuOptionBuilder, ButtonStyle, ButtonBuilder, ComponentType, EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");


const canvafy = require("canvafy")
const moment = require("moment");
const ayarlar = require('../../../ayarlar.json');
moment.locale("tr")






const messageUserChannel = require("../../../database/messageUserChannel");
const voiceUserChannel = require("../../../database/voiceUserChannel");
const messageUser = require("../../../database/messageUser");
const voiceUser = require("../../../database/voiceUser");
const voiceUserParent = require("../../../database/voiceUserParent");










































module.exports = {
  data: new SlashCommandBuilder()
  .setName('istatistik')
  .setDescription('Bir oyuncunun verilerini görüntülersiniz.')

  .addUserOption(alsia => 
    alsia
    .setName('oyuncu')
    .setRequired(true)
    .setDescription('Lütfen bir oyuncu seçiniz örnek: @alsiaw')),
  




			alsia: async (client, interaction) => {
    
                let guild = interaction.guild




                const member = interaction.options.getMember('oyuncu') || interaction.member.id
             

    
                const Warn = new EmbedBuilder()
                .setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
                .setColor("#490404")
                .setTimestamp()
                
                const roles = ayarlar.Yetkiler.Staff;
                if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")] , ephemeral: true })


                function checkDays(date) {
                    let now = new Date();
                    let diff = now.getTime() - date.getTime();
                    let days = Math.floor(diff / 86400000);
                    return days + (days == 1 ? " gün" : " gün") + " önce";
                };
      
      
      
      
                  let Durum = member.presence?.status
                  let durm = (Durum == "online" ? ("Çevrimiçi") : (Durum == "offline" ? ("Çevrimdışı") : (Durum == "idle" ? ("Boşta") : (Durum == "dnd" ? ("Rahatsız Etmeyin") : (Durum==undefined ? ("Çevrimdışı") : ("Bilinmiyor"))))))
      
      
       
              
                  let cihaz;
                  let cihaz2 = member.presence?.clientStatus
                  if (cihaz2 == undefined) {
                     cihaz = "Çevrimdışı"
                  }
                  if (cihaz2 != undefined) {
                if (Object.keys(member.presence?.clientStatus)[0] == "desktop") {
                   cihaz = "Bilgisayar"
                }
                if (Object.keys(member.presence?.clientStatus)[0] == "mobile") {
                   cihaz = "Telefon"
                }
                if (Object.keys(member.presence?.clientStatus)[0] == "web") {
                   cihaz = "İnternet Sitesi"
                }
              }
      
      


              const menuke = new ActionRowBuilder()
              .addComponents(

              new StringSelectMenuBuilder()
              .setCustomId('veriler')
              .setPlaceholder('🪪 ʏᴇᴛᴋıʟı/ꜱᴇꜱ/ᴍᴇꜱᴀᴊ ᴠᴇʀɪʟᴇʀıɴᴇ ɢᴏᴢ ᴀᴛ')
              .addOptions(
                
                new StringSelectMenuOptionBuilder()
                .setLabel('ᴀɴᴀ ꜱᴀʏꜰᴀ')
                .setEmoji("<:9132house:1129943083954487326>")
                // .setDescription("Sizi Ana Sayfaya Yönlendirir")
                .setValue('anasayfa'),
               
               
                new StringSelectMenuOptionBuilder()
                .setLabel('▬▬▬▬▬▬▬▬▬▬▬▬')
                .setEmoji("<:2700dndgray:1129950510573703168>")
                .setValue('xzw'),
               
               
                new StringSelectMenuOptionBuilder()
                      .setLabel('ᴛᴏᴘʟᴀᴍ ʏᴇᴛᴋıʟı ıꜱᴛᴀᴛıꜱᴛıᴋʟᴇʀı')
                      .setEmoji("<:8676gasp:1327585524231176192>")
                      .setValue('toplamyt'),
                 
                      new StringSelectMenuOptionBuilder()
                      .setLabel('ᴛᴏᴘʟᴀᴍ ꜱᴇꜱ ıꜱᴛᴀᴛıꜱᴛıᴋʟᴇʀı')
                      .setEmoji("<:2911voicebadge:1129951541911113798>")
                      .setValue('toplamses'),
                
                      new StringSelectMenuOptionBuilder()
                      .setLabel('ᴛᴏᴘʟᴀᴍ ᴍᴇꜱᴀᴊ ıꜱᴛᴀᴛıꜱᴛıᴋʟᴇʀı')
                      .setEmoji("<:3389discordchannel:1129951540480856135>")
                      .setValue('toplamesaj'),






                      new StringSelectMenuOptionBuilder()
                      .setLabel('▬▬▬▬▬▬▬▬▬▬▬▬')
                      .setEmoji("<:2700dndgray:1129950510573703168>")
                      .setValue('x'),






                      new StringSelectMenuOptionBuilder()
                      .setLabel('ɢᴜɴʟᴜᴋ ʏᴇᴛᴋıʟı ıꜱᴛᴀᴛıꜱᴛıᴋʟᴇʀı')
                      .setEmoji("<:8676gasp:1327585524231176192>")
                      .setValue('gunlukyt'),
                 
                 
                      new StringSelectMenuOptionBuilder()
                      .setLabel('ɢᴜɴʟᴜᴋ ꜱᴇꜱ ıꜱᴛᴀᴛıꜱᴛıᴋʟᴇʀı')
                      .setEmoji("<:2911voicebadge:1129951541911113798>")
                      .setValue('gunlukses'),
                
                
                      new StringSelectMenuOptionBuilder()
                      .setLabel('ɢᴜɴʟᴜᴋ ᴍᴇꜱᴀᴊ ıꜱᴛᴀᴛıꜱᴛıᴋʟᴇʀı')
                      .setEmoji("<:3389discordchannel:1129951540480856135>")
                      .setValue('gunlukmesaj'),









                      new StringSelectMenuOptionBuilder()
                      .setLabel('▬▬▬▬▬▬▬▬▬▬▬▬')
                      .setEmoji("<:2700dndgray:1129950510573703168>")
                      .setValue('xw'),





                      new StringSelectMenuOptionBuilder()
                      .setLabel('ʜᴀꜰᴛᴀʟıᴋ ʏᴇᴛᴋıʟı ıꜱᴛᴀᴛıꜱᴛıᴋʟᴇʀı')
                      .setEmoji("<:8676gasp:1327585524231176192>")
                      .setValue('haftalıkyt'),
                 
                 
                      new StringSelectMenuOptionBuilder()
                      .setLabel('ʜᴀꜰᴛᴀʟıᴋ ꜱᴇꜱ ıꜱᴛᴀᴛıꜱᴛıᴋʟᴇʀı')
                      .setEmoji("<:2911voicebadge:1129951541911113798>")
                      .setValue('haftalıkses'),
                 
                 
                      new StringSelectMenuOptionBuilder()
                      .setLabel('ʜᴀꜰᴛᴀʟıᴋ ᴍᴇꜱᴀᴊ ıꜱᴛᴀᴛıꜱᴛıᴋʟᴇʀı')
                      .setEmoji("<:3389discordchannel:1129951540480856135>")
                      .setValue('haftalıkmesaj'),





              )


              )



























      
      
              const embed = new EmbedBuilder()
              .setDescription(`» ${member.toString()}, *üyesinin* , \`${guild.name}\` *sunucusundaki verileri/bilgileri aşağıda belirtilmiştir.*
          
              
              <:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ ıꜱᴍɪ: ${member.user.username}\`
              <:1709locked:1327585185864351756>・ \`ʏᴇᴛᴋɪʟɪ ıᴅ: ${member.user.id}\`
              <a:discorsel:1327600219017187380> ・ \`ʏᴇᴛᴋɪʟɪ ᴅᴜʀᴜᴍᴜ: ${durm}\`
              <a:alertcute:1327585812300304436> ・ \`ɢɪʀɪꜱ ʙɪʟɢɪʟᴇʀɪ: ${cihaz}\`
              <a:animated_clock29:1327586135039410223> ・ \`ᴋᴜʀᴜʟᴜꜱ ᴛᴀʀɪʜɪ: ${moment(member.user.createdTimestamp).format('LLLL')}\`
                     
          
                    <:8676gasp:1327585524231176192> ・ \`ꜱᴜɴᴜᴄᴜᴅᴀᴋɪ ıꜱᴍı: ${member.displayName}\`
                    <a:grsaqw:1327600230484672513> ・ \`ꜱᴜɴᴜᴄᴜʏᴀ ᴋᴀᴛıʟıᴍ ᴛᴀʀɪʜɪ: ${moment.utc(member.joinedAt).format('Do MMMM YYYY')} - ${checkDays(member.joinedAt)}\`
                    <a:utility:1327600287367696515> ・ \`ꜱᴜɴᴜᴄᴜʏᴀ ᴋᴀᴛıʟıᴍ ꜱıʀᴀꜱı: ${(interaction.guild.members.cache.filter(a => a.joinedTimestamp <= member.joinedTimestamp).size).toLocaleString()}/${(interaction.guild.memberCount).toLocaleString()}\`
                     <a:5961darkbluetea:1327585257578561548> ・ \`ꜱᴜɴᴜᴄᴜᴅᴀᴋɪ ʀᴏʟʟᴇʀɪ:\` ${member.roles.cache.size <= 5 ? member.roles.cache.filter(x => x.name !== "@everyone").map(x => `${x}`).join(' ~ ') : `\`Listelenemedi! (${member.roles.cache.size})`}
            
              
              `)
                    .setColor('#041f49')
                    .addFields(
                        { name: "**NOT:**",  value: `\`\`\`fix
» MENÜYÜ KULLANARAK VERİLERİNİZE ERİŞEBİLİRSİNİZ\`\`\`
                        `, inline: true })
                   .setFooter({ text: `🌐 ${ayarlar.Embed.authorembed} ・ ${moment(Date.now()).format("LLL")}` })
                   .setAuthor({
                     name:`${member.displayName}`, 
                     iconURL: member.user.avatarURL({dynamic: true})})
                   .setThumbnail(member.user.avatarURL({dynamic:true}))


const ilkembed = await interaction.reply({ embeds: [embed] , components: [menuke]})








const filter = i => i.user.id === interaction.member.id;
let collector = await ilkembed.createMessageComponentCollector({ componentType: ComponentType.StringSelect , filter })




collector.on("collect", async (x) => {
                  
        if (!x.isStringSelectMenu()) return;
        const value = x.values[0]


        if (value === `anasayfa`) {
          await x.deferUpdate();

await ilkembed.edit({ embeds: [embed] , files: [] , components: [menuke]})




        }



        if (value === `toplamesaj`) {
          // await x.deferUpdate();

          const messageUserData = await messageUserChannel.find({ userID: member.id }).sort({ channelData: -1 });
          const docsx = await messageUserChannel.findOne({ userID: member.user.id });

          let messageChannelTop = [];

        if (!docsx) return x.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Oyuncuya ait hiç bir veri bulunmamaktadır.*")] , ephemeral: true })
        await x.deferUpdate();

          // if (!docsx) return x.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Oyuncuya ait hiç bir veri bulunmamaktadır.*")] , ephemeral: true })


          messageUserData.splice(0, 5).map((x, index) => messageChannelTop.push({ top: index + 1, avatar: "https://cdn.discordapp.com/attachments/1129925980060921896/1129952080963059822/3389-discord-channel.png", tag: interaction.guild.channels.cache.get(x.channelID) ? interaction.guild.channels.cache.get(x.channelID).name : "Silinmiş Kanal", score: `${Number(x.channelData).toLocaleString()} Mesaj` }))

          // voiceChannelData.splice(0, 5).map(async (x, index) => voiceChannelTop.push({ top: index + 1, avatar: "https://cdn.discordapp.com/attachments/1129925980060921896/1129952081265041459/2911-voice-badge.png", tag: interaction.guild.channels.cache.get(x.channelId) ? interaction.guild.channels.cache.get(x.channelId).name : "Silinmiş Kanal", score: `${moment.duration(x.channelData).format("m [Dakika] ")}` }))
          
          
          
          const top = await new canvafy.Top()
          .setOpacity(0.6)
          .setScoreMessage("Mesaj:") //(Preferred Option)
          .setabbreviateNumber(false) //(Preferred Option)
          .setBackground("image", ayarlar.Resimler.moderasyonURL) //(Preferred Option)
          .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff', firstRank: '#f7c716', secondRank: '#9e9e9e', thirdRank: '#94610f' }) //(Preferred Option)
          .setUsersData(messageChannelTop)
          .build();
          
          
          await ilkembed.edit({
            embeds: [],
            components: [menuke],
              files: [{
                attachment: top,
                name: `top-mesaj-alsia.png`
              } ]})
          
     
     
     
          }










          if (value === `toplamses`) {
  
            const SesChannelData = await voiceUserChannel.find({ userID: member.id }).sort({ channelData: -1 });
            const docsw = await voiceUserChannel.findOne({ userID: member.user.id });

            let SesChannelTop = [];
  
            if (!docsw) return x.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Oyuncuya ait hiç bir veri bulunmamaktadır.*")] , ephemeral: true })
            await x.deferUpdate();
  
            SesChannelData.splice(0, 5).map((x, index) => SesChannelTop.push({ top: index + 1, avatar: "https://cdn.discordapp.com/attachments/1129925980060921896/1129952081265041459/2911-voice-badge.png", tag: interaction.guild.channels.cache.get(x.channelID) ? interaction.guild.channels.cache.get(x.channelID).name : "Silinmiş Kanal", score: `${moment.duration(x.channelData).format("H [saat], m [dakika]")}` }))
  
            // voiceChannelData.splice(0, 5).map(async (x, index) => voiceChannelTop.push({ top: index + 1, avatar: "https://cdn.discordapp.com/attachments/1129925980060921896/1129952081265041459/2911-voice-badge.png", tag: interaction.guild.channels.cache.get(x.channelId) ? interaction.guild.channels.cache.get(x.channelId).name : "Silinmiş Kanal", score: `${moment.duration(x.channelData).format("m [Dakika] ")}` }))
            
            
            
            const top = await new canvafy.Top()
            .setOpacity(0.6)
            .setScoreMessage("") //(Preferred Option)
            .setabbreviateNumber(false) //(Preferred Option)
            .setBackground("image", ayarlar.Resimler.moderasyonURL) //(Preferred Option)
            .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff', firstRank: '#f7c716', secondRank: '#9e9e9e', thirdRank: '#94610f' }) //(Preferred Option)
            .setUsersData(SesChannelTop)
            .build();
            
            
            await ilkembed.edit({
              embeds: [],
              components: [menuke],
                files: [{
                  attachment: top,
                  name: `top-ses-alsia.png`
                } ]})
            
       
       
       
            }




            const YetkiliDB = require("../../../database/yetkili-veri")
            const messageUser = require("../../../database/messageUser");
            const voiceUser = require("../../../database/voiceUser");




            if (value === `toplamyt`) {


              const docs = await YetkiliDB.findOne({Yetkili: member.id});
              const docsx = await voiceUser.findOne({userID: member.id});
              const docsm = await messageUser.findOne({userID: member.id});




              if (!docs)  return x.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetkiliye ait hiç bir veri bulunmamaktadır.*")] , ephemeral: true })
              await x.deferUpdate();


              const profile = await new canvafy.Profile()
              .setUser(member.user.id)
              .setGiriş(`${member.displayName}`) 

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
              
              .setBorder("#f0f0f0")
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
           
           
           
              await ilkembed.edit({
                embeds: [],
                components: [menuke],
                  files: [{
                    attachment: profile,
                    name: `yetkili-${member.user.username}-alsia.png`
                  } ]})
           
           
           
           
           
           
           
           
            }













































// GUNLUK VERILER

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



















































if (value === `gunlukmesaj`) {
  // await x.deferUpdate();

  const messageUserData = await messageUserChannel.find({ userID: member.id }).sort({ GchannelData: -1 });
  const docsx = await messageUserChannel.findOne({ userID: member.user.id });

  let messageChannelTop = [];

if (!docsx) return x.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Oyuncuya ait hiç bir veri bulunmamaktadır.*")] , ephemeral: true })
await x.deferUpdate();



  messageUserData.splice(0, 5).map((x, index) => messageChannelTop.push({ top: index + 1, avatar: "https://cdn.discordapp.com/attachments/1129925980060921896/1129952080963059822/3389-discord-channel.png", tag: interaction.guild.channels.cache.get(x.channelID) ? interaction.guild.channels.cache.get(x.channelID).name : "Silinmiş Kanal", score: `${Number(x.GchannelData).toLocaleString()} Mesaj` }))

  
  
  
  const top = await new canvafy.Top()
  .setOpacity(0.6)
  .setScoreMessage("Mesaj:") //(Preferred Option)
  .setabbreviateNumber(false) //(Preferred Option)
  .setBackground("image", ayarlar.Resimler.moderasyonURL) //(Preferred Option)
  .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff', firstRank: '#f7c716', secondRank: '#9e9e9e', thirdRank: '#94610f' }) //(Preferred Option)
  .setUsersData(messageChannelTop)
  .build();
  
  
  await ilkembed.edit({
    embeds: [],
    components: [menuke],
      files: [{
        attachment: top,
        name: `top-mesaj-alsia.png`
      } ]})
  



  }





  if (value === `gunlukses`) {
  
    const SesChannelData = await voiceUserChannel.find({ userID: member.id }).sort({ GchannelData: -1 });
    const docsw = await voiceUserChannel.findOne({ userID: member.user.id });

    let SesChannelTop = [];

    if (!docsw) return x.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Oyuncuya ait hiç bir veri bulunmamaktadır.*")] , ephemeral: true })
    await x.deferUpdate();

    SesChannelData.splice(0, 5).map((x, index) => SesChannelTop.push({ top: index + 1, avatar: "https://cdn.discordapp.com/attachments/1129925980060921896/1129952081265041459/2911-voice-badge.png", tag: interaction.guild.channels.cache.get(x.channelID) ? interaction.guild.channels.cache.get(x.channelID).name : "Silinmiş Kanal", score: `${moment.duration(x.GchannelData).format("H [saat], m [dakika]")}` }))

    // voiceChannelData.splice(0, 5).map(async (x, index) => voiceChannelTop.push({ top: index + 1, avatar: "https://cdn.discordapp.com/attachments/1129925980060921896/1129952081265041459/2911-voice-badge.png", tag: interaction.guild.channels.cache.get(x.channelId) ? interaction.guild.channels.cache.get(x.channelId).name : "Silinmiş Kanal", score: `${moment.duration(x.channelData).format("m [Dakika] ")}` }))
    
    
    
    const top = await new canvafy.Top()
    .setOpacity(0.6)
    .setScoreMessage("") //(Preferred Option)
    .setabbreviateNumber(false) //(Preferred Option)
    .setBackground("image", ayarlar.Resimler.moderasyonURL) //(Preferred Option)
    .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff', firstRank: '#f7c716', secondRank: '#9e9e9e', thirdRank: '#94610f' }) //(Preferred Option)
    .setUsersData(SesChannelTop)
    .build();
    
    
    await ilkembed.edit({
      embeds: [],
      components: [menuke],
        files: [{
          attachment: top,
          name: `top-ses-alsia.png`
        } ]})
    



    }














    if (value === `gunlukyt`) {


      const docs = await YetkiliDB.findOne({Yetkili: member.id});
      const docsx = await voiceUser.findOne({userID: member.id});
      const docsm = await messageUser.findOne({userID: member.id});




      if (!docs)  return x.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetkiliye ait hiç bir veri bulunmamaktadır.*")] , ephemeral: true })
      await x.deferUpdate();


      const profile = await new canvafy.Profile3()
      .setUser(member.user.id)
      .setGiriş(`${member.displayName}`) 



        .setWhitelist(`${docs.GWlRed}`) // Wl Red
        .setStaff(`${docs.GWlOnay}`) // Wl Onay
        .setSes(`${moment.duration(docsx.dailyStat).format("H [Saat], m [dakika] s [saniye]")}`)
        .setMesaj(`${docsm.dailyStat} Mesaj`)
        .setÇıkış(`${docs.GWlRed}`) // İPTAL
        .setBan(`${docs.GBan}`)
        .setUnban(`${docs.GUnban}`)
        .setİsim(`${docs.Gİsim}`)
    .setWlCeza(`${docs.GWlCeza}`)
    .setUyarı(`${docs.GUyarı}`)
    .setTicket(`${docs.GTicket}`)
        .setPermAdd(`${docs.GPermVerme}`)
        .setPermRemove(`${docs.GPermAlma}`)
  
      .setBorder("#111214")
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
   
   
   
      await ilkembed.edit({
        embeds: [],
        components: [menuke],
          files: [{
            attachment: profile,
            name: `yetkili-${member.user.username}-alsia.png`
          } ]})
   
   
   
   
   
   
   
   
    }





































// GUNLUK VERILER

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////













































if (value === `gunlukses`) {
  // await x.deferUpdate();

  const messageUserData = await messageUserChannel.find({ userID: member.id }).sort({ HchannelData: -1 });
  const docsx = await messageUserChannel.findOne({ userID: member.user.id });

  let messageChannelTop = [];

if (!docsx) return x.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Oyuncuya ait hiç bir veri bulunmamaktadır.*")] , ephemeral: true })
await x.deferUpdate();



  messageUserData.splice(0, 5).map((x, index) => messageChannelTop.push({ top: index + 1, avatar: "https://cdn.discordapp.com/attachments/1129925980060921896/1129952080963059822/3389-discord-channel.png", tag: interaction.guild.channels.cache.get(x.channelID) ? interaction.guild.channels.cache.get(x.channelID).name : "Silinmiş Kanal", score: `${Number(x.HchannelData).toLocaleString()} Mesaj` }))

  
  
  
  const top = await new canvafy.Top()
  .setOpacity(0.6)
  .setScoreMessage("Mesaj:") //(Preferred Option)
  .setabbreviateNumber(false) //(Preferred Option)
  .setBackground("image", ayarlar.Resimler.moderasyonURL) //(Preferred Option)
  .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff', firstRank: '#f7c716', secondRank: '#9e9e9e', thirdRank: '#94610f' }) //(Preferred Option)
  .setUsersData(messageChannelTop)
  .build();
  
  
  await ilkembed.edit({
    embeds: [],
    components: [menuke],
      files: [{
        attachment: top,
        name: `top-mesaj-alsia.png`
      } ]})
  



  }





  if (value === `haftalıkses`) {
  
    const SesChannelData = await voiceUserChannel.find({ userID: member.id }).sort({ HchannelData: -1 });
    const docsw = await voiceUserChannel.findOne({ userID: member.user.id });

    let SesChannelTop = [];

    if (!docsw) return x.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Oyuncuya ait hiç bir veri bulunmamaktadır.*")] , ephemeral: true })
    await x.deferUpdate();

    SesChannelData.splice(0, 5).map((x, index) => SesChannelTop.push({ top: index + 1, avatar: "https://cdn.discordapp.com/attachments/1129925980060921896/1129952081265041459/2911-voice-badge.png", tag: interaction.guild.channels.cache.get(x.channelID) ? interaction.guild.channels.cache.get(x.channelID).name : "Silinmiş Kanal", score: `${moment.duration(x.HchannelData).format("H [saat], m [dakika]")}` }))

    // voiceChannelData.splice(0, 5).map(async (x, index) => voiceChannelTop.push({ top: index + 1, avatar: "https://cdn.discordapp.com/attachments/1129925980060921896/1129952081265041459/2911-voice-badge.png", tag: interaction.guild.channels.cache.get(x.channelId) ? interaction.guild.channels.cache.get(x.channelId).name : "Silinmiş Kanal", score: `${moment.duration(x.channelData).format("m [Dakika] ")}` }))
    
    
    
    const top = await new canvafy.Top()
    .setOpacity(0.6)
    .setScoreMessage("") //(Preferred Option)
    .setabbreviateNumber(false) //(Preferred Option)
    .setBackground("image", ayarlar.Resimler.moderasyonURL) //(Preferred Option)
    .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff', firstRank: '#f7c716', secondRank: '#9e9e9e', thirdRank: '#94610f' }) //(Preferred Option)
    .setUsersData(SesChannelTop)
    .build();
    
    
    await ilkembed.edit({
      embeds: [],
      components: [menuke],
        files: [{
          attachment: top,
          name: `top-ses-alsia.png`
        } ]})
    



    }














    if (value === `haftalıkyt`) {


      const docs = await YetkiliDB.findOne({Yetkili: member.id});
      const docsx = await voiceUser.findOne({userID: member.id});
      const docsm = await messageUser.findOne({userID: member.id});




      if (!docs)  return x.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetkiliye ait hiç bir veri bulunmamaktadır.*")] , ephemeral: true })
      await x.deferUpdate();


      const profile = await new canvafy.Profile2()
      .setUser(member.user.id)
      .setGiriş(`${member.displayName}`) 



        .setWhitelist(`${docs.HWlRed}`) // Wl Red
        .setStaff(`${docs.HWlOnay}`) // Wl Onay
        .setSes(`${moment.duration(docsx.weeklyStat).format("H [Saat], m [dakika] s [saniye]")}`)
        .setMesaj(`${docsm.weeklyStat} Mesaj`)
        .setÇıkış(`${docs.HWlRed}`) // İPTAL
        .setBan(`${docs.HBan}`)
        .setUnban(`${docs.HUnban}`)
        .setİsim(`${docs.Hİsim}`)
    .setWlCeza(`${docs.HWlCeza}`)
    .setUyarı(`${docs.HUyarı}`)
    .setTicket(`${docs.HTicket}`)
        .setPermAdd(`${docs.HPermVerme}`)
        .setPermRemove(`${docs.HPermAlma}`)
  
      .setBorder("#111214")
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
   
   
   
      await ilkembed.edit({
        embeds: [],
        components: [menuke],
          files: [{
            attachment: profile,
            name: `yetkili-${member.user.username}-alsia.png`
          } ]})
   
   
   
   
   
   
   
   
    }



















































    })


















   
   
    }
 };


 
