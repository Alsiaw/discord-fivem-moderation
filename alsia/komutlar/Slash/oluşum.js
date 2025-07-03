const { ChannelType, EmbedBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonStyle, ButtonBuilder, PermissionFlagsBits } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ayarlar = require("../../../ayarlar.json");
const moment = require("moment");
const canvafy = require('canvafy');
const fs = require('fs');

moment.locale("tr");

// JSON dosyasını oku veya oluştur
const ROLES_FILE = './roles.json';
if (!fs.existsSync(ROLES_FILE)) {
  fs.writeFileSync(ROLES_FILE, JSON.stringify({}));
}

const getRolesData = () => JSON.parse(fs.readFileSync(ROLES_FILE, 'utf-8'));
const saveRolesData = (data) => fs.writeFileSync(ROLES_FILE, JSON.stringify(data, null, 2));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("oluşum-kur")
    .setDescription("Oluşum açmanıza işe yarar bir komuttur.")
    .addStringOption(option =>
      option
        .setName('isim')
        .setDescription('Lütfen açılacak oluşum adını giriniz: Alsia St.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('renk')
        .setDescription('Lütfen açılacak oluşum rengi giriniz: #ffffff')
        .setRequired(true)
    )
    .addUserOption(option =>
      option
        .setName('boss')
        .setDescription('Lütfen bir oyuncu giriniz örnek: @alsiaw')
        .setRequired(true)
    ),

  alsia: async (client, interaction) => {
    const İsim = interaction.options.getString('isim');
    const Patron = interaction.options.getMember('boss');
    const Renk = interaction.options.getString('renk');
    const guild = interaction.guild;

    if (ayarlar.Oluşum.BaşvuruSistemi === false) {
      return interaction.reply({ content: "*- Başvuru sistemi kapalı.*", ephemeral: true });
    }

    const Warn = new EmbedBuilder()
      .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true }) })
      .setColor("#490404")
      .setTimestamp();

    const roles = ayarlar.Yetkiler.Staff;
    if (!Patron) {
      return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Lütfen geçerli bir oyuncu seçiniz!*`)], ephemeral: true });
    }
    if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) {
      return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")], ephemeral: true });
    }
    if (interaction.channelId !== ayarlar.Yetkiler.BotKomut) {
      return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Sadece* <#${ayarlar.Yetkiler.BotKomut}> *kanalında kullanabilirsin*`)], ephemeral: true });
    }
    if (!/^#[0-9A-F]{6}$/i.test(Renk)) {
      return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Lütfen geçerli bir renk kodu girin.* **Örneğin:** #00ffcc`)], ephemeral: true });
    }

    await interaction.deferReply({});

    let mainRole = guild.roles.cache.get(ayarlar.Oluşum.RolAltı);
    const alsiarol = await guild.roles.create({
      color: Renk,
      name: İsim,
      position: mainRole.position + 1,
      hoist: true,
      mentionable: true,
    });

    await Patron.roles.add(alsiarol).catch(() => {});

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("oluşum")
          .setLabel("Oyuncu Ekle")
          .setStyle(ButtonStyle.Primary)
          .setEmoji("<a:gzlk:1327600232963248239>"),
        new ButtonBuilder()
          .setCustomId("oluşumçıkra")
          .setLabel("Oyuncu Çıkar")
          .setStyle(ButtonStyle.Danger)
          .setEmoji("<a:gzlk:1327600232963248239>")
      );

    let Başvuru;
    if (ayarlar.Oluşum.BaşvuruAçık === true) {
      Başvuru = await guild.channels.create({
        name: `${İsim}-başvuru`,
        type: ChannelType.GuildText,
        topic: `Başvuru Oluşum: ${İsim} | Tarih: ${moment(Date.now()).format("LLL")} `,
        parent: ayarlar.Oluşum.BaşvuruKategori,
        permissionOverwrites: [
          { id: Patron, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.SendMessages] },
          { id: ayarlar.Permler.Whitelist, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory], deny: [PermissionFlagsBits.AttachFiles, PermissionFlagsBits.SendMessages] },
          { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] },
        ],
      });
    }

    const ticket = await guild.channels.create({
      name: ayarlar.Oluşum.BaşvuruAçık ? `🔫・${İsim}-sınırsız` : `🔫${İsim}-sınırsız`,
      type: ChannelType.GuildText,
      topic: `Sınırsız Ticket: ${İsim} | Tarih: ${moment(Date.now()).format("LLL")} `,
      parent: ayarlar.Oluşum.SınırsızKategori,
      permissionOverwrites: [
        { id: Patron, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.SendMessages] },
        { id: alsiarol, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.SendMessages] },
        ayarlar.Oluşum.BaşvuruAçık ? { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] } : { id: ayarlar.Permler.Yetkili, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.SendMessages] },
        { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] },
      ],
    });

    // Rol ve kanal bilgisini JSON dosyasına kaydet
    const rolesData = getRolesData();
    rolesData[ticket.id] = { roleId: alsiarol.id, name: İsim };
    saveRolesData(rolesData);

    const welcome = await new canvafy.WelcomeLeave()
      .setAvatar(interaction.guild.iconURL({ forceStatic: true, extension: "png" }))
      .setBackground("image", ayarlar.Resimler.moderasyonURL)
      .setTitle(`${İsim}`)
      .setDescription(`Boss: ${Patron.user.username} \n\n Tür: Custom Gang \n ${moment(Date.now()).format("LLL")}`)
      .setBorder("#0e0707")
      .setAvatarBorder("#ffffff")
      .setOverlayOpacity(0.5)
      .build();

    const logembed = await ticket.send({ files: [{ attachment: welcome, name: "olusum-alsia.png" }] }).catch(() => {});

    const embed = new EmbedBuilder()
      .setColor("#051b50")
      .setTitle(`${İsim} - Sınırsız Ticket`)
      .setImage(`attachment://olusum-alsia.png`)
      .setDescription(`<:8676gasp:1327585524231176192>  ・ *Sınırsız destek talebiniz açılmış bulunmaktadır yetkililerimiz ile burdan iletişime geçebilirsiniz özel konuları ticket kanalından destek talebi açarak yardım alabilirsiniz.*\n\n<a:5961darkbluetea:1327585257578561548>  ・ \`ᴏʟᴜꜱᴜᴍ:\` ${alsiarol}${ayarlar.Oluşum.BaşvuruAçık ? `\n<a:gzlk:1327600232963248239> ・ \`ʙᴀꜱᴠᴜʀᴜ ᴋᴀɴᴀʟı:\` ${Başvuru}` : ''}`)
      .setFooter({ text: `🌐 ${ayarlar.Embed.authorembed} ・ ${moment(Date.now()).format("LLL")}` });

    await logembed.edit({ embeds: [embed], files: [{ attachment: welcome, name: "olusum-alsia.png" }], components: [row] }).catch(() => {});

    const successEmbed = new EmbedBuilder()
      .setDescription(`<a:5961darkbluetea:1327585257578561548>  ・ ${Patron} *İsimli oyuncunun* \`${İsim}\` *isimli oluşumu açılmıştır.*\n\n<:8676gasp:1327585524231176192>  ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}`)
      .setAuthor({ name: `${interaction.member.displayName}`, iconURL: interaction.member.user.avatarURL({ dynamic: true }) })
      .setColor("#051b50");

    await interaction.editReply({ embeds: [successEmbed] }).catch(() => {});
    await guild.channels.cache.get(ayarlar.Oluşum.Log).send({ embeds: [successEmbed] }).catch(() => {});
  },
};

