let Discord = require('discord.js')
let client = new Discord.Client()
require('dotenv').config()
const server = require('./server.js')

client.config = require('./config.json')
const prefix = require('./models/prefix')

client.noperm = new Discord.MessageEmbed()
.setTitle('Oopsie Poopsie!')
.setDescription(`You don't have permission to use that command as you are not a staff member.`)
.setColor(client.color)
.setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
.setTimestamp()

client.oopsiepoopsie = new Discord.MessageEmbed()
.setTitle('Oopsie Poopsie!')
.setDescription(`Seems like something went wrong on my end. Please try again!`)
.setColor(client.color)
.setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
.setTimestamp()

const fs = require('fs')
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.categories = fs.readdirSync('./commands/');
["commands"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
}); 

client.on("ready", () => {

  console.log(`${client.user.tag} is now online!`)

  setInterval(() => {
    let list = ["you.", "TCA's Videos", "osu! Players", "#general chat", "the rickroll.", "the world burn.", "people suffer.", "TCA in the closet", "Yellowed dab", "TCA code.", "Reddit memes", "the tcaSMP", "TCA suffer.", "Dream's Videos", "Dream's Manhunt", "Klee dance", "for rule breakers", "Purpled", "Bedwars", "Midnight in the closet", "Minecraft videos", "the sun"];
    let randomStatus = list[Math.floor(Math.random() * list.length)];

    client.user.setActivity(randomStatus, { type: 'WATCHING' });
  }, 60000)

  const mongoose = require('mongoose')
  mongoose.connect(client.config.mongoSRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }).then(console.log('Successfully connected to MongoDB'))

})

