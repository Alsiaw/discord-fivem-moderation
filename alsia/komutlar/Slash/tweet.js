const {ChannelType  ,EmbedBuilder, PermissionsBitField, AttachmentBuilder , ActivityType} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const ayarlar = require("../../../ayarlar.json")

const moment = require("moment");
moment.locale("tr")

const canvafy = require("canvafy")
const Canvas = require("@napi-rs/canvas");




module.exports = {
  data: new SlashCommandBuilder()
    .setName("tweet")
    .setDescription("Hadi bir tweet at?")
    .addStringOption(option =>
        option.
        
        setName('yazı')
        .setDescription('Lütfen bir tweet yazınız Örnek: alsia çok iyi developer')
        .setRequired(true)
    ),




			alsia: async (client, interaction) => {
    
				const tweet = interaction.options.getString('yazı') 

				const guild = interaction.guild


        const yazı = [] 
                if(tweet.length > 64) {
                const yarrak = tweet.slice(0, 64)
                  yazı.push(`${yarrak}`)  
                } else {
                  yazı.push(`${tweet}`)
                }
        const isim = [] 
                if(interaction.member.displayName.length > 27) {
                const yarrak = interaction.member.displayName.slice(0, 27)
                  isim.push(`${yarrak}`)  
                } else {
                  isim.push(`${interaction.member.displayName}`)
                }
          const isimTag = [] 
                if(interaction.member.user.username.length > 34) {
                const yarrak = interaction.member.user.username.slice(0, 34)
                  isimTag.push(`${yarrak}`)  
                } else {
                  isimTag.push(`${interaction.member.user.username ? interaction.member.user.username : interaction.member.user.username}`)
                }








            const canvas = Canvas.createCanvas(700, 250);
            const ctx = canvas.getContext("2d")
            const bg = await Canvas.loadImage(`https://cdn.discordapp.com/attachments/1195121217808650352/1195487921973760140/image.png?ex=65b42be3&is=65a1b6e3&hm=da783efce9649cca0b10fb9667322c1c8c15eee60e4cef759a5fda5f2b2ad7a9&`)
            ctx.drawImage(bg, 0, 0, 700, 250)
            ctx.font = "75px 'Candara'"
            ctx.fillStyle = "#f0f0f0"
            const messageAuthor = await Canvas.loadImage(interaction.member.user.avatar == null && "https://media.discordapp.net/attachments/1121836955001430017/1122866615072063508/Picsart_23-06-26_15-30-29-413.png" || interaction.member.displayAvatarURL({ format: "png" }))
            
         

            ctx.drawImage(messageAuthor, 25, 25, 75, 75)
            ctx.font = '30px Arial',
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${isim}`, canvas.width / 6, canvas.height / 5);
            ctx.font = '16px "Candara"',
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`@${isimTag}`, canvas.width / 6, canvas.height / 3.25);
            ctx.font = '20px Arial',
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${yazı}`, canvas.width / 25, canvas.height / 1.75);
            ctx.font = '12px Arial',
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${moment(Date.now()).format("LLL")}`, canvas.width / 25, canvas.height / 1.40);



        const attachment = new AttachmentBuilder(await canvas.encode('png'), {name: "tweet-alsia.jpg"})  
        

                  const yenimsg = await interaction.deferReply({})
 
                  await yenimsg.edit({ files: [attachment] })


   
   
    }
 };
