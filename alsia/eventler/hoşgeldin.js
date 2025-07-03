const { Collection, Events , EmbedBuilder,  AuditLogEvent} = require("discord.js")
const ayarlar = require("../../ayarlar.json");
const ms = require("ms")
const cooldown = new Collection()


const canvafy = require("canvafy")
const moment = require("moment")
moment.locale("tr")
require("moment-duration-format");

const GunlukDB = require("../../database/gunluk-veri")
const HexDB = require("../../database/oyuncu-hex");


module.exports = {
	name: Events.GuildMemberAdd,
	başlat: async(member) => {




   


        if (member.guild.id !== ayarlar.Bot.SunucuID) return

        await member.roles.add(ayarlar.Permler.Giriş)
        
          const welcomeLOG = member.guild.channels.cache.get(ayarlar.LOG.welcomeLOG);
          if (!welcomeLOG) return;
        
        

        


















//   const docs = await HexDB.findOne({Sunucu: member.guild.id});
//   const hexler = docs.Hexler.sort((a, b) => b.Tarih - a.Tarih)
//   const liste = hexler.map((x , index) => `${x.Oyuncu}`)
  
  
  
  
  
  
  
  
//       const blacklistliste = liste


//       if(blacklistliste.some(alsia => member.id.includes(alsia))) {

//burdan alıp kulllansak

//         const welcomex = await new canvafy.WelcomeLeave()
//         .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
//         // .setBackground("image", "https://th.bing.com/th/id/R.248b992f15fb255621fa51ee0ca0cecb?rik=K8hIsVFACWQ8%2fw&pid=ImgRaw&r=0")
//         .setBackground("image", ayarlar.Resimler.welcomeURL)
//         .setTitle(member.user.username)
//         .setDescription(`
// Sunucumuzda Blacklist Olarak Gözüküyorsun Karantinaya Alındın!`)
//         .setBorder("#440808")
//         .setAvatarBorder("#ffffff")
//         .setOverlayOpacity(0.5)
//         .build();


// await member.send({ files: [{ attachment: welcomex , name: `alsia-blacklist-${member.id}.png` }] }).catch(() => {});


// const uyarı = new EmbedBuilder()
// .setColor("#120f3f")
// .setFooter({ text: `Ⓜ️ ${moment(Date.now()).format("LLL")}`})
// .setDescription(`<a:5961darkbluetea:1327585257578561548> ・ ${member} *isimli oyuncu blacklistte gözüküyor karantinaya alındı!*`)
// // .setTimestamp()
// .setAuthor({ name: member.displayName, iconURL: member.guild.iconURL({ dynamic: true  }) })


// await client.channels.cache.get(ayarlar.BlacklistHex.BlacklistHexUyarı).send({ embeds: [uyarı] , content: `||<@&${ayarlar.Permler.Yetkili}>||` })




// await member.roles.set([ayarlar.Permler.Blacklist]).catch(() => {});

// return false
//       }



















































        
              const welcome = await new canvafy.WelcomeLeave()
              .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
              // .setBackground("image", "https://th.bing.com/th/id/R.248b992f15fb255621fa51ee0ca0cecb?rik=K8hIsVFACWQ8%2fw&pid=ImgRaw&r=0")
              .setBackground("image", ayarlar.Resimler.welcomeURL)
              .setTitle(member.user.username)
              .setDescription(`
Sunucumuza Hoşgeldin Kayıt olmak için #Mülakat Bekleme Kanalına Geçebilirsin!`)
              .setBorder("#ffffff")
              .setAvatarBorder("#ffffff")
              .setOverlayOpacity(0.5)
              .build();
        
        
              const welcomelog = await new canvafy.WelcomeLeave()
              .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
              // .setBackground("image", "https://th.bing.com/th/id/R.248b992f15fb255621fa51ee0ca0cecb?rik=K8hIsVFACWQ8%2fw&pid=ImgRaw&r=0")
              .setBackground("image", ayarlar.Resimler.welcomeURL)
              .setTitle(member.user.username)
              .setDescription(`
Giriş Tarihi: ${moment(Date.now()).format("LLL")}`)
              .setBorder("#ffffff")
              .setAvatarBorder("#ffffff")
              .setOverlayOpacity(0.5)
              .build();
           
        
        
        
        
        
              let cihaz;
        
              let cihaz2 = member.presence?.clientStatus
                   if (cihaz2 == undefined) {
                      cihaz = "Çevrimdışı"
                   }
                   if (cihaz2 != undefined) {
                 if (Object.keys(member.presence?.clientStatus)[0] == "desktop") {
                    cihaz = "Bilgisayar"
                 }
                 if (Object.keys(member.presence?.clientStatus)[0] == "mobile") {
                    cihaz = "Telefon"
                 }
                 if (Object.keys(member.presence?.clientStatus)[0] == "web") {
                    cihaz = "İnternet Sitesi"
                 }
               }
        
        
        
              
              member.guild.channels.cache.get(ayarlar.LOG.welcomeLOG).send({
                  content: `<a:devil:1327600214617362463> ・ *Sunucuya Giriş Yaptı:* ${member}
<a:cute:1327586466498613279>
 ・ *Platformu:* \`${cihaz}\`
<a:poofpinkheart:1327600266907750450>
 ・ *Seninle Birlikte:* \`${(member.guild.members.cache.filter(a => a.joinedTimestamp <= member.joinedTimestamp).size).toLocaleString()}/${(member.guild.memberCount).toLocaleString()}\``,
                  files: [{
                    attachment: welcomelog,
                    name: `alsia-hoşgeldin-${member.id}.png`
                  }]
                });
        
        await member.send({ files: [{ attachment: welcome , name: `alsia-hoşgeldin-${member.id}.png` }] }).catch(() => {});
        
        
                const user = client.users.cache.get(member.id);
                const kurulus = new Date().getTime() - user.createdAt.getTime();
        
        
          await new canvafy.Security()
        
        
          const security = await new canvafy.Security()
          .setAvatar(member.user.displayAvatarURL({extension:"png",forceStatic:true}))
          .setBackground("image", ayarlar.Resimler.şüpheliURL)
          .setCreatedTimestamp(user.createdAt.getTime())
          .setSuspectTimestamp(1296000000) 
          .setBorder("#f0f0f0")
          .setLocale("tr") 
          .setAvatarBorder("#f0f0f0")
          .setOverlayOpacity(0.9)
          .build();
        
          member.guild.channels.cache.get(ayarlar.LOG.şüpheliLOG).send({
              content: `*Güvenlik Kontrolü:* ${member}`,
              files: [{
                attachment: security,
                name: `alsia-security-${member.id}.png`
              }]
          });






          await GunlukDB.updateOne(
            { Sunucu: member.guild.id
            },
            {
              $inc: {
                Giriş: 1       
              }
            },
            { upsert: true }
          );













    }
}