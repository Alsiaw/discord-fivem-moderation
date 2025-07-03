const {ChannelType  ,EmbedBuilder, PermissionsBitField, AttachmentBuilder , ActivityType} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ayarlar = require("../../../ayarlar.json")

const moment = require("moment");
moment.locale("tr")

const canvafy = require("canvafy")




module.exports = {
  data: new SlashCommandBuilder()
    .setName("spotify")
    .setDescription("Kim ne dinliyor merak mı ettin?")
    .addUserOption(option =>
        option.
        
        setName('oyuncu')
        .setDescription('Lütfen bir oyuncu seçiniz Örnek: alsiaw')
        .setRequired(true)
    ),




			alsia: async (client, interaction) => {
    
				const oyuncu = interaction.options.getMember('oyuncu') 

				const guild = interaction.guild



                if(!oyuncu) return interaction.reply({ content: '*Geçerli bir oyuncu seç müzikleri uzakta arama?*' , ephemeral: true})




                if (oyuncu && oyuncu.presence && oyuncu.presence.activities && oyuncu.presence.activities.some(alsia => alsia.name == "Spotify" && alsia.type == ActivityType.Listening)) {
                  const durum = await oyuncu.presence.activities.find(alsia => alsia.type == ActivityType.Listening);
                  const spotify = await new canvafy.Spotify()
                  .setAuthor(`${durum.state}`)
                  .setAlbum(durum.assets.largeText)
                  .setBackground("image", `${guild.bannerURL({extension:"png",size:2048}) !== null ? guild.bannerURL({extension:"png",size:2048}) : ayarlar.Resimler.moderasyonURL}`)
                  .setImage(`https://i.scdn.co/image/${durum.assets.largeImage.slice(8)}`)
                  .setTimestamp(new Date(Date.now()).getTime() - new Date(durum.timestamps.start).getTime(), new Date(durum.timestamps.end).getTime() - new Date(durum.timestamps.start).getTime())
                  .setTitle(`${oyuncu.displayName} - ${durum.details}`)
                  .build();


                  const yenimsg = await interaction.deferReply({})

                  await yenimsg.edit({
                    content:`||${oyuncu}||`,
                    files: [{ 
                      attachment: spotify,
                      name: `alsia-spotify-${oyuncu.id}.png`
                    }]
                });


              }
   
   
   
    }
 };
