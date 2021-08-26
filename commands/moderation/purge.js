const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

module.exports = {
    name: 'purge',
    description: 'Bulk deletes the amount of messages that you specify.',
    usage: '<amount of messages>',
    userPerms: ['MANAGE_MESSAGES'],
    botPerms: ['MANAGE_MESSAGES'],
    async execute(message, args, client) {
        const amountToPurge = args[0]

        const embed = new MessageEmbed()
        .setTitle('Boop!')
        .setDescription(`I have successfully deleted ${amountToPurge} messages!`)
        .setColor(client.color)
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(client.noperm)
        if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send(
            new MessageEmbed()
            .setTitle('Oopsie Poopsie!')
            .setDescription('I don\'t have permission to delete messages in this server. Please give me permission to do that!')
            .setColor(client.color)
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        )

        if(isNaN(amountToPurge)) return message.reply('Please specify an actual number.')

        message.delete()
        message.channel.bulkDelete(amountToPurge)
        message.channel.send(embed).then(v => v.delete({timeout: 4000}))
    }
}