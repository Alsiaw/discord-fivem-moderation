const {ChannelType  ,EmbedBuilder, PermissionsBitField, AttachmentBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ayarlar = require("../../../ayarlar.json")
const { YamlDatabase } = require("five.db");
const db = new YamlDatabase();

const moment = require("moment");
moment.locale("tr")
const canvafy = require("canvafy")



const ms = require("ms");


const IDB = require("../../../database/ID.js");
const EtiketDB = require("../../../database/etiket-veri.js");
const SicilDB = require("../../../database/sicil.js");
const YetkiliDB = require("../../../database/yetkili-veri.js");
const SunucuDB = require("../../../database/gunluk-veri.js");








module.exports = {
  data: new SlashCommandBuilder()
    .setName("wlceza-iptal")
    .setDescription("Bir kullanıcıya wl ceza vermenize işe yarar.")
    .addUserOption(option =>
        option.
           setName('oyuncu')
          .setDescription('Oyuncu giriniz lütfen örnek: @alsiaw')
          .setRequired(true)
    ),





			alsia: async (client, interaction) => {
    
                const Oyuncu = interaction.options.getMember('oyuncu')

				const guild = interaction.guild




const Warn = new EmbedBuilder()
.setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
.setColor("#490404")
.setTimestamp()

const roles = ayarlar.Yetkiler.Staff;

if (!interaction.member.roles.cache.find(r => roles.includes(r.id))) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Yetersiz veya geçersiz yetki.*")] , ephemeral: true })
if (!Oyuncu) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Geçerli bir oyuncu seçiniz.*")] , ephemeral: true })
if (interaction.member.id == Oyuncu.id) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Kendinemi Ceza Vericeksin.*")] , ephemeral: true })
if (interaction.channelId !== ayarlar.Yetkiler.BotKomut) return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Sadece* <#${ayarlar.Yetkiler.BotKomut}> *kanalında kullanabilirsin*`)] , ephemeral: true  })
if (!Oyuncu.manageable) return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Botun yetkisi yetmemektedir.*`)] , ephemeral: true  })































































































const CezaVarmı = db.get("wlceza-" + Oyuncu.id)
if (!CezaVarmı) return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Oyuncunun zaten whitelist cezası yok.*`)] , ephemeral: true  })



                      const embed = new EmbedBuilder()
                      .setDescription(`<a:5961darkbluetea:1327585257578561548> ・ ${Oyuncu} *İsimli oyuncunun süre gelen whitelist cezası iptal edilmiştir.*
                      
                      <:8676gasp:1327585524231176192> ・ \`ʏᴇᴛᴋıʟı:\` ${interaction.member}`)
                      .setAuthor({
                      name: `${interaction.member.displayName}`, 
                      iconURL: interaction.member.user.avatarURL({dynamic: true})})
                      .setColor("#051b50")
          
          await interaction.reply({ embeds: [embed] }).catch(() => {});





await guild.channels.cache.get(ayarlar.KomutLOG.wlcezaLOG).send({  embeds: [embed] })

await db.delete("wlceza-" + Oyuncu.id);

await Oyuncu.roles.remove(ayarlar.Permler.WlCeza).catch(() => {});





























   
   
   
    }
 };
