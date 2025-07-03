const { Collection, Events ,PermissionFlagsBits, EmbedBuilder,  AuditLogEvent} = require("discord.js")
const ayarlar = require("../../ayarlar.json");
const ms = require("ms")
const cooldown = new Collection()


const moment = require("moment")
moment.locale("tr")
require("moment-duration-format");


const GunlukDB = require("../../database/gunluk-veri")
const messageUser = require("../../database/messageUser.js");
const messageGuild = require("../../database/messageGuild.js");
const guildChannels = require("../../database/messageGuildChannel.js");
const userChannels = require("../../database/messageUserChannel.js");




module.exports = {
	name: Events.MessageCreate,
	başlat: async(message) => {





  let client = message.client;
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;
  let prefix = ayarlar.Bot.prefix
  if(!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g); 
  const cmd = args.shift().toLowerCase();
  if(cmd.length == 0 ) return;
  let command = client.commands.get(cmd)
  if(!command) command = client.commands.get(client.commandaliases.get(cmd));

  if(command) {
    if(command.cooldown) {
      if(cooldown.has(`${command.name}${message.author.id}`)) return message.reply({ content: `Cooldown şuan aktif lütfen \`${ms(cooldown.get(`${command.name}${message.author.id}`) - Date.now(), {long : true}).replace("minutes", `dakika`).replace("seconds", `saniye`).replace("second", `saniye`).replace("ms", `milisaniye`)}\` sonra tekrar deneyin.`}).then(msg => setTimeout(() => msg.delete(), cooldown.get(`${command.name}${message.author.id}`) - Date.now()))
      command.alsia(client, message, args)
      cooldown.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
      setTimeout(() => {
        cooldown.delete(`${command.name}${message.author.id}`)
      }, command.cooldown);
  } else {
    command.alsia(client, message, args)
  }
  }


  if (message.author.bot) return;



  await messageUser.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { topStat: 1, dailyStat: 1, weeklyStat: 1, twoWeeklyStat: 1 } }, { upsert: true }).catch(() => {});
  await messageGuild.findOneAndUpdate({ guildID: message.guild.id }, { $inc: { topStat: 1, dailyStat: 1, weeklyStat: 1, twoWeeklyStat: 1 } }, { upsert: true }).catch(() => {});
 await guildChannels.findOneAndUpdate({ guildID: message.guild.id, channelID: (message.channel.id) }, { $inc: { channelData: 1 } }, { upsert: true }).catch(() => {});
  await userChannels.findOneAndUpdate({ guildID: message.guild.id,  userID: message.author.id, channelID: (message.channel.id)  }, { $inc: { channelData: 1 , HchannelData: 1 , GchannelData: 1 } }, { upsert: true }).catch(() => {});



  await GunlukDB.updateOne(
      { Sunucu: message.guild.id
      },
      {
        $inc: {
          Mesaj: 1       
        }
      },
      { upsert: true }
    );
















    }
}