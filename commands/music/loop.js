const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'loop',
    description: "Toggles loop.",
    aliases: ['loops', 'repeat'],
    async execute(message, args, client) {
        if (!message.member.voice.channel) {
            const loopError = new MessageEmbed()
            .setTitle('Oopsie Poopsie!')
            .setDescription("You're currently not in a voice channel. Please join one!")
            .setColor(client.color)
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            return message.channel.send(loopError)
        }
        if(!client.distube.isPlaying(message)) {
            const loopError2 = new MessageEmbed()
            .setTitle('Oopsie Poopsie!')
            .setDescription("There is currently nothing playing. Why would you even do this to yourself?")
            .setColor(client.color)
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            return message.channel.send(loopError2)
        }

        let mode = null

        switch (args[0]) {
            case "off":
              mode = 0
              break
            case "song":
              mode = 1
              break
            case "queue":
              mode = 2
              break
          }


        mode = client.distube.setRepeatMode(message, mode) 
        mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";
        const embed = new MessageEmbed()
        .setTitle('Here we go.')
        .setDescription(`Set the loop to \`${mode}\`.`)
        .setColor(client.color)
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        message.channel.send(embed)
    }
}