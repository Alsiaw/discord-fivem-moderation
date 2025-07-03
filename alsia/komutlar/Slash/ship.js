const {ChannelType  ,EmbedBuilder, PermissionsBitField, AttachmentBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ayarlar = require("../../../ayarlar.json")

const moment = require("moment");
moment.locale("tr")

const canvafy = require("canvafy")




module.exports = {
  data: new SlashCommandBuilder()
    .setName("ship")
    .setDescription("Aşk Oyunları...")
    .addUserOption(option =>
        option.
        
        setName('oyuncu')
        .setDescription('Lütfen bir oyuncu seçiniz Örnek: alsiaw')
        .setRequired(false)
    ),




			alsia: async (client, interaction) => {
    
				const oyuncu = interaction.options.getMember('oyuncu') || interaction.guild.members.cache.random();

				const guild = interaction.guild



                if(!oyuncu) return interaction.reply({ content: '*Geçerli ve yakınından birini seç aşkını uzak diyarlarda arama?*' , ephemeral: true})




                const ship = await new canvafy.Ship()
                .setAvatars(interaction.member.user.displayAvatarURL({ dynamic: true, extension: "png" }),oyuncu.user.displayAvatarURL({ dynamic: true, extension: "png" }))
                .setBackground("image", ayarlar.Resimler.moderasyonURL)
                .setBorder("#bb8add")
                .setOverlayOpacity(0.2)
                .build();




                interaction.reply({
                    content:`||${interaction.member} ? ${oyuncu}||`,
                    files: [{ 
                      attachment: ship,
                      name: `alsiaship-${interaction.member.id}.png`
                    }]
                });


   
   
   
   
    }
 };
