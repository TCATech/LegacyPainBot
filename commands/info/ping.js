const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'ping',
    description: 'pong!',
    async execute(message, args, client) {
        const timeTaken = Date.now() - message.createdTimestamp;
        const embed = new MessageEmbed()
        .setTitle(':ping_pong: Pong!')
        .setDescription(`This message had a latency of **${timeTaken}ms**.`)
        .setColor(message.guild.me.displayColor)
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        message.channel.send(embed)
    }
}