const {ChannelType  ,EmbedBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder,  PermissionsBitField, AttachmentBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ayarlar = require("../../../ayarlar.json")

const moment = require("moment");
moment.locale("tr")



const AfkDB = require("../../../database/afk.js")


module.exports = {
  data: new SlashCommandBuilder()
    .setName("git")
    .setDescription("Ses kanalında olan bir kişinin yanına gitmenize işe yarar.")
	.addUserOption(option =>
        option.
           setName('ᴋᴜʟʟᴀɴɪᴄɪ')
          .setDescription('Lütfen bir kullanıcı giriniz')
          .setRequired(true)
    ),




			alsia: async (client, interaction) => {
    

				const guild = interaction.guild

                const member = interaction.options.getMember('ᴋᴜʟʟᴀɴɪᴄɪ')






                const Warn = new EmbedBuilder()
                .setAuthor({ name: interaction.member.user.username , iconURL: interaction.member.user.avatarURL({dynamic: true})})
                .setColor("#490404")
                .setTimestamp()
                
                
                if (!member) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Geçerli bir oyuncu seçiniz.*")] , ephemeral: true })
                if (interaction.member.id == member.id) return interaction.reply({ embeds: [Warn.setDescription("<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Kendinemi Ceza Vericeksin.*")] , ephemeral: true })
               // if (!member.manageable) return interaction.reply({ embeds: [Warn.setDescription(`<a:unlemsel:1327600285597569066> ・ ***Uyarı:*** *Botun yetkisi yetmemektedir.*`)] , ephemeral: true  })
















                if (!interaction.member.voice.channel) {
                    return interaction.reply({ content: "Bir ses kanalında olmalısın!" }).catch(() => {});
                }
                  if (!member) {
                    return interaction.reply({ content: "Bir üye etiketle ve tekrardan dene!" }).catch(() => {});
                }
                  if (!member.voice.channel) {
                    return interaction.reply({ content: "Bu kullanıcı herhangi bir ses kanalında bulunmuyor!" }).catch(() => {});
                }
                  if (interaction.member.voice.channel === member.voice.channel) {
                    return interaction.reply({ content: "Zaten aynı kanaldasınız!" }).catch(() => {});
                }
                
                const row = new ActionRowBuilder()
                .addComponents(
                
                new ButtonBuilder()
                .setCustomId("onay")
                .setLabel("Kabul Et")
                .setStyle(ButtonStyle.Success)
                .setEmoji("915754671728132126"),
                
                new ButtonBuilder()
                .setCustomId("red")
                .setLabel("Reddet")
                .setStyle(ButtonStyle.Danger)
                .setEmoji("920412153712889877"),
                );
                
                
                const row2 = new ActionRowBuilder()
                .addComponents(
                new ButtonBuilder()
                .setCustomId("920412153712889877")
                .setLabel("İşlem Başarısız")
                .setStyle(ButtonStyle.Danger)
                .setDisabled(true),
                );
                
                const row3 = new ActionRowBuilder()
                .addComponents(
                new ButtonBuilder()
                .setCustomId("onayy")
                .setLabel("İşlem Başarılı")
                .setEmoji("915754671728132126")
                .setStyle(ButtonStyle.Success)
                .setDisabled(true),
                
                );
                
                 
                 
               
                
                let ozi = new EmbedBuilder()
                .setDescription(`${member}, ${interaction.member} \`${member.voice.channel.name}\` odasına gelmek istiyor. Kabul ediyor musun?`)
                .setFooter({ text: `Lütfen 30 saniye içerisinde işlem iptal edilecektir.`})
                .setAuthor({ name: member.displayName, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
                interaction.reply({ content: "Başarulu!" , ephemeral: true}).catch(() => {});
                let msg = await interaction.channel.send({ content: `${member}`, embeds: [ozi], components: [row] })
                
                var filter = button => button.user.id === member.user.id;
                
                let collector = await msg.createMessageComponentCollector({ filter, time: 10000 })
                
                collector.on("collect", async (button) => {
                
                if(button.customId === "onay") {
                  await button.deferUpdate();
                
                  interaction.member.voice.setChannel(member.voice.channel.id)
                
                const embeds = new EmbedBuilder() 
                .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
                // .setFooter({ text: interaction.member.tag, iconURL: interaction.member.avatarURL({ dynamic: true })})
                .setTimestamp()
                .setDescription(`${interaction.member}, ${member} kişisinin yanına başarıyla gittiniz.`)
                
                
                
                msg.edit({
                embeds: [embeds],
                components : [row3]
                })
                
                }
                
                if(button.customId === "red") {
                  await button.deferUpdate();
                
                const embedss = new EmbedBuilder() 
                .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
                // .setFooter({ text: interaction.member.tag, iconURL: interaction.member.avatarURL({ dynamic: true })})
                .setTimestamp()
                .setDescription(`${interaction.member}, ${member} yanına gitme işlemi iptal edildi.`)
                
                msg.edit({
                  embeds: [embedss],
                  components : [row2]
                })
                
        
        
        
        
        
        
        
        
        
        
                collector.on('end', collected => {
        
                    const embedssq = new EmbedBuilder() 
                    .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
                 
                    .setTimestamp()
                    .setDescription(`${interaction.member}, ${member} *30 Saniyelik süre dolduğu için otomatik olarak iptal edildi*.`)
                    
                    msg.edit({
                      embeds: [embedssq],
                      components : [row2]
                    })
        
                 
                });
            
        
        
        
        
        
        
        
        
        
        
            }
                 });
                
        





   
   
   
   
    }
 };
