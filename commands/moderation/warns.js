const warns = require('../../models/warns')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'warns',
    wip: true,
    async execute(message, args, client) {
        const user = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.id === args[0])
        let reason = args.slice(1).join(" ")
        if(!user) return message.reply('Please specify a member to warn.')
        warns.find({
            Guild: message.guild.id,
            User: user.id
        }, async (err, data) => {
            if(err) console.log(err)
            if(!data.length) return message.reply(`${user.user.tag}'s warn list is squeaky clean!`)
            message.channel.send(
                new MessageEmbed()
                .setTitle(`${user.user.tag}'s Warns`)
                .setDescription(data.map(d => {
                    return d.Warns.map((w, i) => `${i++} - Moderator: ${message.guild.members.cache.find(m => m.user.id === w.Moderator).user.tag} | Reason: ${w.Reason}`).join('\n')
                }))
                .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor(client.color)
            )
        })
    }
}