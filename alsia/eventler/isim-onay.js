const { Events, EmbedBuilder } = require("discord.js");
const isimOnayDB = require("../../database/isim-onay.js");
const ayarlar = require("../../ayarlar.json");

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async başlat(message) {
        if (message.author.bot) return;

        try {
            const isimOnayData = await isimOnayDB.findOne({ 
                guildID: message.guild.id,
                aktif: true 
            });

            if (!isimOnayData || message.channel.id !== isimOnayData.kanalID) return;

            const karakterOnayRolID = ayarlar.Permler.KarakterOnay;
            const member = message.member;

            if (karakterOnayRolID && member.roles.cache.has(karakterOnayRolID)) {
                const Warn = new EmbedBuilder()
                    .setAuthor({ name: member.user.username, iconURL: member.user.avatarURL({ dynamic: true }) })
                    .setColor("#490404")
                    .setTimestamp();

                await message.reply({
                    embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Mevcut İsminiz Bulunmakta Değiştirmek İçin Ticket Açınız.*")],
                    flags: 64
                });
                return;
            }

            await message.react('<a:onay:1327600261698420767>');
            await message.react('<a:red:1327600270032764928>');

        } catch (error) {
            console.error("İsim onay mesaj event hatası:", error);
        }
    }
}; 