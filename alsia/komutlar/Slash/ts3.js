const {ChannelType  ,EmbedBuilder, PermissionsBitField, AttachmentBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ayarlar = require("../../../ayarlar.json")

const moment = require("moment");
moment.locale("tr")





module.exports = {
  data: new SlashCommandBuilder()
    .setName("ts3")
    .setDescription("Sunucu Ts3 Bilgilerini Gösterir."),




			alsia: async (client, interaction) => {
    

				const guild = interaction.guild







                const embed = new EmbedBuilder()
                .setColor('#041f49')
        
                .setDescription(`
                <:fivem:1327600224419577886> ・ \`ᴛᴇᴀᴍ ꜱᴘᴇᴀᴋ: ${ayarlar.FiveM.SunucuTS}\`
                <a:5961darkbluetea:1327585257578561548> ・ \`ʜıᴢʟı ʙᴀɢʟᴀɴᴛı:\` [Tıkla](<@278152550627409921> iletişime geçiniz)`)
                .setAuthor({
                name: `${interaction.member.displayName}`, 
                iconURL: interaction.member.user.avatarURL({dynamic: true})})
                .setTimestamp()
                
             await interaction.reply({embeds: [embed] , ephemeral: true}).catch(() => {});






   
   
   
   
    }
 };
