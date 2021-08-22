const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'kick',
    description: 'Kicks a member from the server.',
    usage: '<@member or member id>',
    async execute(message, args, client) {
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(client.noperm)

        const member = message.mentions.members.first() || message.guild.members.cache.find(user => user.id === args[0])
        let reason = args.slice(1).join(' ')
        if(!reason) reason = 'No reason specified.'

        if(!args[0]) return message.reply('Please specify a member to kick.')
        if(!member) return message.reply('That member seems to not be in this server.')

        try {
            await member.kick(reason).then(() => {
                const embed = new MessageEmbed()
                .setTitle('And there they go!')
                .setDescription(`${member.user.username} has succesfully been kicked from the server.`)
                .setColor(message.guild.me.displayColor)
                .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                message.channel.send(embed)
            })
        } catch (err) {
            console.log(err)
        }
    }
}