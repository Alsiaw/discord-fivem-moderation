const {ChannelType  ,EmbedBuilder, PermissionsBitField, AttachmentBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ayarlar = require("../../../ayarlar.json")

const moment = require("moment");
moment.locale("tr")



const AfkDB = require("../../../database/afk.js")


module.exports = {
  data: new SlashCommandBuilder()
    .setName("afk")
    .setDescription("Discordda Aktif Bir Şekilde Bulunmuyormusunuz Bu Komut Tam Size Göre.")
	.addStringOption(option =>
        option.
           setName('sebep')
          .setDescription('Sebep giriniz lütfen örnek: dışarıdayım')
          .setRequired(true)
    ),




			alsia: async (client, interaction) => {
    
				const Sebep = interaction.options.getString('sebep')

				const guild = interaction.guild






        const Warn = new EmbedBuilder()
        .setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
        .setColor("#490404")
        .setTimestamp()
        
        const roles = ayarlar.Yetkiler.Staff;
        
        if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")] , ephemeral: true })
        if (interaction.channelId !== ayarlar.Yetkiler.BotKomut) return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Sadece* <#${ayarlar.Yetkiler.BotKomut}> *kanalında kullanabilirsin*`)] , ephemeral: true  })
        // if (!interaction.member.manageable) return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Botun yetkisi yetmemektedir.*`)] , ephemeral: true  })








    if (interaction.member.displayName.includes("[AFK]")) return;

    await AfkDB.findOneAndUpdate({ guildID: guild.id, userID: interaction.member.id }, { $set: { reason: Sebep, date: Date.now() } }, { upsert: true });

    const embed = new EmbedBuilder()
    .setColor('#041f49')
    .setFooter({ text: `🌐 ${ayarlar.Embed.authorembed} ・ ${moment(Date.now()).format("LLL")}` })
    .setDescription(`<a:mesaj:1327600246619901962> ・ ${interaction.member} *isimli oyuncu başarılı bir şekilde* \`${Sebep}\` *sebebi ile* ***afk*** *moduna girdi.*`)
    .setAuthor({
      name: `${interaction.member.displayName}`, 
      iconURL: interaction.member.user.avatarURL({dynamic: true})})
      await interaction.reply({embeds: [embed]}).catch(() => {});
    if (interaction.member.manageable) interaction.member.setNickname(`[AFK] ${interaction.member.displayName}`).catch(() => {});












   
   
   
   
    }
 };
