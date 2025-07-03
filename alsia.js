const { Client, Collection, Events, ActivityType, ChannelType, ButtonStyle, GatewayIntentBits, InteractionType, Partials, AuditLogEvent, Permissions, ActionRowBuilder, ButtonBuilder, MessageAttachment, EmbedBuilder, NewsChannel, AttachmentBuilder, WebSocketShard, PermissionFlagsBits, PermissionsBitField } = require("discord.js");
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent
  ],
  shards: "auto",
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.User,
    Partials.ThreadMember
  ]
});

const alsiaconf = require("./ayarlar.json");
const alsiatoken = require("./config.json");
const { readdirSync } = require("fs");
const moment = require("moment");
moment.locale("tr");
require("moment-duration-format");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { error } = require("console");
const mongoose = require("mongoose");
const ayarlar = require("./ayarlar.json");

mongoose.connect(alsiatoken.mongoDB)
.then(() => console.log(`----------------------
🧩 » MongoDB Aktif Edildi.`));

let token = alsiatoken.token;
global.client = client;

const canvafy = require("canvafy")
const Canvas = require("canvas");

const discordModals = require('discord-modals');
discordModals(client)
const GunlukDB = require("./database/gunluk-veri.js")
const { CronJob } = require("cron");

const BildirimPerm = require("./database/Bildirimler.js")

const messageUser = require("./database/messageUser.js");
const voiceUser = require("./database/voiceUser.js");
const messageGuild = require("./database/messageGuild.js");
const voiceGuild = require("./database/voiceGuild.js");
const YetkiliDB = require("./database/yetkili-veri.js");
const voiceUserChannel = require("./database/voiceUserChannel.js");
const messageUserChannel = require("./database/messageUserChannel.js");

const HaftalıKayıtDB = require("./database/haftalık-veri.js")

const guildChannels = require("./database/messageGuildChannel.js");
const userChannels = require("./database/messageUserChannel.js");
const ms = require("ms")
const cooldown = new Collection()

const ReklamDB = require("./database/reklam.js")
const afk = require("./database/afk.js")

const joinedAt = require("./database/voiceJoinedAt.js");
const guildChannel = require("./database/voiceGuildChannel.js");
const userChannel = require("./database/voiceUserChannel.js");
const voiceInfo = require("./database/voiceInfo.js")

const IDB = require("./database/ID.js")
const EtiketDB = require("./database/etiket-veri.js")
const İsimDB = require("./database/isimler.js")

const snipek = require("./database/snipe-channel.js");
const snipe = require("./database/snipe-user.js");

const roller = require("./database/perm-log.js");

const eventFiles = readdirSync("./alsia/eventler");

Promise.all(eventFiles.map(async (file) => {
  const event = await require(`./alsia/eventler/${file}`);

  if (event.once) {
    client.once(event.name, (...args) => event.başlat(...args));
  } else {
    client.on(event.name, (...args) => event.başlat(...args));
  }
}));

client.commands = new Collection()
client.slashcommands = new Collection()
client.commandaliases = new Collection()  
client.sağtık = new Collection()

const rest = new REST({ version: '10' }).setToken(token);

console.log(`🔗 » Prefix Komutlar Aktif Edildi.
----------------------`) 

console.log(`📢 » Sağ Tık Komutlar Aktif Edildi.
----------------------`) 

const slashcommands = [];
readdirSync('./alsia/komutlar/Slash').forEach(async (file , err) => {

  const command = await require(`./alsia/komutlar/Slash/${file}`);
  slashcommands.push(command.data.toJSON());
  client.slashcommands.set(command.data.name, command);
console.log(`🪬  » [${command.data.name}] İsimli Komut Aktif!`) 
})

readdirSync('./alsia/komutlar/SağTık').forEach(async (file , err) => {
  const command = await require(`./alsia/komutlar/SağTık/${file}`);
  slashcommands.push(command.data.toJSON());
  client.slashcommands.set(command.data.name, command);
})

const commands = []

readdirSync('./alsia/komutlar/Prefix').forEach(async file => {
  const command = await require(`./alsia/komutlar/Prefix/${file}`);
 
  if(command) {
    client.commands.set(command.name, command)
    commands.push(command.name, command);
    if(command.aliases && Array.isArray(command.aliases)) {
       command.aliases.forEach(alias => {
        client.commandaliases.set(alias, command.name)  
       })
    }
  }
})

