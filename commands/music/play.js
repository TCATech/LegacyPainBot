const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "play",
    description: "Plays your favorite song in a VC!",
    usage: "<song name or URL>",
    aliases: ["p"],
    botPerms: ['SPEAK', 'CONNECT'],
    async execute (message, args, client) {
      const voiceChannel = message.member.voice.channel
      if (!message.member.voice.channel) {
        const playError = new MessageEmbed()
        .setTitle('Oopsie Poopsie!')
        .setDescription("You're currently not in a voice channel. Please join one!")
        .setColor(client.color)
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        return message.channel.send(playError)
      }

      let songName = args.slice(0).join(" ")
      if (!songName) {
        const playError2 = new MessageEmbed()
        .setTitle('Oopsie Poopsie!')
        .setDescription("You didn't provide a song name or URL. Please do so!")
        .setColor(client.color)
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        return message.channel.send(playError2)
      }

      try {
        voiceChannel.join().then(connection => {
          connection.voice.setSelfDeaf(true)
        })
        client.distube.play(message, songName)
      } catch (err) {
        message.channel.send(`There was an error trying to play that song!\nError: ${client.error(err)}`)
      }
  },
};