// Oyuncu Ekle/Çıkar Butonları
client.on("interactionCreate", async interaction => {
  if (interaction.customId === `oluşum`) {
    const modal = new ModalBuilder()
      .setCustomId(`oluşum-ekle`)
      .setTitle(`${ayarlar.Embed.FormAD} - OYUNCU EKLE`);

    const favoriteColorInput = new TextInputBuilder()
      .setCustomId('üye')
      .setLabel("Oyuncu ID?")
      .setStyle(TextInputStyle.Short);

    const secondActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
    modal.addComponents(secondActionRow);

    await interaction.showModal(modal).catch(() => {});
  }

  if (interaction.customId === `oluşumçıkra`) {
    const modal = new ModalBuilder()
      .setCustomId(`oluşum-çıkar`)
      .setTitle(`${ayarlar.Embed.FormAD} - OYUNCU ÇIKAR`);

    const favoriteColorInput = new TextInputBuilder()
      .setCustomId('üye')
      .setLabel("Oyuncu ID?")
      .setStyle(TextInputStyle.Short);

    const secondActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
    modal.addComponents(secondActionRow);

    await interaction.showModal(modal).catch(() => {});
  }
});

// Modal İşlemleri
client.on("interactionCreate", async interaction => {
  if (interaction.customId === `oluşum-ekle`) {
    const OyuncuID = interaction.fields.getTextInputValue('üye');
    const guild = interaction.guild;
    const member = await guild.members.fetch(OyuncuID).catch(() => null);

    if (!member) {
      return interaction.reply({ content: "Geçerli bir oyuncu bulunamadı!", ephemeral: true });
    }

    const rolesData = getRolesData();
    const roleInfo = rolesData[interaction.channel.id];

    if (!roleInfo || !roleInfo.roleId) {
      return interaction.reply({ content: "Oluşum rolü bulunamadı!", ephemeral: true });
    }

    const alsiarol = guild.roles.cache.get(roleInfo.roleId);
    if (!alsiarol) {
      return interaction.reply({ content: "Oluşum rolü sunucuda mevcut değil!", ephemeral: true });
    }

    await member.roles.add(alsiarol).catch(() => {});
    await interaction.channel.permissionOverwrites.edit(OyuncuID, {
      [PermissionFlagsBits.ViewChannel]: true,
      [PermissionFlagsBits.SendMessages]: true,
    }).catch(() => {});

    const embed = new EmbedBuilder()
      .setDescription(`<a:5961darkbluetea:1327585257578561548>  ・ <@${OyuncuID}> *İsimli oyuncu oluşum üyesi olarak eklendi* \n\n<:8676gasp:1327585524231176192>  ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}`)
      .setAuthor({ name: `${interaction.member.displayName}`, iconURL: interaction.member.user.avatarURL({ dynamic: true }) })
      .setColor("#051b50");

    await interaction.reply({ embeds: [embed] }).catch(() => {});
  }

  if (interaction.customId === `oluşum-çıkar`) {
    const OyuncuID = interaction.fields.getTextInputValue('üye');
    const guild = interaction.guild;
    const member = await guild.members.fetch(OyuncuID).catch(() => null);

    if (!member) {
      return interaction.reply({ content: "Geçerli bir oyuncu bulunamadı!", ephemeral: true });
    }

    const rolesData = getRolesData();
    const roleInfo = rolesData[interaction.channel.id];

    if (!roleInfo || !roleInfo.roleId) {
      return interaction.reply({ content: "Oluşum rolü bulunamadı!", ephemeral: true });
    }

    const alsiarol = guild.roles.cache.get(roleInfo.roleId);
    if (!alsiarol) {
      return interaction.reply({ content: "Oluşum rolü sunucuda mevcut değil!", ephemeral: true });
    }

    await member.roles.remove(alsiarol).catch(() => {});
    await interaction.channel.permissionOverwrites.edit(OyuncuID, {
      [PermissionFlagsBits.ViewChannel]: false,
      [PermissionFlagsBits.SendMessages]: false,
    }).catch(() => {});

    const embed = new EmbedBuilder()
      .setDescription(`<a:5961darkbluetea:1327585257578561548>  ・ <@${OyuncuID}> *İsimli oyuncu oluşum üyeliğinden çıkarıldı*\n\n<:8676gasp:1327585524231176192>  ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}`)
      .setAuthor({ name: `${interaction.member.displayName}`, iconURL: interaction.member.user.avatarURL({ dynamic: true }) })
      .setColor("#051b50");

    await interaction.reply({ embeds: [embed] }).catch(() => {});
  }
});