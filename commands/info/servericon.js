let { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'servericon',
    description: 'Displays the server icon.',
    async execute(message, args, client) {
        const embed = new MessageEmbed()
        .setTitle(`${message.guild.name}'s Icon`)
        .setImage(message.guild.iconURL({ size: 256 }))
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setColor(client.color)
        .setTimestamp()

        message.channel.send(embed)
    }
}