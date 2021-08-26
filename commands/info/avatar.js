const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    aliases: ['pfp'],
    description: 'Displays a member\'s avatar.',
    usage: '<member (optional)>',
    cooldown: '10',
    async execute(message, args, client) {
        const user = message.mentions.users.first() || message.author
        const embed = new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setAuthor(user.tag, `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`)
        .setTitle('Avatar')
        .setImage(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`)

        message.channel.send(embed)
    }
}