const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const isimOnayDB = require("../../../database/isim-onay.js");
const ayarlar = require("../../../ayarlar.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ic-isim-ayarlar")
        .setDescription("İsim onay sistemi ayarlarını yönetir")
        .addStringOption(option =>
            option.setName("sistem")
                .setDescription("Sistem durumunu seçin")
                .setRequired(true)
                .addChoices(
                    { name: "Açık", value: "acik" },
                    { name: "Kapalı", value: "kapali" }
                ))
        .addChannelOption(option =>
            option.setName("kanal")
                .setDescription("İsim onay kanalını seçin (sadece açık seçildiğinde gerekli)")
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async alsia(client, interaction) {
        const { options, guild, member } = interaction;

        if (!member.permissions.has(PermissionFlagsBits.Administrator)) {
            return interaction.reply({
                content: "❌ Bu komutu kullanmak için Yönetici yetkisine sahip olmalısınız!",
                flags: 64
            });
        }

        const sistem = options.getString("sistem");
        const kanal = options.getChannel("kanal");

        if (sistem === "acik") {
            if (!kanal) {
                return interaction.reply({
                    content: "❌ Sistem açık seçildiğinde kanal seçimi zorunludur!",
                    flags: 64
                });
            }

            if (kanal.type !== 0) {
                return interaction.reply({
                    content: "❌ Lütfen bir metin kanalı seçin!",
                    flags: 64
                });
            }

            try {
                await isimOnayDB.findOneAndUpdate(
                    { guildID: guild.id },
                    { 
                        guildID: guild.id,
                        kanalID: kanal.id,
                        aktif: true
                    },
                    { upsert: true, new: true }
                );

                return interaction.reply({
                    content: `<a:onay:1327600261698420767>・ ***Uyarı*** IC İsim Sistemi Başarılı Bir Şekilde Aktif Edildi.`,
                    flags: 64
                });

            } catch (error) {
                console.error("İsim kanal ayarlama hatası:", error);
                return interaction.reply({
                    content: "❌ Bir hata oluştu!",
                    flags: 64
                });
            }
        }

        if (sistem === "kapali") {
            try {
                await isimOnayDB.findOneAndUpdate(
                    { guildID: guild.id },
                    { aktif: false }
                );

                return interaction.reply({
                    content: `<a:red:1327600270032764928>・ ***Uyarı*** IC İsim Sistemi Başarılı Bir Şekilde Deaktif Edildi.`,
                    flags: 64
                });

            } catch (error) {
                console.error("İsim kanal kapatma hatası:", error);
                return interaction.reply({
                    content: "❌ Bir hata oluştu!",
                    flags: 64
                });
            }
        }
    }
}; 