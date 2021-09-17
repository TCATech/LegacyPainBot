module.exports = {
    name: 'delwarn',
    wip: true,
    async execute(message, args, client) {
        return message.delete()
    }
}