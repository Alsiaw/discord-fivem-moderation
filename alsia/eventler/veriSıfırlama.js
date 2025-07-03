const { Collection, Events , EmbedBuilder,  ActivityType, AuditLogEvent} = require("discord.js")
const ayarlar = require("../../ayarlar.json");
const ms = require("ms")
const cooldown = new Collection()
// global.client = client;


const moment = require("moment")
moment.locale("tr")
require("moment-duration-format");


const {  RecurrenceRule, scheduleJob } = require("node-schedule");

const GunlukDB = require("../../database/gunluk-veri")
const messageUser = require("../../database/messageUser.js");
const voiceUser = require("../../database/voiceUser.js");
const messageGuild = require("../../database/messageGuild.js");
const voiceGuild = require("../../database/voiceGuild.js");
const YetkiliDB = require("../../database/yetkili-veri.js");
const voiceUserChannel = require("../../database/voiceUserChannel.js");
const messageUserChannel = require("../../database/messageUserChannel.js");

const HaftalıKayıtDB = require("../../database/haftalık-veri")



module.exports = {
	name: Events.ClientReady,
	başlat: async() => {





const rule = new RecurrenceRule();
rule.hour = 00;
rule.minute = 00;
rule.tz = 'Europe/Istanbul';

const job = scheduleJob(rule, async() => {




// const dailyXW = new CronJob("0 0 * * *", async () => {




  const guild = client.guilds.cache.get(ayarlar.Bot.SunucuID); 





  const members = await guild.members.fetch() 


  const removeFromFilter = members.filter(m => m.roles.cache.has(ayarlar.Permler.Whitelist));
  const removeFromCount = removeFromFilter.size;


  const Staff = members.filter(m => m.roles.cache.has(ayarlar.Permler.Yetkili));
  const StaffSize = Staff.size;




  const messageUsersData = await GunlukDB.find({ Sunucu: ayarlar.Bot.SunucuID });

  const messageUsers = messageUsersData
  .splice(0, 100)
  .map((x, index) => `<:bsanned:1327586232506515479> ・ \`ɢᴜɴʟᴜᴋ ʏᴀꜱᴀᴋʟᴀᴍᴀ => ${x.Ban}\`
<:bsanned:1327586232506515479> ・ \`ɢᴜɴʟᴜᴋ ʏᴀꜱᴀᴋ ᴋᴀʟᴅıʀᴍᴀ => ${x.Unban}\`
<a:grsaqw:1327600230484672513> ・ \`ɢᴜɴʟᴜᴋ ɢıʀıꜱ => ${x.Giriş}\`     
<a:cikisaw:1327586344154955777> ・ \`ɢᴜɴʟᴜᴋ ᴄıᴋıꜱ => ${x.Çıkış}\`   
<a:mesaj:1327600246619901962> ・ \`ɢᴜɴʟᴜᴋ ᴍᴇꜱᴀᴊ => ${x.Mesaj}\` 
<a:onay:1327600261698420767> ・ \`ɢᴜɴʟᴜᴋ ᴘᴇʀᴍ ᴠᴇʀᴍᴇ => ${x.PermAdd}\`      
<a:red:1327600270032764928> ・ \`ɢᴜɴʟᴜᴋ ᴘᴇʀᴍ ᴀʟᴍᴀ => ${x.PermRemove}\`  
<a:5961darkbluetea:1327585257578561548> ・ \`ɢᴜɴʟᴜᴋ ᴡʟ ᴏɴᴀʏ => ${x.Whitelist}\` 
<a:alertcute:1327585812300304436> ・ \`ɢᴜɴʟᴜᴋ ᴡʟ ʀᴇᴅ => ${x.Red}\` 
<:5013bughunterpurple:1327585254751469629>  ・ \`ɢᴜɴʟᴜᴋ ꜱᴇꜱ => ${moment.duration(x.Ses).format("H [saat], m [dakika]")}\` 
<:3955imao:1327585189404348436> ・ \`ɢᴜɴʟᴜᴋ ᴜʏᴀʀı => ${x.Uyarı}\`
<a:tehlikesel:1327600281029967953>  ・ \`ɢᴜɴʟᴜᴋ ᴡʟ ᴄᴇᴢᴀ => ${x.WlCeza}\` 
<a:utility:1327600287367696515> ・ \`ɢᴜɴʟᴜᴋ ɪꜱɪᴍ ɢᴜɴᴄᴇʟʟᴇɴᴍᴇ => ${x.İsim}\` 
  `)
  .join("\n\n");







  const MesajDB = await GunlukDB.find({ Sunucu: ayarlar.Bot.SunucuID }).sort({ Mesaj: -1 });
const WlOnayDB = await GunlukDB.find({ Sunucu: ayarlar.Bot.SunucuID }).sort({ Whitelist: -1 });
  const WlRedDB = await GunlukDB.find({ Sunucu: ayarlar.Bot.SunucuID }).sort({ Red: -1 });
  const SesDB = await GunlukDB.find({ Sunucu: ayarlar.Bot.SunucuID }).sort({ Ses: -1 });
  const WelcomeDB = await GunlukDB.find({ Sunucu: ayarlar.Bot.SunucuID }).sort({ Giriş: -1 });
  const ByByDB = await GunlukDB.find({ Sunucu: ayarlar.Bot.SunucuID }).sort({ Çıkış: -1 });
  const BanDB = await GunlukDB.find({ Sunucu: ayarlar.Bot.SunucuID }).sort({ Ban: -1 });
  const UnbanDB = await GunlukDB.find({ Sunucu: ayarlar.Bot.SunucuID }).sort({ Unban: -1 });
  const PermVDB = await GunlukDB.find({ Sunucu: ayarlar.Bot.SunucuID }).sort({ PermAdd: -1 });
  const PermADB = await GunlukDB.find({ Sunucu: ayarlar.Bot.SunucuID }).sort({ PermRemove: -1 });
  const İsimDB = await GunlukDB.find({ Sunucu: ayarlar.Bot.SunucuID }).sort({ İsim: -1 });
const WlCezaDB = await GunlukDB.find({ Sunucu: ayarlar.Bot.SunucuID }).sort({ WlCeza: -1 });
  const UyarıDB = await GunlukDB.find({ Sunucu: ayarlar.Bot.SunucuID }).sort({ Uyarı: -1 });
  const TicketDB = await GunlukDB.find({ Sunucu: ayarlar.Bot.SunucuID }).sort({ Ticket: -1 });






  const MesajDBX = MesajDB
  .splice(0, 10)
  .map((x, index) => `${x.Mesaj}`)

  const SesDBX = SesDB
  .splice(0, 10)
  .map((x, index) => `${moment.duration(x.Ses).format("H [Saat], m [Dakika]")}`)



  const WelcomeDBX = WelcomeDB
  .splice(0, 10)
  .map((x, index) => `${x.Giriş}`)


  const ByByDBX = ByByDB
  .splice(0, 10)
  .map((x, index) => `${x.Çıkış}`)


  const BanDBX = BanDB
  .splice(0, 10)
  .map((x, index) => `${x.Ban}`)


  const UnbanDBX = UnbanDB
  .splice(0, 10)
  .map((x, index) => `${x.Unban}`)



  const PermVDBX = PermVDB
  .splice(0, 10)
  .map((x, index) => `${x.PermAdd}`)

  const PermADBX = PermADB
  .splice(0, 10)
  .map((x, index) => `${x.PermRemove}`)


  const İsimDBX = İsimDB
  .splice(0, 10)
  .map((x, index) => `${x.İsim}`)



  const WlRedDBX = WlRedDB
  .splice(0, 10)
  .map((x, index) => `${x.Red}`)


  const WlOnayDBX = WlOnayDB
  .splice(0, 10)
  .map((x, index) => `${x.Whitelist}`)

const WlCezaDBX = WlCezaDB
  .splice(0, 10)
  .map((x, index) => `${x.WlCeza}`)

const UyarıDBX = UyarıDB
  .splice(0, 10)
  .map((x, index) => `${x.Uyarı}`)

const TicketDBX = TicketDB
  .splice(0, 10)
  .map((x, index) => `${x.Ticket}`)



  const profile = await new canvafy.GunlukVeri()
  .setUser("278152550627409921")
  .setSunucuAD(`${guild.name}`)
  .setWhitelist(`${removeFromCount}`)
  .setStaff(`${StaffSize}`)
  .setSes(`${SesDBX}`)
  .setMesaj(`${MesajDBX}`)
  .setGiriş(`${WlOnayDBX}`) // Wl Onay
  .setÇıkış(`${WlRedDBX}`) // Wl Red
  .setBan(`${BanDBX}`)
  .setUnban(`${UnbanDBX}`)
  .setİsim(`${İsimDBX}`)
.setWlCeza(`${WlCezaDBX}`)
.setUyarı(`${UyarıDBX}`)
.setTicket(`${TicketDBX}`)
  .setPermAdd(`${PermVDBX}`)
  .setPermRemove(`${PermADBX}`)
  .setTarih(`${moment(Date.now()).format("LLL")}`)
  .setAvatar(guild.iconURL({ dynamic: false }))
  .setBannerX(guild.bannerURL({ format: 'png' }) || "https://cdn.discordapp.com/attachments/1122853672716607540/1142153361957863574/static_8.png")
  .setBorder("#f0f0f0")










  .setActivity({activity:{
    name: 'Visual Studio Code',
    type: 0,
    url: null,
    details: '📝 In canvafy ❓ 0 problems found',
    state: 'Working on package.json:45:5',
    applicationId: '810516608442695700',
    party: null,
    assets:{
      largeText: '📝 Editing a NPM',
      smallText: '❓ Visual Studio Code',
      largeImage: 'mp:external/CPFiq3MlvnvOKJSW6pUeZ7gfOdfcrLPtGK9dT3LrsCo/https/raw.githubusercontent.com/LeonardSSH/vscord/main/assets/icons/npm.png',
      smallImage: 'mp:external/Joitre7BBxO-F2IaS7R300AaAcixAvPu3WD1YchRgdc/https/raw.githubusercontent.com/LeonardSSH/vscord/main/assets/icons/vscode.png'
    }},
   largeImage:"https://raw.githubusercontent.com/LeonardSSH/vscord/main/assets/icons/js.png"
  })
  .build();

  const GunlukMesaj = await client.channels.cache.get(ayarlar.LOG.GünlükVeri).send({files: [{ attachment: profile, name: "gunluk-veri-alsia.png" }]}).catch(() => {});





  const Embeds = new EmbedBuilder()
  .setImage(`attachment://gunluk-veri-alsia.png`)
  .setColor("#12073d")
  .setDescription(`\`ɢᴜɴʟᴜᴋ ꜱᴜɴᴜᴄᴜ ᴠᴇʀɪʟᴇʀɪ:\` 
  
  ${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}
  `)
  .setAuthor({name: `${ayarlar.Embed.authorembed} - ꜱᴜɴᴜᴄᴜ ᴠᴇʀɪ`,  iconURL: guild.iconURL({dynamic: true})}
  )
   .setThumbnail(guild.iconURL({ dynamic: true}))


  await GunlukMesaj.edit({ embeds: [Embeds] , files: [{ attachment: profile, name: "gunluk-veri-alsia.png" }] })


  await GunlukDB.deleteOne({ Sunucu: ayarlar.Bot.SunucuID })





})














////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





  
scheduleJob(rule, async() => {
 
    console.log(`[ ❓ ] Günlük Stat Sıfırlandı!`)
    const guild = client.guilds.cache.get(ayarlar.Bot.SunucuID); 
    
 
    
    guild.members.cache.forEach(async (member) => {

      await messageGuild.findOneAndUpdate({ guildID: ayarlar.Bot.SunucuID }, { $set: { dailyStat: 0 } });
      await voiceGuild.findOneAndUpdate({ guildID: ayarlar.Bot.SunucuID }, { $set: { dailyStat: 0 } });
      await messageUser.findOneAndUpdate({ guildID: ayarlar.Bot.SunucuID, userID: member.user.id }, { $set: { dailyStat: 0 } }, { upsert: false });
      await voiceUser.findOneAndUpdate({ guildID: ayarlar.Bot.SunucuID, userID: member.user.id }, { $set: { dailyStat: 0 } }, { upsert: false });
      await voiceUserChannel.findOneAndUpdate({ guildID: ayarlar.Bot.SunucuID, userID: member.user.id }, { $set: { GchannelData: 0 } }, { upsert: false });
      await messageUserChannel.findOneAndUpdate({ guildID: ayarlar.Bot.SunucuID, userID: member.user.id }, { $set: { GchannelData: 0 } }, { upsert: false });


      const members = await guild.members.fetch() 


      const removeFromFilter = members.filter(m => m.roles.cache.has(ayarlar.Permler.Yetkili));

      
                                        removeFromFilter.forEach(async (memberx) => {

    await YetkiliDB.findOneAndUpdate({Sunucu: ayarlar.Bot.SunucuID , Yetkili: memberx.user.id} , { $set: {  YetkiliAD: memberx.user.username , GBan: 0 , GHex: 0 , Gİsim: 0 , GPermAlma: 0 , GPermVerme: 0 , GTicket: 0 , GUnban: 0 , GUyarı: 0 , GWlCeza: 0 , GWlOnay: 0 , GWlRed: 0} }, { upsert: false } )
  

                                        // })
                                        // })
                                      })
  
 });
  })






  
  scheduleJob({hour: 23, minute: 30, dayOfWeek: 0}, async function(){

    console.log(`[ ❓ ] Haftalık Stat Sıfırlandı!`)


    const guild = client.guilds.cache.get(ayarlar.Bot.SunucuID);

      guild.members.cache.forEach(async (member) => {
      await messageGuild.findOneAndUpdate({ guildID: ayarlar.Bot.SunucuID }, { $set: { weeklyStat: 0} });
      await voiceGuild.findOneAndUpdate({ guildID: ayarlar.Bot.SunucuID }, { $set: { weeklyStat: 0} });
      await messageUser.findOneAndUpdate({ guildID: ayarlar.Bot.SunucuID, userID: member.user.id }, { $set: { weeklyStat: 0} }, { upsert: false });
      await voiceUser.findOneAndUpdate({ guildID: ayarlar.Bot.SunucuID, userID: member.user.id }, { $set: { weeklyStat: 0} }, { upsert: false });
      await voiceUserChannel.findOneAndUpdate({ guildID: ayarlar.Bot.SunucuID, userID: member.user.id }, { $set: { HchannelData: 0 } }, { upsert: false });
      await messageUserChannel.findOneAndUpdate({ guildID: ayarlar.Bot.SunucuID, userID: member.user.id }, { $set: { HchannelData: 0 } }, { upsert: false });

      const members = await guild.members.fetch() 
      const removeFromFilter = members.filter(m => m.roles.cache.has(ayarlar.Permler.Yetkili));

      
      removeFromFilter.forEach(async (memberx) => {

        await HaftalıKayıtDB.findOneAndUpdate({Sunucu: ayarlar.Bot.SunucuID , Yetkili: memberx.user.id} , { $set: { YetkiliAD: memberx.user.username , ToplamKayıt: 0 , HWlOnay: 0 , HWlRed: 0 } }, { upsert: false } )
        await YetkiliDB.findOneAndUpdate({Sunucu: ayarlar.Bot.SunucuID , Yetkili: memberx.user.id} , { $set: { YetkiliAD: memberx.user.username , HBan: 0 , HHex: 0 , Hİsim: 0 , HPermAlma: 0 , HPermVerme: 0 , HTicket: 0 , HUnban: 0 , HUyarı: 0 , HWlCeza: 0 , HWlOnay: 0 , HWlRed: 0} }, { upsert: false } )


      })



 });


   }) ;

































    }
}