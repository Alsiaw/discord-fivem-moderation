const { ChannelType, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ayarlar = require("../../../ayarlar.json");
const canvafy = require("canvafy");
const moment = require("moment");
moment.locale("tr");
const IDB = require("../../../database/ID.js");
const EtiketDB = require("../../../database/etiket-veri.js");
const SicilDB = require("../../../database/sicil.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bir oyuncuyu sunucudan yasaklarsınız!")
    .addUserOption(option =>
      option.setName('oyuncu').setDescription('Oyuncu giriniz.').setRequired(true))
    .addStringOption(option =>
      option.setName('sebep').setDescription('Sebep giriniz.').setRequired(true)),

  async execute(interaction, client) {
    const member = interaction.options.getMember('oyuncu');
    const sebep = interaction.options.getString('sebep');
    const guild = interaction.guild;

    const Warn = new EmbedBuilder()
      .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setColor("#490404")
      .setTimestamp();

    const roles = ayarlar.Yetkiler.BanYetki;
    if (!interaction.member.roles.cache.some(r => roles.includes(r.id)))
      return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")], ephemeral: true });

    if (!member)
      return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Geçerli bir oyuncu seçiniz.*")], ephemeral: true });

    if (interaction.user.id === member.id)
      return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Kendinemi Ceza Vericeksin.*")], ephemeral: true });

    if (member.roles.highest.position >= interaction.member.roles.highest.position)
      return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Kendinden yüksek kişilere ceza veremessin.*")], ephemeral: true });

    if (!member.bannable)
      return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Botun yetkisi yetmemektedir.*")], ephemeral: true });

    await interaction.deferReply({ ephemeral: false });

    await IDB.findOneAndUpdate({ SunucuID: guild.id }, { $inc: { ID: 1 } }, { upsert: true });
    const veri = await IDB.findOne({ SunucuID: guild.id });
    const CezaID = `#${veri?.ID || 1}`;

    const embed = new EmbedBuilder()
      .setColor('#041f49')
      .setFooter({ text: moment().format("LLL") })
      .setDescription(`<:bsanned:1327586232506515479> ・ ${member} *isimli oyuncu sunucudan başarılı bir şekilde* \`${sebep}\` *sebebi ile yasaklandı.*\n\n<:bugsal:1327586234876301332> ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}\n<a:5961darkbluetea:1327585257578561548> ・ \`ᴄᴇᴢᴀ ıᴅ: ${CezaID}\``)
      .setAuthor({ name: interaction.member.displayName, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

    await interaction.editReply({ embeds: [embed] });

    const { Ban } = require("canvafy");
    const welcome = await new Ban()
      .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
      .setBackground("image", ayarlar.Resimler.moderasyonURL)
      .setTitle("YASAKLANDI")
      .setDescription(`Yetkili: ${interaction.user.username} \n\n\n Oyuncu: ${member.user.username}  \n Sebep: ${sebep} \n Ceza ID: ${CezaID}`)
      .setBorder("#0e0707")
      .setCezaID(`Yetkili: ${interaction.member.displayName}`)
      .setOyuncu(`Oyuncu: ${member.user.username}`)
      .setYetkili(CezaID)
      .setSebep(`Sebep: ${sebep}`)
      .setAvatarBorder("#ffffff")
      .setOverlayOpacity(0.7)
      .build();

    const CezaMesaj = new EmbedBuilder()
      .setImage(`attachment://ban-log.png`)
      .setDescription(`<:8676gasp:1327585524231176192> ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}\n<a:5961darkbluetea:1327585257578561548> ・ \`ᴏʏᴜɴᴄᴜ:\` ${member}`)
      .setFooter({ text: `Ⓜ️ CezaID: ${CezaID} ・ ${moment().format("LLL")}` })
      .setAuthor({ name: `${ayarlar.Embed.authorembed} - ʏᴀꜱᴀᴋʟᴀᴍᴀ`, iconURL: guild.iconURL({ dynamic: true }) })
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setColor("#051b50")
      .addFields({ name: "**SEBEP:**", value: `\`\`\`fix\n» ${sebep}\`\`\``, inline: true });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("anasayfa")
        .setLabel("ʙᴀɴ ɪᴛɪʀᴀᴢ ꜰᴏʀᴍʟᴀʀɪ ʙᴇʟʟɪ ᴀʀᴀʟɪᴋʟᴀʀʟᴀ ᴏᴋᴜɴᴍᴀᴋᴛᴀᴅɪʀ")
        .setStyle(ButtonStyle.Primary)
        .setDisabled(true)
        .setEmoji("<:9200windowscalendar:1129943980570836992>")
    );

    const banmesaj = new EmbedBuilder()
      .setAuthor({ name: `${ayarlar.Embed.SunucuAD} -  SUNUCUDAN YASAKLANDINIZ!`, iconURL: guild.iconURL({ dynamic: true }) })
      .setDescription(`<:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` ${interaction.member} \n<a:5961darkbluetea:1327585257578561548> ・ \`ꜱᴇʙᴇᴘ: ${sebep}\`\n<a:tehlikesel:1327600281029967953> ・ \`ᴄᴇᴢᴀ ıᴅ: ${CezaID}\`\n<a:utility:1327600287367696515> ・ \`ᴛᴀʀɪʜ: ${moment().format("LLL")}\`\n<a:discorsel:1327600219017187380> ・ [(ᴅɪꜱᴄᴏʀᴅ)](${ayarlar.Bot.SunucuDavet})\n\n\`🌐 ${ayarlar.Embed.authorembed} ・ ${moment().format("LLL")}\``)
      .setImage('https://cdn.discordapp.com/attachments/912750000625319936/989882505861668884/2ff7864398ce94419154951206f048a5.gif')
      .setColor('#200527')
      .setThumbnail(guild.iconURL({ dynamic: true }));

    await member.send({ embeds: [banmesaj], components: [row] }).catch(() => {});
    await guild.members.ban(member, {
      reason: `Yetkili: ${interaction.user.username} | Sebep: ${sebep} | Tarih: ${moment().format("LLL")} | CezaID: ${CezaID}`
    }).catch(() => {});

    const logChannel = guild.channels.cache.get(ayarlar.KomutLOG.BanLOG);
    const cezaChannel = guild.channels.cache.get(ayarlar.KomutLOG.CezaOda);

    if (logChannel) await logChannel.send({ embeds: [CezaMesaj], files: [{ attachment: welcome, name: "ban-log.png" }] });
    if (cezaChannel) await cezaChannel.send({ embeds: [CezaMesaj], files: [{ attachment: welcome, name: "ban-log.png" }] });

    await EtiketDB.updateOne(
      { Sunucu: guild.id, ID: CezaID },
      {
        $set: {
          Oyuncu: member.id,
          Yetkili: interaction.member.id,
          Tarih: moment().format("LLL"),
          Sebep: `ꜱᴇʙᴇᴘ: ${sebep}`,
          SebepX: `Sebep: ${sebep}`,
          YetkiliAD: interaction.user.username,
          OyuncuAD: member.user.username,
          Olay: "YASAKLAMA",
          Yazı: `<:bsanned:1327586232506515479> ・ **[BAN]** ***${interaction.member} *tarafından* \`${sebep}\` *sebebi ile sunucudan başarılı bir şekilde yasaklanmıştır.*`
        }
      },
      { upsert: true }
    );

    await SicilDB.findOneAndUpdate(
      { Sunucu: guild.id, Oyuncu: member.id },
      {
        $push: {
          Sicil: {
            Yetkili: interaction.member.id,
            Tarih: moment().format("LLL"),
            Sebep: sebep,
            Olay: "[YASAKLAMA]",
            ID: CezaID
          }
        }
      },
      { upsert: true }
    );
  }
};
