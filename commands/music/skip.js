const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'skip',
    description: "Skips the current song.",
    async execute(message, args, client) {
        if (!message.member.voice.channel) {
            const skipError = new MessageEmbed()
            .setTitle('Oopsie Poopsie!')
            .setDescription("You're currently not in a voice channel. Please join one!")
            .setColor(client.color)
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            return message.channel.send(skipError)
        }
        if(!client.distube.isPlaying(message)) {
            const skipError2 = new MessageEmbed()
            .setTitle('Oopsie Poopsie!')
            .setDescription("There is currently nothing playing. Why would you even do this to yourself?")
            .setColor(client.color)
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            return message.channel.send(skipError2)
        }

        let queue = client.distube.skip(message)

        const embed = new MessageEmbed()
        .setTitle('NEEEEEEEEEEEXT!')
        .setDescription(`Song has successfully been skipped`)
        .setColor(client.color)
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()

        message.channel.send(embed)
    }
}