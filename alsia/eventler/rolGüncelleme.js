const { Collection, Events , EmbedBuilder,  AuditLogEvent} = require("discord.js")
const ayarlar = require("../../ayarlar.json");
const ms = require("ms")
const cooldown = new Collection()
const canvafy = require("canvafy")
const moment = require("moment")
moment.locale("tr")
require("moment-duration-format");



module.exports = {
	name: Events.GuildRoleUpdate,
	başlat: async(oldRole, newRole) => {





        if (oldRole.guild.id !== ayarlar.Bot.SunucuID) return

           
  
        const fetchedLogs = await oldRole.guild.fetchAuditLogs({
          limit: 1,
          type: AuditLogEvent.RoleUpdate,
        });
      
        const rolLOG = oldRole.guild.channels.cache.get(ayarlar.LOG.GrolLOG);
        if (!rolLOG) return;
      
        const rollog = fetchedLogs.entries.first();
        if (!rollog) return;
      
      
      
        const { executor, target } = rollog;
      
      
        if (oldRole.permissions.bitfield !== newRole.permissions.bitfield) {
            const oldPermissions = newRole.permissions
              .toArray()
              .filter((x) => !oldRole.permissions.toArray().includes(x));
        
            const newPermissions = oldRole.permissions
              .toArray()
              .filter((x) => !newRole.permissions.toArray().includes(x));
      
      
      
      
      
      
      
      
      
      const alsiaTurkishBoy = {
      
      CreateInstantInvite: "Özel Davet Oluşturma",
      KickMembers: "Sunucudan Atma",
      BanMembers: "Sunucudan Yasaklama",
      Administrator: "Yönetici",
      ManageChannels: "Kanal Yönetme",
      ManageGuild: "Sunucu Yönetme",
      AddReactions: "Emoji Ekleme",
      ViewAuditLog: "Denetim Kaydı Görüntüleme",
      PrioritySpeaker: "Öncelikli Konuşmacı",
      Stream: "Yayın Açma",
      ViewChannel: "Kanal Görüntüleme",
      SendMessages: "Mesaj Gönderme",
      SendTTSMessages: "Alt Başlık Gönderme",
      ManageMessages: "Mesajları Yönetme",
      EmbedLinks: "Link Gönderme",
      AttachFiles: "Dosya Gönderme",
      ReadMessageHistory: "Mesaj Geçmişi Okuma",
      MentionEveryone: "Everyone Atabilme",
      UseExternalEmojis: "Sunucu Dışı Emoji Kullanma",
      ViewGuildInsights: "Sunucu Verilerini Görüntüle",
      Connect: "Sese Bağlanabilme",
      Speak: "Seste Konuşabilme",
      MuteMembers: "Kullanıcı Susturabilme",
      DeafenMembers: "Kullanıcı Sağırlaştırma",
      MoveMembers: "Kullanıcı Yer Değiştirme",
      UseSoundboard: "Soundboard Kullanabilme",
      UseExternalSounds: "Sunucu Dışı Soundboard",
      UseVAD: "Vad Kullanma",
      ManageRoles: "Rolleri Yönetme",
      ManageNicknames: "İsimleri Yönetme",
      ManageWebhooks: "Webhook Yönetme",
      ChangeNickname: "İsmini Değiştirebilme",
      ManageEmojisAndStickers: "Emoji Ve Sticker Yönetme",
      ManageGuildExpressions: "Sunucu İfadelerini Yönetme",
      UseApplicationCommands: "/ Komutlarını Kullanma",
      RequestToSpeak: "Bas Konuş Olmadan Konuşma",
      ManageEvents: "Etkinlik Yönetme",
      ManageThreads: "Alt Başlık Yönetme",
      CreatePublicThreads: "Alt Başlık Oluşturma",
      CreatePrivateThreads: "Özel Alt Başlık Oluşturma",
      UseExternalStickers: "Sunucu Dışı Sticker Kullanma",
      SendMessagesInThreads: "Alt Başlıklara Mesaj Gönderme",
      UseEmbeddedActivities: "Embed Aktivitesini Yönetme",
      ModerateMembers: "Kullanıcıyı Yönetme",
      SendVoiceMessages: "Sesli Mesaj Gönderme",
      
      
      
      }
      
      
      
      
      
      
      
      
      
      
      
      
              let embed = new EmbedBuilder()
              .setAuthor({
               name: `${executor.tag} - ROL GUNCELLENDI`,
                iconURL: executor.avatarURL({ dynamic: true })
      })
      .setThumbnail(executor.avatarURL({dynamic:true})) 
              .setDescription(`<a:unlemsel:1327600285597569066> ・ *Bir yetkili tarafından* | \`${oldRole.name} | ${oldRole.id}\` | *isimli rolün izinlerini güncelledi.* 
              
              <:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` ${executor}
              <a:5961darkbluetea:1327585257578561548> ・ \`ɢᴜɴᴄᴇʟʟᴇɴᴇɴ ʀᴏʟ:\` ${oldRole}
      
               ***Eklenen İzinler;*** \n\`\`\`diff\n${
               oldPermissions.map((perm) => `+ ${alsiaTurkishBoy[perm]}`).join("\n") ||
               `Hiç bir izin eklenmemiş!`
             }\n\`\`\` \n\n ***Çıkartılan İzinler:*** \n   \`\`\`diff\n${
               newPermissions.map((perm) => `- ${alsiaTurkishBoy[perm]}`).join("\n") ||
               `Hiç bir izin çıkartılmamış!`
             }\n\`\`\``)
             .setColor("#12073d")
             .setFooter({ text: moment(Date.now()).format("LLL") })
              oldRole.guild.channels.cache.get(ayarlar.LOG.GrolLOG).send({ embeds: [embed] }).catch(() => {});
      
      
      
      
      
      
          }
      
      
      
      
      
      
      
      
      
      
          if (oldRole.name !== newRole.name) {
      
      
            let embedS = new EmbedBuilder()
            .setAuthor({
              name: `${executor.tag} - ROL GUNCELLENDI`,
              iconURL: executor.avatarURL({ dynamic: true })
      })
      .setThumbnail(executor.avatarURL({dynamic:true})) 
            .setDescription(`<a:unlemsel:1327600285597569066> ・ *Bir yetkili tarafından* | \`${oldRole.name} | ${oldRole.id}\` | *isimli rolün ismi güncelledi.* 
           
            <:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` ${executor}
            <a:5961darkbluetea:1327585257578561548> ・ \`ɢᴜɴᴄᴇʟʟᴇɴᴇɴ ʀᴏʟ:\` ${oldRole}
            
            ***Eski İsim:*** \n\`\`\`diff\n- ${oldRole.name}\n\`\`\` \n\n ***Yeni İsim:*** \n   \`\`\`fix\n+ ${newRole.name}\n\`\`\``)
            .setColor("#12073d")
            .setFooter({ text: moment(Date.now()).format("LLL") })
            oldRole.guild.channels.cache.get(ayarlar.LOG.GrolLOG).send({ embeds: [embedS] }).catch(() => {});
      
      }
      
      
      
      
           if (oldRole.hexColor !== newRole.hexColor) {
      
            let embed = new EmbedBuilder()
            .setAuthor({
              name: `${executor.tag} - ROL GUNCELLENDI`,
              iconURL: executor.avatarURL({ dynamic: true })
      })
      .setThumbnail(executor.avatarURL({dynamic:true})) 
            .setDescription(`<a:unlemsel:1327600285597569066> ・ *Bir yetkili tarafından* | \`${oldRole.name} | ${oldRole.id}\` | *isimli rolün rengi güncelledi.* 
           
            <:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` ${executor}
            <a:5961darkbluetea:1327585257578561548> ・ \`ɢᴜɴᴄᴇʟʟᴇɴᴇɴ ʀᴏʟ:\` ${oldRole}
            
            ***Eski Rengi:*** \n\`\`\`diff\n- ${oldRole.hexColor}\n\`\`\` \n\n ***Yeni Rengi:*** \n   \`\`\`fix\n+ ${newRole.hexColor}\n\`\`\`   `)
            .setColor("#12073d")
            .setFooter({ text: moment(Date.now()).format("LLL") })
            oldRole.guild.channels.cache.get(ayarlar.LOG.GrolLOG).send({ embeds: [embed] }).catch(() => {});
      
            
      }
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      if (oldRole.hoist !== newRole.hoist) {
              
      let embed = new EmbedBuilder()
      .setAuthor({
      name: `${executor.tag} - ROL GUNCELLENDI`,
      iconURL: executor.avatarURL({ dynamic: true })
      })
      .setThumbnail(executor.avatarURL({dynamic:true})) 
      .setDescription(`<a:unlemsel:1327600285597569066> ・ *Bir yetkili tarafından* | \`${oldRole.name} | ${oldRole.id}\` | *isimli rolün üyelerden ayrı/birleşik olduğunu güncelledi.* 
      
      <:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` ${executor}
      <a:5961darkbluetea:1327585257578561548> ・ \`ɢᴜɴᴄᴇʟʟᴇɴᴇɴ ʀᴏʟ:\` ${oldRole} 
      
      ***Eski:*** \n\`\`\`diff\n- ${(oldRole.hoist === false && `Kapalı`) || `Açık`}\n\`\`\` \n\n ***Yeni:*** \n   \`\`\`fix\n+ ${
      (newRole.hoist === false && `Kapalı`) || `Açık`
      }\n\`\`\``)
      .setColor("#12073d")
      .setFooter({ text: moment(Date.now()).format("LLL") })
      oldRole.guild.channels.cache.get(ayarlar.LOG.GrolLOG).send({ embeds: [embed] }).catch(() => {});
      
      
      }
      
      
      
      
      
      
      if (oldRole.mentionable !== newRole.mentionable) {
              
              
      let embed = new EmbedBuilder()
      .setAuthor({
      name: `${executor.tag} - ROL GUNCELLENDI`,
      iconURL: executor.avatarURL({ dynamic: true })
      })
      .setThumbnail(executor.avatarURL({dynamic:true})) 
      .setDescription(`<a:unlemsel:1327600285597569066> ・ *Bir yetkili tarafından* | \`${oldRole.name} | ${oldRole.id}\` | *isimli rolün bahsedilirliği güncelledi.* 
      
      <:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` ${executor}
      <a:5961darkbluetea:1327585257578561548> ・ \`ɢᴜɴᴄᴇʟʟᴇɴᴇɴ ʀᴏʟ:\` ${oldRole}
      
      ***Eski:*** \n\`\`\`diff\n- ${(oldRole.mentionable === false && `Kapalı`) || `Açık`}\n\`\`\` \n\n ***Yeni:*** \n   \`\`\`fix\n+ ${
      (newRole.mentionable === false && `Kapalı`) || `Açık`
      }\n\`\`\``)
      .setColor("#12073d")
      .setFooter({ text: moment(Date.now()).format("LLL") })
      oldRole.guild.channels.cache.get(ayarlar.LOG.GrolLOG).send({ embeds: [embed] }).catch(() => {});
      
      }
      
      
      
      
      
      
      
      
      if (oldRole.rawPosition  !== newRole.rawPosition ) {
              
              
      let embed = new EmbedBuilder()
      .setAuthor({
      name: `${executor.tag} - ROL GUNCELLENDI`,
      iconURL: executor.avatarURL({ dynamic: true })
      })
      .setThumbnail(executor.avatarURL({dynamic:true})) 
      .setDescription(`<a:unlemsel:1327600285597569066> ・ *Bir yetkili tarafından* | \`${oldRole.name} | ${oldRole.id}\` | *isimli rolün sıralaması güncelledi.* 
      
      <:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` ${executor}
      <a:5961darkbluetea:1327585257578561548> ・ \`ɢᴜɴᴄᴇʟʟᴇɴᴇɴ ʀᴏʟ:\` ${oldRole}
      
      ***Eski Sıralaması:*** \n\`\`\`diff\n- ${oldRole.rawPosition}\n\`\`\` \n\n ***Yeni Sıralaması:*** \n   \`\`\`fix\n+ ${newRole.rawPosition}\n\`\`\``)
      .setColor("#12073d")
      .setFooter({ text: moment(Date.now()).format("LLL") })
      oldRole.guild.channels.cache.get(ayarlar.LOG.GrolLOG).send({ embeds: [embed] }).catch(() => {});
      
      
      }
      
      
      
      







    }
}