client.setMaxListeners(100);

client.on(Events.ClientReady, async () => {
  const activities = [` ᴅᴇᴠᴏᴛɪ̇ᴏɴꜱ ❤️ ${alsiaconf.Bot.botDurum}`, `ᴅᴇᴠᴏᴛɪ̇ᴏɴꜱ 💜 ${alsiaconf.Bot.botDurum} ` ,`ᴅᴇᴠᴏᴛɪ̇ᴏɴꜱ 💙 ${alsiaconf.Bot.botDurum}`];
  let nowActivity = 0;

  const alsiaYorgun = () => {
    client.user.setPresence({
      activities: [{ name: `${activities[nowActivity++ % activities.length]}`, type: ActivityType.Playing }],  status: "idle"     });
    
    setTimeout(alsiaYorgun, 60000);
  }

  alsiaYorgun();

  try {
    await rest.put(
        Routes.applicationCommands(client.user.id),
        { body: slashcommands },
    );
  } catch (error) {
    console.error(error);
  }
  console.log(`✅ [${moment(Date.now()).format("LLL")}] » [${client.user.username}] İsimli Bot Aktif Edildi.`);
})

const { YamlDatabase,JsonDatabase } = require('five.db');

const db = client.db = new YamlDatabase();

async function WlCezaCheck() {
  let guild = await client.guilds.fetch(ayarlar.Bot.SunucuID)
  let data = db.all().filter(i => i.ID.startsWith("wlceza-"))

  for (let i in data) {
    let id = data[i].ID.split("-")[1];
    let member = guild.members.cache.get(id);
    let time = db.get("wlceza-" + id + ".Süre")
    let İsim = db.get("wlceza-" + id + ".İsim")

    if(time <= Date.now()) {
      if (!member) return db.delete("wlceza-" + id);

      const canvas = new Canvafy.WelcomeLeave()
      .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
      .setBackground("image", ayarlar.Resimler.moderasyonURL)
      .setTitle("CEZA SONLANDI")
      .setDescription(`X`)
      .setBorder("#0e0707")
      .setCezaID(`Yetkili: ${db.get("wlceza-" + member.id + ".Yetkili")}`)
      .setOyuncu(`Oyuncu: ${member.user.username}`)
      .setYetkili(`#100`)
      .setSebep(`Bitmiş Cezası: ${db.get("wlceza-" + member.id + ".Gün")} Wl`)
      .setAvatarBorder("#ffffff")
      .setOverlayOpacity(0.5)
      .build();
  
      const HexDB = require("./database/oyuncu-hex.js");
      const docs = await HexDB.findOne({Oyuncu: member.id});

      const embedV2 = new EmbedBuilder()
      .setDescription(`<a:utility:1327600287367696515> ・ \`${member.displayName}\` *, wl cezanız sona ermiştir hex adresiniz oyuna eklenmiştir oyuna giriş yapabilirsiniz geçmiş olsun.*

      <a:5961darkbluetea:1327585257578561548> ・ \`ᴏʏᴜɴᴄᴜ:\` ${member}
                      `)
      .setColor('#041f49')
      .setThumbnail(member.user.avatarURL({dynamic:true})) 
      .setImage(`attachment://wlceza-alsia.png`)
      .setAuthor({
        name:`${ayarlar.Embed.authorembed} - ᴄᴇᴢᴀ ꜱɪꜱᴛᴇᴍɪ`, 
        iconURL: member.guild.iconURL({dynamic: true})
      })

      const logembed = await guild.channels.cache.get(ayarlar.KomutLOG.CezaBitiş).send({ files: [{ attachment: welcome, name: "wlceza-alsia.png" }] })

      await logembed.edit({  embeds: [embedV2], files: [{ attachment: welcome, name: "wlceza-alsia.png" }] }).catch(() => {});    
      await member.roles.remove(ayarlar.Permler.WlCeza).catch(() => {});
      await member.guild.members.cache.get(member.id).setNickname(`${İsim}`).catch(() => {});

      db.delete("wlceza-" + member.id)

      if(docs) {
        if (ayarlar.Uyarı.WlEkleme == false) return;
        return guild.channels.cache.get(ayarlar.Uyarı.WlEklemeOda).send({ content:  `!wlekle steam:${docs.Hex} ${member}` }).catch(() => {});
      }
      
      return
    }
  }
}

