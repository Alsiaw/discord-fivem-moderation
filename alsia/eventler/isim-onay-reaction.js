const { Events, EmbedBuilder } = require("discord.js");
const isimOnayDB = require("../../database/isim-onay.js");
const ayarlar = require("../../ayarlar.json");

module.exports = {
    name: Events.MessageReactionAdd,
    once: false,
    async başlat(reaction, user) {
        if (user.bot) return;

        try {
            if (reaction.partial) {
                await reaction.fetch();
            }

            const message = reaction.message;
            const guild = message.guild;
            const member = await guild.members.fetch(user.id);
            const targetMember = await guild.members.fetch(message.author.id);

            const isimOnayData = await isimOnayDB.findOne({ 
                guildID: guild.id,
                aktif: true 
            });

            if (!isimOnayData || message.channel.id !== isimOnayData.kanalID) return;

            const onayEmoji = '<a:onay:1327600261698420767>';
            const redEmoji = '<a:red:1327600270032764928>';

            if (reaction.emoji.toString() !== onayEmoji && reaction.emoji.toString() !== redEmoji) return;

            const staffRolleri = ayarlar.Yetkiler.Staff;
            const yetkiliMi = member.roles.cache.some(role => staffRolleri.includes(role.id));

            if (!yetkiliMi) {
                await reaction.users.remove(user.id);
                return;
            }

            const karakterOnayRolID = ayarlar.Permler.KarakterOnay;

            const onayReaction = message.reactions.cache.get(onayEmoji);
            const redReaction = message.reactions.cache.get(redEmoji);

            if (onayReaction && redReaction) {
                const onayUsers = await onayReaction.users.fetch();
                const redUsers = await redReaction.users.fetch();

                const yetkiliOnayUsers = onayUsers.filter(user => {
                    const userMember = guild.members.cache.get(user.id);
                    return userMember && userMember.roles.cache.some(role => staffRolleri.includes(role.id));
                });

                const yetkiliRedUsers = redUsers.filter(user => {
                    const userMember = guild.members.cache.get(user.id);
                    return userMember && userMember.roles.cache.some(role => staffRolleri.includes(role.id));
                });

                if (yetkiliOnayUsers.size > 0 || yetkiliRedUsers.size > 0) {
                    if (reaction.emoji.toString() === onayEmoji && yetkiliRedUsers.size > 0) {
                        await redReaction.users.remove(user.id);
                    } else if (reaction.emoji.toString() === redEmoji && yetkiliOnayUsers.size > 0) {
                        await onayReaction.users.remove(user.id);
                    }
                }
            }

            if (reaction.emoji.toString() === onayEmoji) {
                const onayReactionCheck = message.reactions.cache.get(onayEmoji);
                const redReactionCheck = message.reactions.cache.get(redEmoji);

                if (onayReactionCheck && redReactionCheck) {
                    const onayUsersCheck = await onayReactionCheck.users.fetch();
                    const redUsersCheck = await redReactionCheck.users.fetch();

                    const yetkiliOnayUsersCheck = onayUsersCheck.filter(user => {
                        const userMember = guild.members.cache.get(user.id);
                        return userMember && userMember.roles.cache.some(role => staffRolleri.includes(role.id));
                    });

                    const yetkiliRedUsersCheck = redUsersCheck.filter(user => {
                        const userMember = guild.members.cache.get(user.id);
                        return userMember && userMember.roles.cache.some(role => staffRolleri.includes(role.id));
                    });

                    if (yetkiliOnayUsersCheck.size > 0 || yetkiliRedUsersCheck.size > 0) {
                        await reaction.users.remove(user.id);
                        return;
                    }
                }

                const messages = await message.channel.messages.fetch({ limit: 10 });
                const hasEmbed = messages.some(msg => 
                    msg.author.id === reaction.client.user.id && 
                    msg.reference?.messageId === message.id &&
                    msg.embeds.length > 0
                );

                if (hasEmbed) {
                    await reaction.users.remove(user.id);
                    return;
                }

                try {
                    await targetMember.setNickname(message.content);

                    if (karakterOnayRolID && !targetMember.roles.cache.has(karakterOnayRolID)) {
                        await targetMember.roles.add(karakterOnayRolID);
                    }

                    const onayEmbed = new EmbedBuilder()
                        .setAuthor({ name: member.user.username, iconURL: member.user.avatarURL({ dynamic: true }) })
                        .setColor("#490404")
                        .setDescription(`<a:onay:1327600261698420767>・***Onay:*** *İsminiz* ${member} *tarafından* \`${message.content}\` *olarak güncellenmiştir!*`)
                        .setTimestamp();

                    await message.reply({ embeds: [onayEmbed] });

                    await message.reactions.removeAll();
                    await message.react('<a:onay:1327600261698420767>');

                } catch (error) {
                    console.error("İsim onay hatası:", error);
                    const hataEmbed = new EmbedBuilder()
                        .setColor("#490404")
                        .setDescription("<a:red:1327600270032764928>・ ***Uyarı:***  İsim Değiştirilemedi.")
                        .setTimestamp();
                    await message.reply({ embeds: [hataEmbed] });
                }

            } else if (reaction.emoji.toString() === redEmoji) {
                const onayReactionCheck2 = message.reactions.cache.get(onayEmoji);
                const redReactionCheck2 = message.reactions.cache.get(redEmoji);

                if (onayReactionCheck2 && redReactionCheck2) {
                    const onayUsersCheck2 = await onayReactionCheck2.users.fetch();
                    const redUsersCheck2 = await redReactionCheck2.users.fetch();

                    const yetkiliOnayUsersCheck2 = onayUsersCheck2.filter(user => {
                        const userMember = guild.members.cache.get(user.id);
                        return userMember && userMember.roles.cache.some(role => staffRolleri.includes(role.id));
                    });

                    const yetkiliRedUsersCheck2 = redUsersCheck2.filter(user => {
                        const userMember = guild.members.cache.get(user.id);
                        return userMember && userMember.roles.cache.some(role => staffRolleri.includes(role.id));
                    });

                    if (yetkiliOnayUsersCheck2.size > 0 || yetkiliRedUsersCheck2.size > 0) {
                        await reaction.users.remove(user.id);
                        return;
                    }
                }

                const messages = await message.channel.messages.fetch({ limit: 10 });
                const hasEmbed = messages.some(msg => 
                    msg.author.id === reaction.client.user.id && 
                    msg.reference?.messageId === message.id &&
                    msg.embeds.length > 0
                );

                if (hasEmbed) {
                    await reaction.users.remove(user.id);
                    return;
                }

                const karakterOnayRolVarMi = targetMember.roles.cache.has(karakterOnayRolID);

                if (!karakterOnayRolVarMi) {
                    const redEmbed = new EmbedBuilder()
                        .setAuthor({ name: member.user.username, iconURL: member.user.avatarURL({ dynamic: true }) })
                        .setColor("#490404")
                        .setDescription(`<a:red:1327600270032764928>・ ***Uyarı:*** *İsminiz* ${member} *tarafından reddedilmiştir.*`)
                        .setTimestamp();

                    await message.reply({ embeds: [redEmbed] });

                    await message.reactions.removeAll();
                    await message.react('<a:red:1327600270032764928>');
                }
            }

        } catch (error) {
            console.error("İsim onay reaction event hatası:", error);
        }
    }
}; 