const { Collection, Events , EmbedBuilder,  AuditLogEvent} = require("discord.js")
const ayarlar = require("../../ayarlar.json");
const ms = require("ms")
const cooldown = new Collection()
const canvafy = require("canvafy")
const moment = require("moment")
moment.locale("tr")
require("moment-duration-format");

const GunlukDB = require("../../database/gunluk-veri")
const YetkiliDB = require("../../database/yetkili-veri.js");
const roller = require("../../database/perm-log.js");

module.exports = {
	name: Events.GuildMemberUpdate,
	başlat: async(newMember, oldMember) => {





  if (oldMember.guild.id !== ayarlar.Bot.SunucuID) return






  const fetchedLogs = await newMember.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberRoleUpdate });      


  const role = oldMember.roles.cache.difference(newMember.roles.cache).first();



//////////////////// PERM VERME ////////////////////


  if (oldMember.roles.cache.size > newMember.roles.cache.size) {


      const VPermLOG = newMember.guild.channels.cache.get(ayarlar.LOG.VpermLOG);
      if (!VPermLOG) return;

      const banLog = fetchedLogs.entries.first();
      if (!banLog) return 
      const { executor, target } = banLog;
  
      const Embed = new EmbedBuilder()
      .setColor('#051b50');


      VPermLOG.send({embeds:[Embed
          .setAuthor({name:`${newMember.user.username} - ROL VERILDI`,iconURL:newMember.user.avatarURL({dynamic:true})})
          .setDescription(`<a:unlemsel:1327600285597569066> ・ *Bir kullanıcıya* | \`${role.name}\` | *isimli rol bir yetkili tarafından* *verilmiştir!* \n\n <:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` | ${executor} | \n  <a:5961darkbluetea:1327585257578561548> ・ \`ᴋᴜʟʟᴀɴıᴄı:\` | ${newMember} | \n\n  <a:utility:1327600287367696515> ・ \`ᴠᴇʀɪʟᴇɴ ʀᴏʟ:\` | ${role} |`)
         .setFooter({ text: moment(Date.now()).format("LLL") })
          .setThumbnail(newMember.user.avatarURL({dynamic:true}))]}).catch(() => {});


          await GunlukDB.updateOne(
              { Sunucu: newMember.guild.id
              },
              {
                $inc: {
                  PermAdd: 1       
                }
              },
              { upsert: true }
            );


            if(executor.id == ayarlar.Bot.botID) return false;

await roller.findOneAndUpdate({ guildID: newMember.guild.id, user: newMember.user.id }, { $push: { rolx: { user: newMember.user.id , mod: executor.id, tarih: moment(Date.now()).format("LLL"), rol: role.id, state: "[+]"  } } }, { upsert: true });


await YetkiliDB.updateOne(
{ Sunucu: oldMember.guild.id , Yetkili: executor.id
},
{ 

$set: {

YetkiliAD: executor.username
},


$inc: {
PermVerme: 1,
GPermVerme: 1,
HPermVerme: 1       
}
},
{ upsert: true }
);



  }







//////////////////// PERM ALMA ////////////////////




if (oldMember.roles.cache.size < newMember.roles.cache.size) {

const APermLOG = newMember.guild.channels.cache.get(ayarlar.LOG.ApermLOG);
if (!APermLOG) return;

const banLog = fetchedLogs.entries.first();
if (!banLog) return 
const { executor, target } = banLog;


const Embed = new EmbedBuilder()
.setColor('#051b50');






APermLOG.send({embeds:[Embed
.setAuthor({name:`${newMember.user.username} - ROL ALINDI`,iconURL:newMember.user.avatarURL({dynamic:true})})
.setDescription(`<a:unlemsel:1327600285597569066> ・ *Bir kullanıcının* | \`${role.name}\` | *isimli rolü bir yetkili tarafından* *alınmıştır!* \n\n <:king_crown:1327600238407450697> ・ \`ʏᴇᴛᴋɪʟɪ:\` | ${executor} | \n  <a:5961darkbluetea:1327585257578561548> ・ \`ᴋᴜʟʟᴀɴıᴄı:\` | ${newMember} | \n\n  <a:utility:1327600287367696515> ・ \`ᴀʟıɴᴀɴ ʀᴏʟ:\` | ${role} |`)
.setFooter({ text: moment(Date.now()).format("LLL") })
.setThumbnail(newMember.user.avatarURL({dynamic:true}))]}).catch(() => {});


await GunlukDB.updateOne(
  { Sunucu: oldMember.guild.id
  },
  {
    $inc: {
      PermRemove: 1       
    }
  },
  { upsert: true }
);



// if(role.id == ayarlar.Permler.Yetkili) {


//   YetkiliDB.deleteOne({ Yetkili: newMember.user.id })
//   HaftalıKayıtDB.deleteOne({ Yetkili: newMember.user.id })
  
// }

if(executor.id == ayarlar.Bot.botID) return false;

await roller.findOneAndUpdate({ guildID: newMember.guild.id, user: newMember.user.id }, { $push: { rolx: { user: newMember.user.id , mod: executor.id, tarih: moment(Date.now()).format("LLL"), rol: role.id, state: "[-]"  } } }, { upsert: true });


await YetkiliDB.updateOne(
{ Sunucu: oldMember.guild.id , Yetkili: executor.id
},
{ 

$set: {

YetkiliAD: executor.username
},


  $inc: {
    PermAlma: 1,
    GPermAlma: 1,
    HPermAlma: 1       
  }
},
{ upsert: true }
);








}

      
      





    }
}