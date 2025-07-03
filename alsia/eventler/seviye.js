const { Collection, Events ,PermissionFlagsBits, EmbedBuilder,  AuditLogEvent} = require("discord.js")
const ayarlar = require("../../ayarlar.json");
const ms = require("ms")
const cooldown = new Collection()


const moment = require("moment")
moment.locale("tr")
require("moment-duration-format");
const canvafy = require("canvafy")


const levels = require("../../database/level.js")

module.exports = {
	name: Events.MessageCreate,
	başlat: async(message) => {





if(message.author.bot) return;


  const xpRandom = (length) => {
    return Number(Math.floor(Number(length) * 5 / 3));
  }



  const { xp, gerekli, level } = await levels.findOne({ guildID: message.guild.id, userID: message.author.id }) || { xp: 0, gerekli: 100, level: 0 };
  await levels.updateOne({ guildID: message.guild.id, userID: message.author.id }, {$inc: { xp: 10 } }, { upsert: true });
  const xpp = xp + xpRandom(message.content.length);
  const levelUp = await new canvafy.LevelUp()
  .setAvatar(message.author.displayAvatarURL({extension:"png",size:2048}))
  .setBackground("image", "https://cdn.discordapp.com/attachments/1195121217808650352/1195474910584250408/image.png?ex=65b41fc5&is=65a1aac5&hm=72af61f63ffb384b1d5c757cf3533044ae1d2564ccac032fd5f41992d85bdaa6&")
  .setUsername(message.author.username)
  .setBorder("#000000")
  .setAvatarBorder("#ff0000")
  .setOverlayOpacity(0.7)
  .setLevels(level,(level+1))
  .build();
  if (xpp >= gerekli) {
    await levels.updateOne({ guildID: message.guild.id, userID: message.author.id }, {$set: { xp: 0 } }, { upsert: true });
    await levels.updateOne({ guildID: message.guild.id, userID: message.author.id }, {$set: { gerekli: gerekli + 200 }}, { upsert: true });
    await levels.updateOne({ guildID: message.guild.id, userID: message.author.id }, {$inc: { level: 1 }}, { upsert: true });
 
    client.guilds.cache.get(message.guild.id).channels.cache.get(ayarlar.LOG.LevelLOG).send({ files: [{attachment: levelUp,name: `levelup-${message.member.id}.png`}]}    );






  }















    }
}