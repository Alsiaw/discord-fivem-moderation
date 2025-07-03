const {ChannelType  ,EmbedBuilder, PermissionsBitField, AttachmentBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ayarlar = require("../../../ayarlar.json")
const levels  = require("../../../database/level.js")

const moment = require("moment");
moment.locale("tr")
require('moment-duration-format');
const canvafy = require("canvafy");


const AfkDB = require("../../../database/afk.js")


module.exports = {
  data: new SlashCommandBuilder()
    .setName("seviye")
    .setDescription("Seviyenize Bakarsınız.")
    .addUserOption(option =>
      option.
         setName('oyuncu')
        .setDescription('Oyuncu giriniz lütfen örnek: @alsiaw')
        .setRequired(false)
  ),




			alsia: async (client, interaction) => {
    

				const guild = interaction.guild


				const Oyuncu = interaction.options.getMember('oyuncu') || interaction.member




        const x = await levels.findOne({ guildID: guild.id, userID: Oyuncu.id })
        const rank = await new canvafy.Rank()
            .setAvatar(Oyuncu.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
            .setBackground("image", ayarlar.Resimler.moderasyonURL)
            .setUsername(Oyuncu.displayName ? Oyuncu.displayName : Oyuncu.user.username)
            .setBorder("#ffffff")
            .setStatus(Oyuncu.presence?.status)
            .setLevel(x ? x.level : 1)
            .setRank(x ? x.level : 1)
            .setCurrentXp(x ? x.xp : 1)
            .setRequiredXp(x ? x.gerekli : 100)
            .build();
           await interaction.reply({files:[{attachment:rank,name: `seviye-alsia-${Oyuncu.id}.png`}]});






























   
   
   
   
    }
 };
