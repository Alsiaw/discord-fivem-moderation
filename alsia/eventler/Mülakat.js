const { Collection, Events , PermissionFlagsBits,  EmbedBuilder,  ChannelType , ActivityType, AuditLogEvent} = require("discord.js")
const ayarlar = require("../../ayarlar.json");
const ms = require("ms")
const cooldown = new Collection()
// global.client = client;


const moment = require("moment")
moment.locale("tr")
require("moment-duration-format");

const MülakatDB = require("../../database/Mülakat")


module.exports = {
	name: Events.VoiceStateUpdate,
	başlat: async(oldState , newState) => {



    
      let mainChannel = oldState.guild.channels.cache.get(ayarlar.Mülakat.BeklemeOdası);
      if (!mainChannel) return;
    
    
      if (!oldState.channelId && (newState.channelId && newState.channel.parentId == mainChannel.parentId && newState.channelId == mainChannel.id)) {
    
        await MülakatDB.updateOne(
          { Sunucu: newState.guild.id },
          
          {
            $inc: {
              ID: 1,
            }
          },
          { upsert: true}
        );
    
        const TürkçeDilDB = await MülakatDB.find({ Sunucu: newState.guild.id }).sort({ ID: -1 });
        const messageUsers = TürkçeDilDB
        .splice(0, 5)
        .map((x, index) => `${x.ID}`)
        .join("");
       
       
        newState.guild.channels.create({
    
          name: `Mülakat | ${newState.member.user.username} |`, 
              parent: ayarlar.Mülakat.KayıtKategori,
              type: ChannelType.GuildVoice,
              rateLimitPerUser: 300,
              
                  permissionOverwrites: [
    
    
                    {
                      id: newState.id,
                      allow: [PermissionFlagsBits.ViewChannel , PermissionFlagsBits.Speak , PermissionFlagsBits.Connect , PermissionFlagsBits.Stream , PermissionFlagsBits.ReadMessageHistory , PermissionFlagsBits.SendMessages],
                      // deny: [PermissionFlagsBits.SendMessages],
                  },
    
                  {
                    id: newState.guild.roles.everyone,
                    deny: [PermissionFlagsBits.SendMessages , PermissionFlagsBits.ViewChannel],
                },
    
                {
                  id: ayarlar.Permler.Yetkili,
                  allow: [PermissionFlagsBits.ViewChannel , PermissionFlagsBits.Speak , PermissionFlagsBits.Connect , PermissionFlagsBits.MuteMembers , PermissionFlagsBits.DeafenMembers , PermissionFlagsBits.MoveMembers , PermissionFlagsBits.SendMessages],
          
              },
    
                    
          ],
    
          }).then(async (channel) => {
              if (newState.member && newState.member.voice.channelId) newState.member.voice.setChannel(channel);
          
              const bilgimesaj = new EmbedBuilder()
              .setAuthor({name:`${ayarlar.Embed.authorembed} - ᴍᴜʟᴀᴋᴀᴛ ꜱıꜱᴛᴇᴍı`, iconURL: newState.guild.iconURL({dynamic:true})})
              .setDescription(`    
    <a:poofpinkheart:1327600266907750450>
 ・ *Merhabalar sunucumuza hoşgeldiniz yetkililerimiz en kısa sürede sizinle ilgilenicektir.*
              
    <a:5961darkbluetea:1327585257578561548> ・ *Yetkililerimizi beklerken sunucumuz hakkında aşşağıda bulunan linklerden bilgi alabilir şimdiden kuralları okuyabilirsiniz*
              
    <:claim:1327586348244140082> ・ *Lütfen yetkililerimize etiket atmayınız anlayışınız için teşekkür ederiz , aşşağıda belirttiğimiz ön bilgi formunu lütfen doldurunuz.*
             
    \`ᴏɴ ʙɪʟɢɪ ꜰᴏʀᴍᴜ »\`
    
    İsim: Haktan
    Yaş: 19
    Steam Hex: 1100001418f23c8
             
    <a:discorsel:1327600219017187380> [ᴋᴜʀᴀʟʟᴀʀ](${ayarlar.Mülakat.Kurallar}) | <:YouTube:1327585623623733258> [ʏᴏᴜᴛᴜʙᴇ](${ayarlar.FiveM.Youtube}) | <:fivem:1327600224419577886> [ꜰıᴠᴇᴍ](${ayarlar.FiveM.FiveMURL}) `)
              .setColor('#030202')
              .setThumbnail(newState.member.user.avatarURL({dynamic:true})) 
              .setImage(ayarlar.Resimler.UzunKısa)
              .setFooter({ text: `Ⓜ️ MülakatID: #${messageUsers} ・ ${moment(Date.now()).format("LLL")}`})
    
    
    
              const LOGKASU = new EmbedBuilder()
              .setAuthor({name:`${ayarlar.Embed.authorembed} - ᴍᴜʟᴀᴋᴀᴛ ꜱıꜱᴛᴇᴍı`, iconURL: newState.guild.iconURL({dynamic:true})})
              .setDescription(`    
    <a:poofpinkheart:1327600266907750450>・ \`ᴏʏᴜɴᴄᴜ:\` ${newState.member}
              `)
              .setColor('#030202')
              .addFields(
                { name: "<:claim:1327586348244140082> **KAYIT ODASI**",  value: `\`\`\`fix
    ${channel.name}\`\`\``, inline: true },
              )
              .setThumbnail(newState.member.user.avatarURL({dynamic:true})) 
              .setFooter({ text: `Ⓜ️ MülakatID: #${messageUsers} ・ ${moment(Date.now()).format("LLL")}`})
              
              
              await channel.send({ embeds: [bilgimesaj] , content: `${newState.member} <@&${ayarlar.Mülakat.Helper}> <@&${ayarlar.Mülakat.Support}>`})
          
    
    
              await newState.guild.channels.cache.get(ayarlar.Mülakat.LOG).send({embeds: [LOGKASU]})
    
    
    
    
    
    
    
    
    
    
    
    
          
            });
          return;
      }
      else if (oldState.channelId && newState.channelId) {
    
          let oldChannel = oldState.channel;    
          if (oldState.channel.name.startsWith('Mülakat')) {
    
    
              if (oldChannel.position > mainChannel.position && oldChannel.members.size <= 0 && !oldChannel.deleted) oldChannel.delete().catch(() => {});
      } else {
          return
    }
          if (newState.channelId == mainChannel.id && newState.channel.parentId == mainChannel.parentId) {
        
        
        
            await MülakatDB.updateOne(
              { Sunucu: newState.guild.id },
              
              {
                $inc: {
                  ID: 1,
                }
              },
              { upsert: true}
            );
        
            const TürkçeDilDB = await MülakatDB.find({ Sunucu: newState.guild.id }).sort({ ID: -1 });
            const messageUsers = TürkçeDilDB
            .splice(0, 5)
            .map((x, index) => `${x.ID}`)
            .join("");
        
    
              newState.guild.channels.create({
    
                  name: `Mülakat | ${newState.member.user.username} |`, 
                parent: ayarlar.Mülakat.KayıtKategori,
                type: ChannelType.GuildVoice,
                rateLimitPerUser: 300,
                  permissionOverwrites: [
                   
                   
                   
                    {
                      id: newState.id,
                      allow: [PermissionFlagsBits.ViewChannel , PermissionFlagsBits.Speak , PermissionFlagsBits.Connect , PermissionFlagsBits.Stream , PermissionFlagsBits.ReadMessageHistory , PermissionFlagsBits.SendMessages],
                      // deny: [PermissionFlagsBits.SendMessages],
                  },
    
                  {
                    id: newState.guild.roles.everyone,
                    deny: [PermissionFlagsBits.SendMessages , PermissionFlagsBits.ViewChannel],
                },
    
                {
                  id: ayarlar.Permler.Yetkili,
                  allow: [PermissionFlagsBits.ViewChannel , PermissionFlagsBits.Speak , PermissionFlagsBits.Connect , PermissionFlagsBits.MuteMembers , PermissionFlagsBits.DeafenMembers , PermissionFlagsBits.MoveMembers , PermissionFlagsBits.SendMessages],
          
              },
                 
            
            
            
            
            ],
             
              }).then(async (channel) => {
                  if (newState.member && newState.member.voice.channelId) newState.member.voice.setChannel(channel);
    
    
    const bilgimesaj = new EmbedBuilder()
    .setAuthor({name:`${ayarlar.Embed.authorembed} - ᴍᴜʟᴀᴋᴀᴛ ꜱıꜱᴛᴇᴍı`, iconURL: newState.guild.iconURL({dynamic:true})})
    .setDescription(`    
    <a:poofpinkheart:1327600266907750450>
 ・ *Merhabalar sunucumuza hoşgeldiniz yetkililerimiz en kısa sürede sizinle ilgilenicektir.*
              
    <a:5961darkbluetea:1327585257578561548> ・ *Yetkililerimizi beklerken sunucumuz hakkında aşşağıda bulunan linklerden bilgi alabilir şimdiden kuralları okuyabilirsiniz*
              
    <:claim:1327586348244140082> ・ *Lütfen yetkililerimize etiket atmayınız anlayışınız için teşekkür ederiz , aşşağıda belirttiğimiz ön bilgi formunu lütfen doldurunuz.*
             
    \`ᴏɴ ʙɪʟɢɪ ꜰᴏʀᴍᴜ »\`
    
    İsim: Emre
    Yaş: 19
    Steam Hex: 1100001418f23c8
             
    <a:discorsel:1327600219017187380> [ᴋᴜʀᴀʟʟᴀʀ](${ayarlar.Mülakat.Kurallar}) | <:YouTube:1327585623623733258> [ʏᴏᴜᴛᴜʙᴇ](${ayarlar.FiveM.Youtube}) | <:fivem:1327600224419577886> [ꜰıᴠᴇᴍ](${ayarlar.FiveM.FiveMURL}) `)
    .setColor('#030202')
    .setThumbnail(newState.member.user.avatarURL({dynamic:true})) 
    .setImage(ayarlar.Resimler.UzunKısa)
    .setFooter({ text: `Ⓜ️ MülakatID: #${messageUsers} ・ ${moment(Date.now()).format("LLL")}`})
    
    
    const LOGKASU = new EmbedBuilder()
              .setAuthor({name:`${ayarlar.Embed.authorembed} - ᴍᴜʟᴀᴋᴀᴛ ꜱıꜱᴛᴇᴍı`, iconURL: newState.guild.iconURL({dynamic:true})})
              .setDescription(`    
    <a:poofpinkheart:1327600266907750450>
 ・ \`ᴏʏᴜɴᴄᴜ:\` ${newState.member}
              `)
              .setColor('#030202')
              .addFields(
                { name: "<:claim:1327586348244140082> **KAYIT ODASI**",  value: `\`\`\`fix
    ${channel.name}\`\`\``, inline: true },
              )
              .setThumbnail(newState.member.user.avatarURL({dynamic:true})) 
              .setFooter({ text: `Ⓜ️ MülakatID: #${messageUsers} ・ ${moment(Date.now()).format("LLL")}`})
              
              
              await channel.send({ embeds: [bilgimesaj] , content: `${newState.member} <@&${ayarlar.Mülakat.Helper}> <@&${ayarlar.Mülakat.Support}>`})
          
    
    
              await newState.guild.channels.cache.get(ayarlar.Mülakat.LOG).send({embeds: [LOGKASU]})
              
    
              });
          }
          return;
      }
      
      else if ((oldState.channelId && oldState.channel.parentId == mainChannel.parentId) && !newState.channelId) {
          let oldChannel = oldState.channel;    
              if (oldState.channel.name.startsWith('Mülakat')) {
      
      
                  if (oldChannel.position > mainChannel.position && oldChannel.members.size <= 0 && !oldChannel.deleted) oldChannel.delete().catch(() => {});
          } else {
              return
      }
      }
    
    
  





































    }
}