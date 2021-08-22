const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

const nopermEmbed = new MessageEmbed()
.setTitle('Oopsie Poopsie!')
.setDescription(`You don't have permission to use that command as you are not a staff member.`)
.setColor(config.embedColor)
.setFooter(config.embedFooterText, config.pfpImage)
.setTimestamp()

module.exports = {
    name: 'unban',
    description: 'Unbans a member from the server.',
    usage: '<member id>',
    async execute(message, args, client) {
        if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(nopermEmbed)

        const userID = args[0]
        let reason = args.slice(1).join(' ')
        if(!reason) reason = 'No reason specified.'

        if(!userID) return message.reply('Please specify a member to unban.')
        if(isNaN(userID)) return message.reply('That ID is not even a user ID. Why are you trying to unban him then?')

        try {
            message.guild.members.unban(userID).then(() => {
                const embed = new MessageEmbed()
                .setTitle('And here they come...')
                .setDescription(`Succesfully unbanned the user with the ID of ${args[0]}.`)
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