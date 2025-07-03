const { EmbedBuilder, PermissionsBitField } = require("discord.js");

const HexDB = require("../../../database/blacklisthex.js")
const ayarlar = require("../../../ayarlar.json")

const moment = require("moment")
moment.locale("tr")

module.exports = {
    name: "hexler",
    aliases: ["hexler"],
    cooldown: 2000,
    alsia: async (client, message, args) => {

 
    const guild = message.guild
 
 
 
      const Veri = await HexDB.findOne({ Sunucu: guild.id });
      if (!Veri)  return message.reply({ content: "Veri Yok!" })
      let hexler = Veri.Hexler.sort((a, b) => b.Tarih - a.Tarih)
      const liste = hexler.map((x , index) => `${x.Hex}`)

console.log(liste)
  
 
 
 
 
 
 
 
 
 
 
 
 
 
 
    }
 };