client.on("message", async message => {

  if (!message.guild || message.author.bot) return
  if(message.content.includes('@here') || message.content.includes('@everyone')) return

  const data = await prefix.findOne({
    GuildID: message.guild.id
  })

  let serverPrefix = ''

  if(data) {

    serverPrefix = data.Prefix

  } else if(!data) {

    serverPrefix = client.config.prefix

  }

  
  client.color =
  message.guild.me.displayHexColor === "#000000"
    ? "#ffffff"
    : message.guild.me.displayHexColor;

  if(!message.content.startsWith(serverPrefix)) return
  const args = message.content.slice(serverPrefix.length).split(/ +/)
  const cmd = args.shift().toLowerCase()
  const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd))
  // if(command.wip === true && message.author.id !== config.ownerID) return message.reply('This command is currently a **W**ork **I**n **P**rogress.')

  if(command) command.execute(message, args, client)
  else message.delete()


  // if (command === "kick") {

  //   if (message.member.hasPermission("KICK_MEMBERS")) {

  //     const nomemberEmbed = new Discord.MessageEmbed()
  //       .setTitle('Oopsie Poopsie!')
  //       .setDescription(`You did not mention a member. Please mention somebody to kick.`)
  //       .setColor('YELLOW')
  //       .setColor(process.env.embedColor)
  //       .setFooter(process.env.embedFooterText, process.env.pfpImage)
  //       .setTimestamp()

  //     if (!member) message.channel.send(nomemberEmbed)
  //     else {
  //       member.kick().then(mem => {
  //         const kickedEmbed = new Discord.MessageEmbed()
  //           .setTitle('And there they goes!')
  //           .setDescription(`${mem.user.username} has succesfully been kicked from the server.`)
  //           .setColor(process.env.embedColor)
  //           .setFooter(process.env.embedFooterText, process.env.pfpImage)
  //           .setTimestamp()
  //         message.channel.send(kickedEmbed)
  //       })
  //     }
  //   } else {
  //     message.channel.send(nopermEmbed)
  //   }
  // }

  // if (command === "ban") {

  //   if (message.member.hasPermission("BAN_MEMBERS")) {

  //     const nomemberEmbed = new Discord.MessageEmbed()
  //       .setTitle('Oopsie Poopsie!')
  //       .setDescription(`You did not mention a member. Please mention somebody to ban.`)
  //       .setColor(process.env.embedColor)
  //       .setFooter(process.env.embedFooterText, process.env.pfpImage)
  //       .setTimestamp()

  //     var reason = args.slice(1).join(' ')
  //     if (!member) message.channel.send(nomemberEmbed)
  //     else {
  //       member
  //         .ban({
  //           reason: `${reason}`
  //         }).then(mem => {
  //           const bannedEmbed = new Discord.MessageEmbed()
  //             .setTitle('And there they go!')
  //             .setDescription(`${mem.user.username} has succesfully been banned from the server.`)
  //             .setColor(process.env.embedColor)
  //             .setFooter(process.env.embedFooterText, process.env.pfpImage)
  //             .setTimestamp()
  //           message.channel.send(bannedEmbed)
  //         })
  //     }
  //   } else {
  //     message.channel.send(nopermEmbed)
  //   }
  // }

  // if (command === "purge") {

  //   let argsPurge = message.content.split(" ").slice(1)
  //   let amountToPurge = argsPurge[0]

  //   const nointegerEmbed = new Discord.MessageEmbed()
  //     .setTitle('Oopsie Poopsie!')
  //     .setDescription(`You put a number that isn't an integer. Please put another number`)
  //     .setColor(process.env.embedColor)
  //     .setFooter(process.env.embedFooterText, process.env.pfpImage)
  //     .setTimestamp()

  //   const successfullypurgedEmbed = new Discord.MessageEmbed()
  //     .setTitle('Boop!')
  //     .setDescription(`I have successfully deleted ${amountToPurge} messages!`)
  //     .setColor(process.env.embedColor)
  //     .setFooter(process.env.embedFooterText, process.env.pfpImage)
  //     .setTimestamp()

  //   if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(nopermEmbed)
  //   if (isNaN(amountToPurge)) return message.channel.send(nointegerEmbed)

  //   message.delete()
  //   message.channel.bulkDelete(amountToPurge)
  //   message.channel.send(successfullypurgedEmbed).then(v => v.delete({ timeout: 4000 }))
  // }

  // if (command === "membercount") {

  //   let { guild } = message
  //   let memberCount = guild.memberCount

  //   const membersEmbed = new Discord.MessageEmbed()
  //     .setTitle('Members')
  //     .setDescription(memberCount)
  //     .setColor(process.env.embedColor)
  //     .setFooter(process.env.embedFooterText, process.env.pfpImage)
  //     .setTimestamp()
  //   message.channel.send(membersEmbed)

  // }

  // if (command === "say") {

  //   const nomessageEmbed = new Discord.MessageEmbed()
  //     .setTitle('Oopsie Poopsie!')
  //     .setDescription(`You ddin't tell me what to say. Please put a message that I can say!`)
  //     .setColor(process.env.embedColor)
  //     .setFooter(process.env.embedFooterText, process.env.pfpImage)
  //     .setTimestamp()

  //   let content = args.join(" ")
  //   message.delete()
  //   if (!content) return message.channel.send(nomessageEmbed).then(v => v.delete({ timeout: 4000 }))

  //   const personsaysEmbed = new Discord.MessageEmbed()
  //     .setTitle(`${message.author.username} says...`)
  //     .setDescription(content)
  //     .setColor(process.env.embedColor)
  //     .setFooter(process.env.embedFooterText, process.env.pfpImage)
  //     .setTimestamp()

  //   message.channel.send(personsaysEmbed)

  // }

  // if (command === "avatar") {

  //   const user = message.mentions.users.first() || message.author;
  //   const avatarEmbed = new Discord.MessageEmbed()
  //     .setColor(process.env.embedColor)
  //     .setFooter(process.env.embedFooterText, process.env.pfpImage)
  //     .setTimestamp()
  //     .setAuthor(user.tag, `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`)
  //     .setTitle('Avatar')
  //     .setImage(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`);

  //   message.channel.send(avatarEmbed)

  // }

  // if (command === "pfp") {

  //   const user = message.mentions.users.first() || message.author;
  //   const avatarEmbed = new Discord.MessageEmbed()
  //     .setColor(process.env.embedColor)
  //     .setFooter(process.env.embedFooterText, process.env.pfpImage)
  //     .setTimestamp()
  //     .setAuthor(user.tag, `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`)
  //     .setTitle('Avatar')
  //     .setImage(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`);

  //   message.channel.send(avatarEmbed)

  // }

  // if (command === "verify") {

  //   let role = message.guild.roles.cache.find(role => role.name === "Verified")

  //   if (!message.channel.id === 860033611898159139) return message.delete()
  //   if (message.guild.roles.cache.has(role)) return message.delete()

  //   if (role) {
  //     try {
  //       message.member.roles.add(role);
  //       message.delete().catch(err => console.log(err))
  //     }
  //     catch (err) {
  //       console.log(err)
  //     }
  //   }
  // }

  // if (command === "mute") {

  //   const nomuteroleEmbed = new Discord.MessageEmbed()
  //     .setTitle('Oopsie Poopsie!')
  //     .setDescription(`I couldn't find a Muted role. Please make a role in this server called "Muted".`)
  //     .setColor(process.env.embedColor)
  //     .setFooter(process.env.embedFooterText, process.env.pfpImage)
  //     .setTimestamp()

  //   const nomemberEmbed = new Discord.MessageEmbed()
  //     .setTitle('Oopsie Poopsie!')
  //     .setDescription(`You did not mention a member. Please mention somebody to mute.`)
  //     .setColor(process.env.embedColor)
  //     .setFooter(process.env.embedFooterText, process.env.pfpImage)
  //     .setTimestamp()

  //   const alreadymutedEmbed = new Discord.MessageEmbed()
  //     .setTitle('Oopsie Poopsie!')
  //     .setDescription(`That user is already muted. Pleaes mention a user that isn't muted!`)
  //     .setColor(process.env.embedColor)
  //     .setFooter(process.env.embedFooterText, process.env.pfpImage)
  //     .setTimestamp()

  //   if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(nopermEmbed)
  //   let role = message.guild.roles.cache.find(role => role.name === "Muted")
  //   let reason = message.content.split(" ").slice(2).join(" ")
  //   if (!reason) reason = "No reason provided."
  //   if (!role) return message.channel.send(nomuteroleEmbed)
  //   if (!member) return message.channel.send(nomemberEmbed)
  //   if (member.roles.cache.has(role.id)) return message.channel.send(alreadymutedEmbed)
  //   member.roles.add(role)
  //     .then(() => {
  //       const mutedEmbed = new Discord.MessageEmbed()
  //         .setTitle('Mouth = Zipped')
  //         .setDescription(`I have succesfully muted ${member} with reason: ${reason}`)
  //         .setColor(process.env.embedColor)
  //         .setFooter(process.env.embedFooterText, process.env.pfpImage)
  //         .setTimestamp()
  //       message.channel.send(mutedEmbed)
  //     })
  //     .catch(() => {
  //       message.channel.send(oopsiepoopsieEmbed)
  //     })
  // }

  // if (command === "unmute") {

  //   const nomuteroleEmbed = new Discord.MessageEmbed()
  //     .setTitle('Oopsie Poopsie!')
  //     .setDescription(`I couldn't find a Muted role. Please make a role in this server called "Muted".`)
  //     .setColor(process.env.embedColor)
  //     .setFooter(process.env.embedFooterText, process.env.pfpImage)
  //     .setTimestamp()

  //   const nomemberEmbed = new Discord.MessageEmbed()
  //     .setTitle('Oopsie Poopsie!')
  //     .setDescription(`You did not mention a member. Please mention somebody to unmute.`)
  //     .setColor(process.env.embedColor)
  //     .setFooter(process.env.embedFooterText, process.env.pfpImage)
  //     .setTimestamp()

  //   const alreadyunmutedEmbed = new Discord.MessageEmbed()
  //     .setTitle('Oopsie Poopsie!')
  //     .setDescription(`That user is not muted. Pleaes mention a user that is muted!`)
  //     .setColor(process.env.embedColor)
  //     .setFooter(process.env.embedFooterText, process.env.pfpImage)
  //     .setTimestamp()

  //   if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(nopermEmbed)
  //   let role = message.guild.roles.cache.find(role => role.name === "Muted")
  //   let reason = message.content.split(" ").slice(2).join(" ")
  //   if (!reason) reason = "No reason provided."
  //   if (!role) return message.channel.send(nomuteroleEmbed)
  //   if (!member) return message.channel.send(nomemberEmbed)
  //   if (!member.roles.cache.has(role.id)) return message.channel.send(alreadyunmutedEmbed)
  //   member.roles.remove(role)
  //     .then(() => {
  //       const mutedEmbed = new Discord.MessageEmbed()
  //         .setTitle('Mouth = Unzipped')
  //         .setDescription(`I have succesfully unmuted ${member} with reason: ${reason}`)
  //         .setColor(process.env.embedColor)
  //         .setFooter(process.env.embedFooterText, process.env.pfpImage)
  //         .setTimestamp()
  //       message.channel.send(mutedEmbed)
  //     })
  //     .catch(() => {
  //       message.channel.send(oopsiepoopsieEmbed)
  //     })
  // }
})

client.login(process.env.token)