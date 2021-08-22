const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

module.exports = {
    name: 'ban',
    description: 'Bans a member from the server.',
    usage: '<@member or member id>',
    async execute(message, args, client) {
        if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(client.noperm)

        const member = message.mentions.members.first() || message.guild.members.cache.find(user => user.id === args[0])
        let reason = args.slice(1).join(' ')
        if(!reason) reason = 'No reason specified.'

        if(!args[0]) return message.reply('Please specify a member to ban.')
        if(!member) return message.reply('That member seems to not be in this server.')

        try {
            await member.ban(reason).then(() => {
                const embed = new MessageEmbed()
                .setTitle('And there they go!')
                .setDescription(`${member.user.username} has succesfully been banned from the server.`)
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