const {ChannelType  ,EmbedBuilder, PermissionsBitField, AttachmentBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ayarlar = require("../../../ayarlar.json")

const canvafy = require("canvafy")
const moment = require("moment");
moment.locale("tr")



const EtiketDB = require("../../../database/etiket-veri.js")


module.exports = {
  data: new SlashCommandBuilder()
    .setName("etiket-sorgu")
    .setDescription("Etiket ID'sinden Sorgulama Yaparsınız.")
	.addStringOption(option =>
        option.
           setName('id')
          .setDescription('ID giriniz lütfen örnek: #1881')
          .setRequired(true)
    ),




			alsia: async (client, interaction) => {
    
				const etiketID = interaction.options.getString('id')

				const guild = interaction.guild

    
              



                if(!/#/i.test(etiketID)) return interaction.reply({ content: "*'#' > koymayı unuttun örnek: #325*" , ephemeral: true}).catch(() => {});

              
              
                const EtiketVarmı = await EtiketDB.findOne({ ID: etiketID })

              
                const Warn = new EmbedBuilder()
                .setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
                .setColor("#490404")
                .setTimestamp()
                
                const roles = ayarlar.Yetkiler.Staff;
                if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")] , ephemeral: true })
                if (!EtiketVarmı)  return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Bu etiket ID'sine ait hiç bir veri bulunmamaktadır.*")] , ephemeral: true })





















              
              
                const messageUsersData = await EtiketDB.find({ ID: etiketID })

                const messageUsers = messageUsersData
                    .splice(0, 100)
                    .map((x, index) => `${x.Yetkili}`)
                    .join("\n");



                    const messageUsersDataO = await EtiketDB.find({ ID: etiketID })

                    const messageUsersO = messageUsersDataO
                    .splice(0, 100)
                    .map((x, index) => `${x.Oyuncu}`)
                    .join("\n");


                    const messageUsersDataOLAY = await EtiketDB.find({ ID: etiketID })

                    const messageUsersOLAY = messageUsersDataOLAY
                    .splice(0, 100)
                    .map((x, index) => `${x.Olay}`)
                    .join("\n");

                    const messageUsersDataHEX = await EtiketDB.find({ ID: etiketID })

                    const messageUsersHEX = messageUsersDataHEX
                    .splice(0, 100)
                    .map((x, index) => `${x.Sebep}`)
                    .join("\n");



                    const messageUsersDataTarih = await EtiketDB.find({ ID: etiketID })

                    const messageUsersTarih = messageUsersDataTarih
                    .splice(0, 100)
                    .map((x, index) => `${x.Tarih}`)
                    .join("\n");












                    const OyuncuAD = await EtiketDB.find({ ID: etiketID })

                    const OyuncuADX = OyuncuAD
                    .splice(0, 100)
                    .map((x, index) => `${x.OyuncuAD}`)
                    .join("\n");


                    const YetkiliAD = await EtiketDB.find({ ID: etiketID })

                    const YetkiliADX = YetkiliAD
                    .splice(0, 100)
                    .map((x, index) => `${x.YetkiliAD}`)
                    .join("\n");



                    const SebepX = await EtiketDB.find({ ID: etiketID })

                    const SebepXD = SebepX
                    .splice(0, 100)
                    .map((x, index) => `${x.SebepX}`)
                    .join("\n");


                const yetkili = guild.members.cache.get(messageUsers);
                const oyuncu = guild.members.cache.get(messageUsersO);





        


                


         


            


if(oyuncu) {


  const canvas = new Canvafy.WelcomeLeave()
  .setAvatar(oyuncu.user.displayAvatarURL({ forceStatic: true, extension: "png" } || interaction.member.user.displayAvatarURL({ forceStatic: true, extension: "png" })))
  .setBackground("image", ayarlar.Resimler.moderasyonURL)
  // .setBackground("image", "https://cdn.discordapp.com/attachments/1112203212678778940/1116683500804911104/940f0c70c7a84209cca88535e7ce28a3.png")
  .setTitle(messageUsersOLAY)
  .setDescription(`KULLANILMIYOR`)
  .setBorder("#dfa8d8")
  .setCezaID(`Yetkili: ${YetkiliADX}`)
  .setOyuncu(`Oyuncu: ${OyuncuADX}`)
  .setYetkili(`#100`)
  .setSebep(SebepXD)
  .setAvatarBorder("#ffffff")
  .setOverlayOpacity(0.5)
  .build();



  const yenimsg = await interaction.deferReply({ ephemeral: true , files: [{ attachment: welcome, name: "sorgu-alsia.png" }] }).catch(() => {});



 
  const alsiawlceza = new EmbedBuilder()
  .setImage(`attachment://sorgu-alsia-log.png`)
  .setDescription(`<a:tehlikesel:1327600281029967953> ・ \`${etiketID}\` - \`ɪᴅ'ɴɪɴ ᴅᴇᴛᴀʏʟɪ ʙɪʟɢɪꜱɪ:\`

  <a:5961darkbluetea:1327585257578561548> ・ \`ʏᴇᴛᴋıʟı:\` <@${messageUsers}>
  <a:unlemsel:1327600285597569066>  ・ \`ᴏʏᴜɴᴄᴜ:\` <@${messageUsersO}>
  <a:utility:1327600287367696515> ・ \`${messageUsersHEX}\`
  <a:animated_clock29:1327586135039410223> ・ \`ᴛᴀʀıʜ: ${messageUsersTarih}\``)
    .setColor("#050505")
    .setThumbnail(interaction.member.user.avatarURL({dynamic:true})) 
    .setFooter({ text: `🌐 ${ayarlar.Embed.authorembed} ・ ${moment(Date.now()).format("LLL")}` })

 await yenimsg.edit({ embeds: [alsiawlceza] , files: [{ attachment: welcome, name: "sorgu-alsia-log.png" }] })


return false







}







if(!oyuncu) {

  const welcome2 = await new canvafy.Bankart()
  .setAvatar(interaction.member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
  .setBackground("image", ayarlar.Resimler.moderasyonURL)
  // .setBackground("image", "https://cdn.discordapp.com/attachments/1112203212678778940/1116683500804911104/940f0c70c7a84209cca88535e7ce28a3.png")
  .setTitle(messageUsersOLAY)
  .setDescription(`KULLANILMIYOR`)
  .setBorder("#dfa8d8")
  .setCezaID(`Yetkili: ${YetkiliADX}`)
  .setOyuncu(`Oyuncu: ${OyuncuADX}`)
  .setYetkili(`#100`)
  .setSebep(SebepXD)
  .setAvatarBorder("#ffffff")
  .setOverlayOpacity(0.5)
  .build();



  const yenimsg = await interaction.deferReply({ ephemeral: true , files: [{ attachment: welcome2, name: "sorgu-alsia.png" }] }).catch(() => {});


 
  const alsiawlceza = new EmbedBuilder()
  .setImage(`attachment://sorgu-alsia-log.png`)
  .setDescription(`<a:tehlikesel:1327600281029967953> ・ \`${etiketID}\` - \`ɪᴅ'ɴɪɴ ᴅᴇᴛᴀʏʟɪ ʙɪʟɢɪꜱɪ:\`

  <a:5961darkbluetea:1327585257578561548> ・ \`ʏᴇᴛᴋıʟı:\` <@${messageUsers}>
  <a:unlemsel:1327600285597569066>  ・ \`ᴏʏᴜɴᴄᴜ:\` <@${messageUsersO}>
  <a:utility:1327600287367696515> ・ \`${messageUsersHEX}\`
  <a:animated_clock29:1327586135039410223> ・ \`ᴛᴀʀıʜ: ${messageUsersTarih}\``)
    .setColor("#050505")
    .setThumbnail(interaction.member.user.avatarURL({dynamic:true})) 
    .setFooter({ text: `🌐 ${ayarlar.Embed.authorembed} ・ ${moment(Date.now()).format("LLL")}` })

 await yenimsg.edit({ embeds: [alsiawlceza] , files: [{ attachment: welcome2, name: "sorgu-alsia-log.png" }] })


return false





  }

            
                   



















   
   
   
   
    }
 };
