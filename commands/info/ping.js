const { MessageEmbed } = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'ping',
    description: 'Pong!',    
    async execute(message, args, client) {
        message.channel.send('Pinging...').then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp

            const embed = new MessageEmbed()
            .setTitle(':ping_pong: Pong!')
            .addFields({ name: "Bot Latency", value: `${ping}ms`, inline: true })
            .addFields({ name: "API Latency", value: `${client.ws.ping}ms`, inline: true })
            .addFields({ name: "Uptime", value: `${ms(client.uptime)}`})
            .setColor(client.color)
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            resultMessage.edit("** **", { embed })
        })
    }
}