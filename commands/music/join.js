module.exports = {
    name: 'join',
    description: "Joins a VC",
    aliases: ['summon', 'enter'],
    async execute(message, args, client) {

        const voiceChannel = message.member.voice.channel

        if (!voiceChannel) {
            const joinError = new MessageEmbed()
            .setTitle('Oopsie Poopsie!')
            .setDescription("You're currently not in a voice channel. Please join one!")
            .setColor(client.color)
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            return message.channel.send(joinError)
        }

        try {
            await voiceChannel.join().then(connection => {
                connection.voice.setSelfDeaf(true)
            })
            message.react('👋')
        } catch(error) {
            console.log(error)
            return message.channel.send(`There was an error trying to disconnect from the VC!\n${client.error(error)}`)
        }
    }
}