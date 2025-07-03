const { Collection, Events ,InteractionType , EmbedBuilder,  ActivityType, AuditLogEvent} = require("discord.js")
const ayarlar = require("../../ayarlar.json");
const ms = require("ms")
const cooldown = new Collection()
// global.client = client;


const moment = require("moment")
moment.locale("tr")
require("moment-duration-format");

module.exports = {
	name: Events.InteractionCreate,
	başlat: async(interaction) => {






    let client = interaction.client;
    if (interaction.type == InteractionType.ApplicationCommand) {
    if(interaction.user.bot) return;
  try {
       const command = client.slashcommands.get(interaction.commandName)
       command.alsia(client, interaction)
  } catch (e) {
      console.error(e)
  interaction.reply({content: "Komut çalıştırılırken bir sorunla karşılaşıldı! Lütfen tekrar deneyin.", ephemeral: true})
  }
  }
















  






  const {guild, member, user, customId, channel} = interaction;
                  






    if (interaction.customId == "alsiayardım") {
  
  
  
  
  
  
  
  
      if (interaction.values[0] === "genelkomutlar") {
  
  
  
  interaction.reply({ ephemeral: true , content: `\`\`\`fix
  
  Slash Komutlar
      
  » /ban (oyuncu) (sebep)
  » /unban (ID) (sebep)
  » /forceban (ID) (sebep)
  » /ban-sorgu (ID)
  » /perma (oyuncu) (verdiren) (sebep) (kanıt)
  » /rolver (oyuncu) (rol)
  - /rolal (oyuncu) (rol)
  » /seviye (oyuncu/id)
  » /blacklist (ID) (hex) (sebep)
  » /blacklist-iptal (hex)
  » /hex-bul (ID)
  » /hex-oyuncular (hex)
  » /kayıtlar (ID)
  » /oluşum-kur (isim) (renk [#ffffff]) (boss)
  » /etiket-sorgu (#36)
  » /sicil-sorgu (etiket-ıd)
  » /spotify (oyuncu/id)
  » /uyarı (oyuncu) (verdiren) (sebep) (kanıt)
  » /uyarı-iptal (oyuncu)
  » /wlceza (oyuncu) (verdiren) (sebep) (kanıt)
  » /wlceza-iptal (oyuncu)
  » /rolbilgi (rol)
  » /isim (oyuncu) (isim)
  » /isimler (oyuncu)
  » /sil (miktar)
  » /git (yetkili)
  » /afk (sebep)
  » /topkayıt
  » /kanal (seçim)
  » /istatistik (oyuncu)
  » /ship 
  » /sd (oyuncu)
  » /perm-log (oyuncu) 
  » /ip
  » /ts3
  » /sunucu (aktif/bakım)
  » /sunucu-veri
  » /ticket-isim (isim)
  » /ticket-işlem (seçenek) (oyuncu)
  » /ticket-sil
  » /top (seçenek)
  » /top-kayıt
  » /toplu-perm-al (rol)
  » /tweet (yazı)
  
  
  Prefix Komutlar
  .snipe
  
  
  Sağ Tık Komutlar
  » Whitelist Onay
  » Whitelist Red
  » Yasaklama
  » Hex Ekle
  » İstatistik
  
   
  \`\`\``  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
      }
  
  
  
  
  
  
  
  
  
      if (interaction.values[0] === "wlceza") {
  
  
        const CezaMesaj = new EmbedBuilder()
        // .setImage("https://cdn.discordapp.com/attachments/1195121217808650352/1196053631946985502/image.png?ex=65b63abf&is=65a3c5bf&hm=7fb977ae5408383832bfb035aaacbf5a3ae9d2749f0007e0cb1406ed09af12ed&")
        .setDescription(`
  
 
  
  
  
  
        
        `)
        // .setFooter({ text: `Ⓜ️ Wl Ceza Sistemi` })
        .setTitle("alsia - Wl Ceza Sıstemı")
        .setURL("")
                              // .setAuthor({
                              // name: `${ayarlar.Embed.authorembed} - ᴡʟ ᴄᴇᴢᴀ ꜱıꜱᴛᴇᴍı`, 
                              // iconURL: guild.iconURL({dynamic: true})})
                              .setThumbnail(guild.iconURL({ dynamic: true }))
                              .setColor("#051b50")
                              .addFields(
                                   { name: "**KOMUT:**",  value: `\`\`\`fix
  /wlceza (oyuncu) (verdiren) (sebep) (kanıt)\`\`\`
                                   `, inline: false })
                                   .addFields(
                                    { name: "**VIDEO:**",  value: `\`\`\`fix
\`\`\`
                                    `, inline: true })
  
  
  interaction.reply({ embeds: [CezaMesaj] , ephemeral: true })
  
  
  
  
  
  
  
  
      }
  
  
  
  
  
  
  
  
  
  
      if (interaction.values[0] === "uyarı") {
  
  
        const CezaMesaj = new EmbedBuilder()
        // .setImage("https://cdn.discordapp.com/attachments/1195121217808650352/1196053631946985502/image.png?ex=65b63abf&is=65a3c5bf&hm=7fb977ae5408383832bfb035aaacbf5a3ae9d2749f0007e0cb1406ed09af12ed&")
        .setDescription(`
  
 
 
  
  
  
  
  
        
        `)
        // .setFooter({ text: `Ⓜ️ Wl Ceza Sistemi` })
        .setTitle("alsia - Uyarı Sıstemı")
        .setURL("")
                              // .setAuthor({
                              // name: `${ayarlar.Embed.authorembed} - ᴡʟ ᴄᴇᴢᴀ ꜱıꜱᴛᴇᴍı`, 
                              // iconURL: guild.iconURL({dynamic: true})})
                              .setThumbnail(guild.iconURL({ dynamic: true }))
                              .setColor("#051b50")
                              .addFields(
                                   { name: "**KOMUT:**",  value: `\`\`\`fix
  /uyarı (oyuncu) (verdiren) (sebep) (kanıt)\`\`\`
                                   `, inline: false })
                                   .addFields(
                                    { name: "**VIDEO:**",  value: `\`\`\`fix
  \`\`\`
                                    `, inline: true })
  
  
  interaction.reply({ embeds: [CezaMesaj] , ephemeral: true })
  
  
  
                                   }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
                                   if (interaction.values[0] === "kayıt") {
  
  
                                    const CezaMesaj = new EmbedBuilder()
                                    // .setImage("https://cdn.discordapp.com/attachments/1195121217808650352/1196053631946985502/image.png?ex=65b63abf&is=65a3c5bf&hm=7fb977ae5408383832bfb035aaacbf5a3ae9d2749f0007e0cb1406ed09af12ed&")
                                    .setDescription(`
                              
  

  
                              
                              
                              
                              
                                    
                                    `)
                                    // .setFooter({ text: `Ⓜ️ Wl Ceza Sistemi` })
                                    .setTitle("alsia - Kayıt Sıstemı")
                                    .setURL("")
                                                          // .setAuthor({
                                                          // name: `${ayarlar.Embed.authorembed} - ᴡʟ ᴄᴇᴢᴀ ꜱıꜱᴛᴇᴍı`, 
                                                          // iconURL: guild.iconURL({dynamic: true})})
                                                          .setThumbnail(guild.iconURL({ dynamic: true }))
                                                          .setColor("#051b50")
                                                          .addFields(
                                                               { name: "**KOMUT:**",  value: `\`\`\`fix
  Sağ tık uygulamalar Whitelist Onay/Red\`\`\`
                                                               `, inline: false })
                                                               .addFields(
                                                                { name: "**VIDEO:**",  value: `\`\`\`fix
  \`\`\`
                                                                `, inline: true })
                              
                              
                              interaction.reply({ embeds: [CezaMesaj] , ephemeral: true })
                              
                              
                              
                                                               }
  
  
  
  
  
  
  
  
  
  
  
  
  
                                                               if (interaction.values[0] === "hex") {
  
  
                                                                const CezaMesaj = new EmbedBuilder()
                                                                // .setImage("https://cdn.discordapp.com/attachments/1195121217808650352/1196053631946985502/image.png?ex=65b63abf&is=65a3c5bf&hm=7fb977ae5408383832bfb035aaacbf5a3ae9d2749f0007e0cb1406ed09af12ed&")
  .setDescription(`
                                                          
                              
 
  `)
                                                                // .setFooter({ text: `Ⓜ️ Wl Ceza Sistemi` })
                                                                .setTitle("alsia - Hex Sıstemı")
                                                                .setURL("")
                                                                                      // .setAuthor({
                                                                                      // name: `${ayarlar.Embed.authorembed} - ᴡʟ ᴄᴇᴢᴀ ꜱıꜱᴛᴇᴍı`, 
                                                                                      // iconURL: guild.iconURL({dynamic: true})})
                                                                                      .setThumbnail(guild.iconURL({ dynamic: true }))
                                                                                      .setColor("#051b50")
                                                                                      .addFields(
                                                                                           { name: "**KOMUT:**",  value: `\`\`\`fix
  Sağ tık uygulamalar Hex Ekle\`\`\`
                                                                                           `, inline: false })
                                                                                           .addFields(
                                                                                            { name: "**VIDEO:**",  value: `\`\`\`fix
  \`\`\`
                                                                                            `, inline: true })
                                                          
                                                          
                                                          interaction.reply({ embeds: [CezaMesaj] , ephemeral: true })
                                                          
                                                          
                                                          
                                                                                           }
  
  
  
  
  
  
  
  
  
  if (interaction.values[0] === "istatistik") {
  
  
  const CezaMesaj = new EmbedBuilder()
  .setDescription(`
                                                                                      
                                                          
 
                              `)
  // .setFooter({ text: `Ⓜ️ Wl Ceza Sistemi` })
  .setTitle("alsia - İstatistik Sıstemı")
  .setURL("")
  // .setAuthor({
  // name: `${ayarlar.Embed.authorembed} - ᴡʟ ᴄᴇᴢᴀ ꜱıꜱᴛᴇᴍı`, 
  // iconURL: guild.iconURL({dynamic: true})})
  .setThumbnail(guild.iconURL({ dynamic: true }))
  .setColor("#051b50")
  .addFields(
  { name: "**KOMUT:**",  value: `\`\`\`fix
  /top (seçenek)
  /istatistik (oyuncu)
  Sağ tık uygulamalar Yetkili İstatistik\`\`\`
  `, inline: false })
  .addFields(
  { name: "**VIDEO:**",  value: `\`\`\`fix
  \`\`\`
  `, inline: true })
  
  interaction.reply({ embeds: [CezaMesaj] , ephemeral: true })
                                                                                      
                                                                                      
                                                                                      
                                                                                                                       }
  
  
  
  
  
  
  
  
  
  if (interaction.values[0] === "log") {
  
  
  const CezaMesaj = new EmbedBuilder()
  // .setImage("https://cdn.discordapp.com/attachments/1195121217808650352/1196053631946985502/image.png?ex=65b63abf&is=65a3c5bf&hm=7fb977ae5408383832bfb035aaacbf5a3ae9d2749f0007e0cb1406ed09af12ed&")
  .setDescription(`
                                                                                                                                                                                                            
                                                                                                                                                                                
 
  `)
  // .setFooter({ text: `Ⓜ️ Wl Ceza Sistemi` })
  .setTitle("alsia - Veri Sıstemı")
  .setURL("")
 
  .setThumbnail(guild.iconURL({ dynamic: true }))
  .setColor("#051b50")
  .addFields(
  { name: "**KOMUT:**",  value: `\`\`\`fix
  /perm-log (oyuncu)
  /sicil-sorgu (oyuncu)
  /etiket-sorgu (etiket-ıd)\`\`\`
  `, inline: false })
  .addFields(
  { name: "**VIDEO:**",  value: `\`\`\`fix
  \`\`\`
  `, inline: true })
  interaction.reply({ embeds: [CezaMesaj] , ephemeral: true })
                                                                                                                                                                                                            
                                                                                                                                                                                                            
                                                                                                                                                                                                            
                                                                                                                                                                                                                                             }
  
  
  
  
  
  
  
  
    }
  
  
  
  
  

































    }
}