async function UyarıCheck() {
  const guild = await client.guilds.fetch(ayarlar.Bot.SunucuID)
  const data = db.all().filter(i => i.ID.startsWith("uyarı-"))

  for (let i in data) {
    let id = data[i].ID.split("-")[1];
    const member = guild.members.cache.get(id);
    const time = db.get("uyarı-" + id + ".Süre")
    const Ceza = db.get("uyarı-" + id + ".Ceza")
    const Yetkili = db.get("uyarı-" + id + ".Yetkili")

    if(time <= Date.now()) {
      if (!member) return db.delete("uyarı-" + id)

      if (Ceza == "1") {
        const canvas = new Canvafy.WelcomeLeave()
        .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
        .setBackground("image", ayarlar.Resimler.moderasyonURL)
        .setTitle("CEZA SONLANDI")
        .setDescription(`X`)
        .setBorder("#0e0707")
        .setCezaID(`Yetkili: ${db.get("uyarı-" + member.id + ".Yetkili")}`)
        .setOyuncu(`Oyuncu: ${member.user.username}`)
        .setYetkili(`#100`)
        .setSebep(`Güncel Cezası: ${db.get("uyarı-" + member.id + ".Ceza")}x » Geçmiş Olsun`)
        .setAvatarBorder("#ffffff")
        .setOverlayOpacity(0.5)
        .build();
  
        const logembed = await guild.channels.cache.get(ayarlar.KomutLOG.CezaBitiş).send({ files: [{ attachment: welcome, name: "wlceza-alsia.png" }] })

        const embedV2 = new EmbedBuilder()
        .setDescription(`<a:utility:1327600287367696515> ・ \`${member.displayName}\` *, uyarınız zaman aşımı sebebi ile azaltılmıştır geçmiş olsun.*

<a:5961darkbluetea:1327585257578561548> ・ \`ᴏʏᴜɴᴄᴜ:\` ${member}
                        `)
        .setColor('#041f49')
        .setThumbnail(member.user.avatarURL({dynamic:true})) 
        .setImage(`attachment://wlceza-alsia.png`)
        .setAuthor({
          name:`${ayarlar.Embed.authorembed} - ᴄᴇᴢᴀ ꜱɪꜱᴛᴇᴍɪ`, 
          iconURL: member.guild.iconURL({dynamic: true})
        })

        await logembed.edit({  embeds: [embedV2], files: [{ attachment: welcome, name: "wlceza-alsia.png" }] }).catch(() => {});    
        await member.roles.remove(ayarlar.Uyarı["1x"]).catch(() => {});
        db.delete("uyarı-" + member.id)
        return false;
      }

      if (Ceza == "2") {
        const canvas = new Canvafy.WelcomeLeave()
        .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
        .setBackground("image", ayarlar.Resimler.moderasyonURL)
        .setTitle("CEZA AZALDI")
        .setDescription(`X`)
        .setBorder("#0e0707")
        .setCezaID(`Yetkili: ${db.get("uyarı-" + member.id + ".Yetkili")}`)
        .setOyuncu(`Oyuncu: ${member.user.username}`)
        .setYetkili(`#100`)
        .setSebep(`Güncel Cezası: ${db.get("uyarı-" + member.id + ".Ceza")}x » 1x`)
        .setAvatarBorder("#ffffff")
        .setOverlayOpacity(0.5)
        .build();

        const logembed = await guild.channels.cache.get(ayarlar.KomutLOG.CezaBitiş).send({ files: [{ attachment: welcome, name: "wlceza-alsia.png" }] })

        const embedV2 = new EmbedBuilder()
        .setDescription(`<a:utility:1327600287367696515> ・ \`${member.displayName}\` *, uyarınız zaman aşımı sebebi ile azaltılmıştır geçmiş olsun.*

<a:5961darkbluetea:1327585257578561548> ・ \`ᴏʏᴜɴᴄᴜ:\` ${member}
                        `)
        .setColor('#041f49')
        .setThumbnail(member.user.avatarURL({dynamic:true})) 
        .setImage(`attachment://wlceza-alsia.png`)
        .setAuthor({
          name:`${ayarlar.Embed.authorembed} - ᴄᴇᴢᴀ ꜱɪꜱᴛᴇᴍɪ`, 
          iconURL: member.guild.iconURL({dynamic: true})
        })

        await logembed.edit({  embeds: [embedV2], files: [{ attachment: welcome, name: "wlceza-alsia.png" }] }).catch(() => {});    
        await member.roles.remove(ayarlar.Uyarı["2x"]).catch(() => {});
        await member.roles.add(ayarlar.Uyarı["1x"]).catch(() => {});

        await db.delete("uyarı-" + member.id)
        db.set("uyarı-" + member.id , { Oyuncu: member.user.username , Yetkili: Yetkili , Ceza: `1` , Tarih: moment(Date.now()).format("LLL") , Süre:  Date.now() + ms("7d")  });
        return false;
      }

      if (Ceza == "3") {
        const canvas = new Canvafy.WelcomeLeave()
        .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
        .setBackground("image", ayarlar.Resimler.moderasyonURL)
        .setTitle("CEZA AZALDI")
        .setDescription(`X`)
        .setBorder("#0e0707")
        .setCezaID(`Yetkili: ${db.get("uyarı-" + member.id + ".Yetkili")}`)
        .setOyuncu(`Oyuncu: ${member.user.username}`)
        .setYetkili(`#100`)
        .setSebep(`Güncel Cezası: ${db.get("uyarı-" + member.id + ".Ceza")}x » 2x`)
        .setAvatarBorder("#ffffff")
        .setOverlayOpacity(0.5)
        .build();

        const logembed = await guild.channels.cache.get(ayarlar.KomutLOG.CezaBitiş).send({ files: [{ attachment: welcome, name: "wlceza-alsia.png" }] })

        const embedV2 = new EmbedBuilder()
        .setDescription(`<a:utility:1327600287367696515> ・ \`${member.displayName}\` *, uyarınız zaman aşımı sebebi ile azaltılmıştır geçmiş olsun.*

<a:5961darkbluetea:1327585257578561548> ・ \`ᴏʏᴜɴᴄᴜ:\` ${member}
                        `)
        .setColor('#041f49')
        .setThumbnail(member.user.avatarURL({dynamic:true})) 
        .setImage(`attachment://wlceza-alsia.png`)
        .setAuthor({
          name:`${ayarlar.Embed.authorembed} - ᴄᴇᴢᴀ ꜱɪꜱᴛᴇᴍɪ`, 
          iconURL: member.guild.iconURL({dynamic: true})
        })

        await logembed.edit({  embeds: [embedV2], files: [{ attachment: welcome, name: "wlceza-alsia.png" }] }).catch(() => {});    
        await member.roles.remove(ayarlar.Uyarı["3x"]).catch(() => {});
        await member.roles.add(ayarlar.Uyarı["2x"]).catch(() => {});

        await db.delete("uyarı-" + member.id)
        db.set("uyarı-" + member.id , { Oyuncu: member.user.username , Yetkili: Yetkili , Ceza: `2` , Tarih: moment(Date.now()).format("LLL") , Süre:  Date.now() + ms("7d")  });
        return false;
      }

      if (Ceza == "4") {
        const canvas = new Canvafy.WelcomeLeave()
        .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
        .setBackground("image", ayarlar.Resimler.moderasyonURL)
        .setTitle("CEZA AZALDI")
        .setDescription(`X`)
        .setBorder("#0e0707")
        .setCezaID(`Yetkili: ${db.get("uyarı-" + member.id + ".Yetkili")}`)
        .setOyuncu(`Oyuncu: ${member.user.username}`)
        .setYetkili(`#100`)
        .setSebep(`Güncel Cezası: ${db.get("uyarı-" + member.id + ".Ceza")}x » 3x`)
        .setAvatarBorder("#ffffff")
        .setOverlayOpacity(0.5)
        .build();

        const logembed = await guild.channels.cache.get(ayarlar.KomutLOG.CezaBitiş).send({ files: [{ attachment: welcome, name: "wlceza-alsia.png" }] })

        const embedV2 = new EmbedBuilder()
        .setDescription(`<a:utility:1327600287367696515> ・ \`${member.displayName}\` *, uyarınız zaman aşımı sebebi ile azaltılmıştır geçmiş olsun.*

<a:5961darkbluetea:1327585257578561548> ・ \`ᴏʏᴜɴᴄᴜ:\` ${member}
                        `)
        .setColor('#041f49')
        .setThumbnail(member.user.avatarURL({dynamic:true})) 
        .setImage(`attachment://wlceza-alsia.png`)
        .setAuthor({
          name:`${ayarlar.Embed.authorembed} - ᴄᴇᴢᴀ ꜱɪꜱᴛᴇᴍɪ`, 
          iconURL: member.guild.iconURL({dynamic: true})
        })

        await logembed.edit({  embeds: [embedV2], files: [{ attachment: welcome, name: "wlceza-alsia.png" }] }).catch(() => {});    
        await member.roles.remove(ayarlar.Uyarı["4x"]).catch(() => {});
        await member.roles.add(ayarlar.Uyarı["3x"]).catch(() => {});

        await db.delete("uyarı-" + member.id)
        db.set("uyarı-" + member.id , { Oyuncu: member.user.username , Yetkili: Yetkili , Ceza: `3` , Tarih: moment(Date.now()).format("LLL") , Süre:  Date.now() + ms("7d")  });
        return false;
      }

      if (Ceza == "5") {
        const canvas = new Canvafy.WelcomeLeave()
        .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
        .setBackground("image", ayarlar.Resimler.moderasyonURL)
        .setTitle("CEZA AZALDI")
        .setDescription(`X`)
        .setBorder("#0e0707")
        .setCezaID(`Yetkili: ${db.get("uyarı-" + member.id + ".Yetkili")}`)
        .setOyuncu(`Oyuncu: ${member.user.username}`)
        .setYetkili(`#100`)
        .setSebep(`Güncel Cezası: ${db.get("uyarı-" + member.id + ".Ceza")}x » 4x`)
        .setAvatarBorder("#ffffff")
        .setOverlayOpacity(0.5)
        .build();

        const logembed = await guild.channels.cache.get(ayarlar.KomutLOG.CezaBitiş).send({ files: [{ attachment: welcome, name: "wlceza-alsia.png" }] })

        const embedV2 = new EmbedBuilder()
        .setDescription(`<a:utility:1327600287367696515> ・ \`${member.displayName}\` *, uyarınız zaman aşımı sebebi ile azaltılmıştır geçmiş olsun.*

<a:5961darkbluetea:1327585257578561548> ・ \`ᴏʏᴜɴᴄᴜ:\` ${member}
                        `)
        .setColor('#041f49')
        .setThumbnail(member.user.avatarURL({dynamic:true})) 
        .setImage(`attachment://wlceza-alsia.png`)
        .setAuthor({
          name:`${ayarlar.Embed.authorembed} - ᴄᴇᴢᴀ ꜱɪꜱᴛᴇᴍɪ`, 
          iconURL: member.guild.iconURL({dynamic: true})
        })

        await logembed.edit({  embeds: [embedV2], files: [{ attachment: welcome, name: "wlceza-alsia.png" }] }).catch(() => {});    
        await member.roles.remove(ayarlar.Uyarı["5x"]).catch(() => {});
        await member.roles.add(ayarlar.Uyarı["4x"]).catch(() => {});

        await db.delete("uyarı-" + member.id)
        db.set("uyarı-" + member.id , { Oyuncu: member.user.username , Yetkili: Yetkili , Ceza: `4` , Tarih: moment(Date.now()).format("LLL") , Süre:  Date.now() + ms("7d")  });
        return false;
      }

      if (Ceza == "6") {
        const canvas = new Canvafy.WelcomeLeave()
        .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
        .setBackground("image", ayarlar.Resimler.moderasyonURL)
        .setTitle("CEZA AZALDI")
        .setDescription(`X`)
        .setBorder("#0e0707")
        .setCezaID(`Yetkili: ${db.get("uyarı-" + member.id + ".Yetkili")}`)
        .setOyuncu(`Oyuncu: ${member.user.username}`)
        .setYetkili(`#100`)
        .setSebep(`Güncel Cezası: ${db.get("uyarı-" + member.id + ".Ceza")}x » 5x`)
        .setAvatarBorder("#ffffff")
        .setOverlayOpacity(0.5)
        .build();

        const logembed = await guild.channels.cache.get(ayarlar.KomutLOG.CezaBitiş).send({ files: [{ attachment: welcome, name: "wlceza-alsia.png" }] })

        const embedV2 = new EmbedBuilder()
        .setDescription(`<a:utility:1327600287367696515> ・ \`${member.displayName}\` *, uyarınız zaman aşımı sebebi ile azaltılmıştır geçmiş olsun.*

<a:5961darkbluetea:1327585257578561548> ・ \`ᴏʏᴜɴᴄᴜ:\` ${member}
                        `)
        .setColor('#041f49')
        .setThumbnail(member.user.avatarURL({dynamic:true})) 
        .setImage(`attachment://wlceza-alsia.png`)
        .setAuthor({
          name:`${ayarlar.Embed.authorembed} - ᴄᴇᴢᴀ ꜱɪꜱᴛᴇᴍɪ`, 
          iconURL: member.guild.iconURL({dynamic: true})
        })

        await logembed.edit({  embeds: [embedV2], files: [{ attachment: welcome, name: "wlceza-alsia.png" }] }).catch(() => {});    
        await member.roles.remove(ayarlar.Uyarı["6x"]).catch(() => {});
        await member.roles.add(ayarlar.Uyarı["5x"]).catch(() => {});

        await db.delete("uyarı-" + member.id)
        db.set("uyarı-" + member.id , { Oyuncu: member.user.username , Yetkili: Yetkili , Ceza: `5` , Tarih: moment(Date.now()).format("LLL") , Süre:  Date.now() + ms("7d")  });
        return false;
      }

      if (Ceza == "7") {
        const canvas = new Canvafy.WelcomeLeave()
        .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
        .setBackground("image", ayarlar.Resimler.moderasyonURL)
        .setTitle("CEZA AZALDI")
        .setDescription(`X`)
        .setBorder("#0e0707")
        .setCezaID(`Yetkili: ${db.get("uyarı-" + member.id + ".Yetkili")}`)
        .setOyuncu(`Oyuncu: ${member.user.username}`)
        .setYetkili(`#100`)
        .setSebep(`Güncel Cezası: ${db.get("uyarı-" + member.id + ".Ceza")}x » 6x`)
        .setAvatarBorder("#ffffff")
        .setOverlayOpacity(0.5)
        .build();

        const logembed = await guild.channels.cache.get(ayarlar.KomutLOG.CezaBitiş).send({ files: [{ attachment: welcome, name: "wlceza-alsia.png" }] })

        const embedV2 = new EmbedBuilder()
        .setDescription(`<a:utility:1327600287367696515> ・ \`${member.displayName}\` *, uyarınız zaman aşımı sebebi ile azaltılmıştır geçmiş olsun.*

<a:5961darkbluetea:1327585257578561548> ・ \`ᴏʏᴜɴᴄᴜ:\` ${member}
                        `)
        .setColor('#041f49')
        .setThumbnail(member.user.avatarURL({dynamic:true})) 
        .setImage(`attachment://wlceza-alsia.png`)
        .setAuthor({
          name:`${ayarlar.Embed.authorembed} - ᴄᴇᴢᴀ ꜱɪꜱᴛᴇᴍɪ`, 
          iconURL: member.guild.iconURL({dynamic: true})
        })

        await logembed.edit({  embeds: [embedV2], files: [{ attachment: welcome, name: "wlceza-alsia.png" }] }).catch(() => {});    
        await member.roles.remove(ayarlar.Uyarı["7x"]).catch(() => {});
        await member.roles.add(ayarlar.Uyarı["6x"]).catch(() => {});

        await db.delete("uyarı-" + member.id)
        db.set("uyarı-" + member.id , { Oyuncu: member.user.username , Yetkili: Yetkili , Ceza: `6` , Tarih: moment(Date.now()).format("LLL") , Süre:  Date.now() + ms("7d")  });
        return false;
      }
    }
  }
}

setInterval(async () => {
  await WlCezaCheck();
  await UyarıCheck();
  return false;
}, 60000);

process.on("unhandledRejection", e => { 
  console.log(e)
}) 
process.on("uncaughtException", e => { 
  console.log(e)
})  
process.on("uncaughtExceptionMonitor", e => { 
  console.log(e)
})

process.on("warning", (warn) => { console.log("Warn!"+warn) });
process.on("beforeExit", () => { console.log("Sistem Kapanıyor!")});
client.on("rateLimit", (rate) => { console.log("Client Rate Limit'e Uğradı; "+rate)})
client.on(Events.Warn,(warn) => { console.log(warn) })
client.on(Events.Error, (e) => {
  console.log((`Hata: `+e))
}); 

client.login(token)
