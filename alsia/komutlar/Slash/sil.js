const { EmbedBuilder, AttachmentBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ayarlar = require("../../../ayarlar.json");

const moment = require("moment");
moment.locale("tr");
const { writeFile } = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sil")
    .setDescription("Toplu Ve Hızlı Bir Şekilde Mesajları Silmeye İşe Yarar.")
    .addIntegerOption(option =>
        option.setName('miktar')
          .setDescription('Silinicek Mesaj Miktarını Giriniz: 100')
          .setRequired(true)
    ),

  alsia: async (client, interaction) => {
    const clear = interaction.options.getInteger('miktar');
    const guild = interaction.guild;
    const channel = interaction.channel;

    const Warn = new EmbedBuilder()
      .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({dynamic: true}) })
      .setColor("#490404")
      .setTimestamp();

    const roles = ayarlar.Yetkiler.Staff;

    if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) 
      return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")] , ephemeral: true });
    if (!channel.manageable) 
      return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Botun yetkisi yetmemektedir.*`)] , ephemeral: true });

    if (clear > 100) 
      return interaction.reply({ content: "100 Mesajdan Fazlasını Silemezsin.", ephemeral: true });

    const id = Math.floor(Math.random() * 9999999999) + 10000000000;

    const embed = new EmbedBuilder()
      .setDescription(`<a:utility:1327600287367696515> ・ *Başarılı Bir Şekilde* \`${clear}\` *Adet Mesajı Sildin.*`)
      .setAuthor({
        name:`${interaction.member.user.username}`, 
        iconURL: interaction.member.user.avatarURL({dynamic: true})
      })
      .setFooter({ text: moment(Date.now()).format("LLL") })
      .setColor('#09437a');
    await interaction.reply({embeds: [embed]}).catch(() => {});

    // Mesajları transcript oluşturmak yerine txt dosyası olarak kaydediyoruz.
    let messageData = '';
    const fetchedMessages = await channel.messages.fetch({ limit: clear });
    fetchedMessages.forEach(msg => {
      messageData += `Mesaj ID: ${msg.id} | Gönderen: ${msg.author.tag} | İçerik: ${msg.content}\n\n`;
    });

    // TXT dosyasına kaydet
    const filePath = `./${id}.txt`;
    writeFile(filePath, messageData, function(err) {
      if (err) throw err;
    });

    // Log mesajı
    const LogEmbeds = new EmbedBuilder()
      .setDescription(`<a:utility:1327600287367696515> ・ \`Yetkili:  ${interaction.member.displayName} | ${interaction.member.id}\`
        <a:tehlikesel:1327600281029967953> ・ \`Tarih:  ${moment(Date.now()).format("LLL")}\``)
      .setAuthor({
        name:`Mesaj Silme İşlemi`, 
        iconURL: interaction.guild.iconURL({dynamic: true})
      })
      .setColor('#0e2694')
      .setThumbnail(interaction.member.user.avatarURL({dynamic: true}));

    const logChannel = client.channels.cache.get(ayarlar.KomutLOG.SilmeLOG);
    if (logChannel) {
      // Log kanalına hem embed hem dosyayı gönder
      const attachment = new AttachmentBuilder(filePath);
      await logChannel.send({
        content: `Silinen mesajların verileri:`,
        embeds: [LogEmbeds],
        files: [attachment]
      });
    }

    // Mesajları sil
    await channel.bulkDelete(clear).catch(() => {});
  }
};
