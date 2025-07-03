const { ChannelType, EmbedBuilder, PermissionsBitField, AttachmentBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const ayarlar = require("../../../ayarlar.json")
const { YamlDatabase } = require('five.db');
const db = new YamlDatabase();
const moment = require('moment');
moment.locale('tr');
const canvafy = require('canvafy');
const math = require('mathjs');
const ms = require('ms');
const IDB = require("../../../database/ID.js");
const EtiketDB = require("../../../database/etiket-veri.js");
const SicilDB = require("../../../database/sicil.js");
const YetkiliDB = require("../../../database/yetkili-veri.js");
const SunucuDB = require("../../../database/gunluk-veri.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('uyarı')
    .setDescription('Bir kullanıcıya uyarı vermenize işe yarar.')
    .addUserOption(option =>
      option
        .setName('oyuncu')
        .setDescription('Oyuncu giriniz lütfen örnek @alsiaw')
        .setRequired(true)
    )
  
    .addStringOption(option =>
      option
        .setName('sebep')
        .setDescription('Sebep giriniz lütfen örnek power gaming')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName('ceza')
        .setDescription('Uyarı giriniz lütfen örnek 7')
        .setMaxValue(7)
        .setMinValue(1)
        .setRequired(true)
    )
    .addAttachmentOption(option =>
      option
        .setName('kanıt')
        .setDescription('Kanıt Dosyanızı Yükleyiniz.')
        .setRequired(false)
    ),

  async alsia(client, interaction) {
    const Oyuncu = interaction.options.getMember('oyuncu');
    const Sebep = interaction.options.getString('sebep');
    const Ceza = interaction.options.getInteger('ceza');
    const File = interaction.options.getAttachment('kanıt');
    const guild = interaction.guild;

    const Warn = new EmbedBuilder()
      .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({ dynamic: true }) })
      .setColor('#490404')
      .setTimestamp();

    const roles = ayarlar.Yetkiler.Staff;
    if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) {
      return interaction.reply({ embeds: [Warn.setDescription('aunlemsel1327600285597569066 ・ Uyarı: Yetersiz veya geçersiz yetki.')] , ephemeral: true });
    }
    if (!Oyuncu) {
      return interaction.reply({ embeds: [Warn.setDescription('aunlemsel1327600285597569066 ・ Uyarı: Geçerli bir oyuncu seçiniz.')] , ephemeral: true });
    }
    if (interaction.member.id === Oyuncu.id) {
      return interaction.reply({ embeds: [Warn.setDescription('aunlemsel1327600285597569066 ・ Uyarı: Kendinemi Ceza Vericeksin.')] , ephemeral: true });
    }
    if (Oyuncu && Oyuncu.roles.highest.position >= interaction.member.roles.highest.position) {
      return interaction.reply({ embeds: [Warn.setDescription('aunlemsel1327600285597569066 ・ Uyarı: Kendinden yüksek kişilere ceza veremessin.')] , ephemeral: true }).catch(() => {});
    }
    if (interaction.channelId !== ayarlar.Yetkiler.BotKomut) {
      return interaction.reply({ embeds: [Warn.setDescription(`aunlemsel1327600285597569066 ・ Uyarı: Sadece #${ayarlar.Yetkiler.BotKomut} kanalında kullanabilirsin`)] , ephemeral: true });
    }
    if (!Oyuncu.manageable) {
      return interaction.reply({ embeds: [Warn.setDescription(`aunlemsel1327600285597569066 ・ Uyarı: Botun yetkisi yetmemektedir.`)] , ephemeral: true });
    }

    const CezaVarmı = db.get(`uyarı-${Oyuncu.id}`);

    if (!CezaVarmı) {
      await IDB.findOneAndUpdate(
        { SunucuID: guild.id },
        { $inc: { ID: 1 } },
        { upsert: true }
      );

      const messageUsersData = await IDB.find({ SunucuID: guild.id });
      const messageUsers = messageUsersData
        .splice(0, 100)
        .map((x) => `${x.ID}`)
        .join('\n');

      const embed = new EmbedBuilder()
        .setDescription(
          `a5961darkbluetea1327585257578561548 ・ ${Oyuncu} İsimli oyuncuya başarıyla \`${Ceza}x\` değerinde uyarı verilmiştir.\n\n` +
          `8676gasp1327585524231176192 ・ \`ʏᴇᴛᴋıʟı\` ${interaction.member}\n` +
          `aduyuru1327600220879716396 ・ \`ᴄᴇᴢᴀ ıᴅ #${messageUsers.length ? messageUsers : 'Veri Bulunmuyor.'}\``
        )
        .setAuthor({
          name: `${interaction.member.displayName}`,
          iconURL: interaction.member.user.avatarURL({ dynamic: true }),
        })
        .setColor('#051b50');

      await interaction.reply({ embeds: [embed] }).catch(() => {});

      const welcome = await new canvafy.WelcomeLeave()
        .setAvatar(Oyuncu.user.displayAvatarURL({ forceStatic: true, extension: 'png' }))
        .setBackground('image', ayarlar.Resimler.moderasyonURL)
        .setTitle('UYARI')
        .setDescription(`Yetkili ${interaction.member.displayName}\nOyuncu ${Oyuncu.user.username}\nCeza ${Ceza}x Uyarı`)
        .setBorder('#0e0707')
        .setAvatarBorder('#ffffff')
        .setOverlayOpacity(0.5)
        .build();

      const logembed = await guild.channels.cache
        .get(ayarlar.KomutLOG.CezaOda)
        .send({ files: [{ attachment: welcome, name: 'wlceza-alsia.png' }] });
      const cezaembed = await guild.channels.cache
        .get(ayarlar.KomutLOG.uyarıLOG)
        .send({ files: [{ attachment: welcome, name: 'wlceza-alsia.png' }] });

      let CezaMesaj = new EmbedBuilder()
        .setImage(`attachment://wlceza-alsia.png`)
        .setDescription(
          `8676gasp1327585524231176192 ・ \`ʏᴇᴛᴋıʟı\` ${interaction.member}\n` +
          `a5961darkbluetea1327585257578561548 ・ \`ᴏʏᴜɴᴄᴜ\` ${Oyuncu}\n` +
          (File ? `1709locked1327585185864351756 ・ \`ᴋᴀɴıᴛ\` [ᴛıᴋʟᴀ](${File.url})\n` : '')
        )
        .setFooter({
          text: `Ⓜ️ CezaID #${messageUsers.length ? messageUsers : 'Veri Bulunmuyor.'} ・ ${moment(Date.now()).format('LLL')}`,
        })
        .setAuthor({
          name: `${ayarlar.Embed.authorembed} - ᴜʏᴀʀɪ`,
          iconURL: guild.iconURL({ dynamic: true }),
        })
        .setThumbnail(Oyuncu.user.avatarURL({ dynamic: true }))
        .setColor('#051b50')
        .addFields({
          name: 'SEBEP',
          value: `\`\`\`fix\n» ${Sebep}\`\`\``,
          inline: true,
        });

      await logembed.edit({
        embeds: [CezaMesaj],
        files: [{ attachment: welcome, name: 'wlceza-alsia.png' }],
      }).catch(() => {});
      await cezaembed.edit({
        embeds: [CezaMesaj],
        files: [{ attachment: welcome, name: 'wlceza-alsia.png' }],
      }).catch(() => {});

      await db.set(`uyarı-${Oyuncu.id}`, {
        Oyuncu: Oyuncu.user.username,
        Yetkili: interaction.member.displayName,
        Ceza: `${Ceza}`,
        Tarih: moment(Date.now()).format('LLL'),
        Süre: Date.now() + ms('7d'),
      });

      if (Ceza === 1) await Oyuncu.roles.add(ayarlar.Uyarı['1x']).catch(() => {});
      if (Ceza === 2) await Oyuncu.roles.add(ayarlar.Uyarı['2x']).catch(() => {});
      if (Ceza === 3) await Oyuncu.roles.add(ayarlar.Uyarı['3x']).catch(() => {});
      if (Ceza === 4) await Oyuncu.roles.add(ayarlar.Uyarı['4x']).catch(() => {});
      if (Ceza === 5) await Oyuncu.roles.add(ayarlar.Uyarı['5x']).catch(() => {});
      if (Ceza === 6) await Oyuncu.roles.add(ayarlar.Uyarı['6x']).catch(() => {});
      if (Ceza === 7) await Oyuncu.roles.add(ayarlar.Uyarı['7x']).catch(() => {});

      await EtiketDB.updateOne(
        { Sunucu: guild.id, ID: `#${messageUsers.length ? messageUsers : 'Veri Bulunmuyor.'}` },
        {
          $set: {
            Oyuncu: Oyuncu.id,
            Yetkili: interaction.member.id,
            Tarih: moment(Date.now()).format('LLL'),
            Sebep: `ꜱᴇʙᴇᴘ ${Sebep}`,
            SebepX: `Ceza ${Ceza}x Uyarı`,
            YetkiliAD: interaction.member.user.username,
            OyuncuAD: Oyuncu.user.username,
            Olay: 'UYARI',
            Yazı: `bsanned1327586232506515479 ・ [UYARI] ${interaction.member} tarafından \`${Sebep}\` sebebi ile sunucudan başarılı bir şekilde yasaklanmıştır.`,
          },
        },
        { upsert: true }
      );

      await SicilDB.findOneAndUpdate(
        { Sunucu: guild.id, Oyuncu: Oyuncu.id },
        {
          $push: {
            Sicil: {
              Yetkili: interaction.member.id,
              Tarih: moment(Date.now()).format('LLL'),
              Sebep: `${Sebep} - ${Ceza}x Uyarı`,
              Olay: ['UYARI'],
              ID: `#${messageUsers.length ? messageUsers : 'Veri Bulunmuyor.'}`,
            },
          },
        },
        { upsert: true }
      );

      await SunucuDB.findOneAndUpdate(
        { Sunucu: guild.id },
        { $inc: { Uyarı: 1 } },
        { upsert: true }
      );

      await YetkiliDB.findOneAndUpdate(
        { Sunucu: guild.id, Yetkili: interaction.member.id },
        { $inc: { Uyarı: 1, GUyarı: 1, HUyarı: 1 } },
        { upsert: true }
      );
    }

    if (CezaVarmı) {
      const Cezası = db.get(`uyarı-${Oyuncu.id}.Ceza`);
      const Tarih = db.get(`uyarı-${Oyuncu.id}.Süre`);

      const toplamx = await math.evaluate(`${Cezası} + ${Ceza}`);
      if (toplamx > ayarlar.Uyarı.UyarıLimit) {
        return interaction.reply({
          embeds: [
            Warn.setDescription(
              `aunlemsel1327600285597569066 ・ Uyarı: Uyarı veremezsin çünkü 7x'i aşıyor. WL cezası vermen lazım. Eğer 7x'i aşıyorsa uyarı-iptal komutunu kullanınız, sonra WL ceza veriniz.`
            ),
          ],
          ephemeral: true,
        });
      }

      await IDB.findOneAndUpdate(
        { SunucuID: guild.id },
        { $inc: { ID: 1 } },
        { upsert: true }
      );

      const messageUsersData = await IDB.find({ SunucuID: guild.id });
      const messageUsers = messageUsersData
        .splice(0, 100)
        .map((x) => `${x.ID}`)
        .join('\n');

      const embed = new EmbedBuilder()
        .setDescription(
          `a5961darkbluetea1327585257578561548 ・ ${Oyuncu} İsimli oyuncuya \`${Ceza}x\` uyarı verilerek cezası güncellenmiştir.\n\n` +
          `8676gasp1327585524231176192 ・ \`ʏᴇᴛᴋıʟı\` ${interaction.member}\n` +
          `aduyuru1327600220879716396 ・ \`ᴄᴇᴢᴀ ıᴅ #${messageUsers.length ? messageUsers : 'Veri Bulunmuyor.'}\`\n` +
          `autility1327600287367696515 ・ \`ᴛᴏᴘʟᴀᴍ ᴄᴇᴢᴀ ${Cezası}x » ${toplamx}x\``
        )
        .setAuthor({
          name: `${interaction.member.displayName}`,
          iconURL: interaction.member.user.avatarURL({ dynamic: true }),
        })
        .setColor('#051b50');

      await interaction.reply({ embeds: [embed] }).catch(() => {});

      const welcome = await new canvafy.WelcomeLeave()
        .setAvatar(Oyuncu.user.displayAvatarURL({ forceStatic: true, extension: 'png' }))
        .setBackground('image', ayarlar.Resimler.moderasyonURL)
        .setTitle('UYARI')
        .setDescription(
          `Yetkili ${interaction.member.displayName}\nOyuncu ${Oyuncu.user.username}\nCeza ${Ceza}x Uyarı\nCeza ${Cezası}x » ${toplamx}x`
        )
        .setBorder('#0e0707')
        .setAvatarBorder('#ffffff')
        .setOverlayOpacity(0.5)
        .build();

      const logembed = await guild.channels.cache
        .get(ayarlar.KomutLOG.CezaOda)
        .send({ files: [{ attachment: welcome, name: 'wlceza-alsia.png' }] });
      const cezaembed = await guild.channels.cache
        .get(ayarlar.KomutLOG.uyarıLOG)
        .send({ files: [{ attachment: welcome, name: 'wlceza-alsia.png' }] });

      let CezaMesaj = new EmbedBuilder()
        .setImage(`attachment://wlceza-alsia.png`)
        .setDescription(
          `8676gasp1327585524231176192 ・ \`ʏᴇᴛᴋıʟı\` ${interaction.member}\n` +
          `a5961darkbluetea1327585257578561548 ・ \`ᴏʏᴜɴᴄᴜ\` ${Oyuncu}\n` +
          (File ? `1709locked1327585185864351756 ・ \`ᴋᴀɴıᴛ\` [ᴛıᴋʟᴀ](${File.url})\n` : '')
        )
        .setFooter({
          text: `Ⓜ️ CezaID #${messageUsers.length ? messageUsers : 'Veri Bulunmuyor.'} ・ ${moment(Date.now()).format('LLL')}`,
        })
        .setAuthor({
          name: `${ayarlar.Embed.authorembed} - ᴜʏᴀʀɪ ɢᴜɴᴄᴇʟʟᴇɴᴅı`,
          iconURL: guild.iconURL({ dynamic: true }),
        })
        .setThumbnail(Oyuncu.user.avatarURL({ dynamic: true }))
        .setColor('#051b50')
        .addFields({
          name: 'SEBEP',
          value: `\`\`\`fix\n» ${Sebep}\`\`\``,
          inline: true,
        });

      await logembed.edit({
        embeds: [CezaMesaj],
        files: [{ attachment: welcome, name: 'wlceza-alsia.png' }],
      }).catch(() => {});
      await cezaembed.edit({
        embeds: [CezaMesaj],
        files: [{ attachment: welcome, name: 'wlceza-alsia.png' }],
      }).catch(() => {});

      await db.delete(`uyarı-${Oyuncu.id}`);
      await db.set(`uyarı-${Oyuncu.id}`, {
        Oyuncu: Oyuncu.user.username,
        Yetkili: interaction.member.displayName,
        Ceza: `${toplamx}`,
        Tarih: moment(Date.now()).format('LLL'),
        Süre: Tarih,
      });

      if (toplamx === 2) {
        await Oyuncu.roles.add(ayarlar.Uyarı['2x']).catch(() => {});
        await Oyuncu.roles.remove(ayarlar.Uyarı['1x']).catch(() => {});
      }
      if (toplamx === 3) {
        await Oyuncu.roles.add(ayarlar.Uyarı['3x']).catch(() => {});
        await Oyuncu.roles.remove(ayarlar.Uyarı['1x']).catch(() => {});
        await Oyuncu.roles.remove(ayarlar.Uyarı['2x']).catch(() => {});
      }
      if (toplamx === 4) {
        await Oyuncu.roles.add(ayarlar.Uyarı['4x']).catch(() => {});
        await Oyuncu.roles.remove(ayarlar.Uyarı['1x']).catch(() => {});
        await Oyuncu.roles.remove(ayarlar.Uyarı['2x']).catch(() => {});
        await Oyuncu.roles.remove(ayarlar.Uyarı['3x']).catch(() => {});
      }
      if (toplamx === 5) {
        await Oyuncu.roles.add(ayarlar.Uyarı['5x']).catch(() => {});
        await Oyuncu.roles.remove(ayarlar.Uyarı['1x']).catch(() => {});
        await Oyuncu.roles.remove(ayarlar.Uyarı['2x']).catch(() => {});
        await Oyuncu.roles.remove(ayarlar.Uyarı['3x']).catch(() => {});
        await Oyuncu.roles.remove(ayarlar.Uyarı['4x']).catch(() => {});
      }
      if (toplamx === 6) {
        await Oyuncu.roles.add(ayarlar.Uyarı['6x']).catch(() => {});
        await Oyuncu.roles.remove(ayarlar.Uyarı['1x']).catch(() => {});
        await Oyuncu.roles.remove(ayarlar.Uyarı['2x']).catch(() => {});
        await Oyuncu.roles.remove(ayarlar.Uyarı['3x']).catch(() => {});
        await Oyuncu.roles.remove(ayarlar.Uyarı['4x']).catch(() => {});
        await Oyuncu.roles.remove(ayarlar.Uyarı['5x']).catch(() => {});
      }
      if (toplamx === 7) {
        await Oyuncu.roles.add(ayarlar.Uyarı['7x']).catch(() => {});
        await Oyuncu.roles.remove(ayarlar.Uyarı['1x']).catch(() => {});
        await Oyuncu.roles.remove(ayarlar.Uyarı['2x']).catch(() => {});
        await Oyuncu.roles.remove(ayarlar.Uyarı['3x']).catch(() => {});
        await Oyuncu.roles.remove(ayarlar.Uyarı['4x']).catch(() => {});
        await Oyuncu.roles.remove(ayarlar.Uyarı['5x']).catch(() => {});
        await Oyuncu.roles.remove(ayarlar.Uyarı['6x']).catch(() => {});
      }

      await EtiketDB.updateOne(
        { Sunucu: guild.id, ID: `#${messageUsers.length ? messageUsers : 'Veri Bulunmuyor.'}` },
        {
          $set: {
            Oyuncu: Oyuncu.id,
            Yetkili: interaction.member.id,
            Tarih: moment(Date.now()).format('LLL'),
            Sebep: `ꜱᴇʙᴇᴘ ${Sebep}`,
            SebepX: `Ceza ${Cezası}x » ${toplamx}x`,
            YetkiliAD: interaction.member.user.username,
            OyuncuAD: Oyuncu.user.username,
            Olay: 'UYARI',
            Yazı: `bsanned1327586232506515479 ・ [UYARI] ${interaction.member} tarafından \`${Sebep}\` sebebi ile sunucudan başarılı bir şekilde yasaklanmıştır.`,
          },
        },
        { upsert: true }
      );

      await SicilDB.findOneAndUpdate(
        { Sunucu: guild.id, Oyuncu: Oyuncu.id },
        {
          $push: {
            Sicil: {
              Yetkili: interaction.member.id,
              Tarih: moment(Date.now()).format('LLL'),
              Sebep: `${Sebep} - ${Cezası}x » ${toplamx}x`,
              Olay: ['UYARI'],
              ID: `#${messageUsers.length ? messageUsers : 'Veri Bulunmuyor.'}`,
            },
          },
        },
        { upsert: true }
      );

      await SunucuDB.findOneAndUpdate(
        { Sunucu: guild.id },
        { $inc: { Uyarı: 1 } },
        { upsert: true }
      );

      await YetkiliDB.findOneAndUpdate(
        { Sunucu: guild.id, Yetkili: interaction.member.id },
        { $inc: { Uyarı: 1, GUyarı: 1, HUyarı: 1 } },
        { upsert: true }
      );
    }
  },
};