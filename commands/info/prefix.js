const prefixModel = require('../../models/prefix')

module.exports = {
    name: 'prefix',
    description: 'The prefix of the bot.',
    async execute(message, args, client) {
        const data = await prefixModel.findOne({
            GuildID: message.guild.id
        })

        if(!args[0]) return message.reply('You must provide a **new prefix**!');
        if(args[0].length > 5) return message.reply('Your new prefix must be under \`5\` characters!')
        if(data) {
            await prefixModel.findOneAndRemove({
                GuildID: message.guild.id
            })

            if(args[0] === client.config.prefix || args[0] === 'reset') {
                message.reply(`PainBot's prefix is now back to the default which is \`${client.config.prefix}\`.`)

                let newData = new prefixModel({
                    Prefix: client.config.prefix,
                    GuildID: message.guild.id
                })
                return newData.save()
            }

            message.reply(`PainBot's prefix is now \`${args[0]}\`.`)

            let newData = new prefixModel({
                Prefix: args[0],
                GuildID: message.guild.id
            })
            newData.save()
        } else if(!data) {
            message.reply(`PainBot's prefix is now \`${args[0]}\`.`)
            let newData = new prefixModel({
                Prefix: args[0],
                GuildID: message.guild.id
            })
            newData.save()
        }
    }
}