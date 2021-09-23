const { MessageEmbed } = require('discord.js')
const emojis = require('../../utils/emojis.json')
const moment = require('moment')

const statuses = {
    online: `${emojis.online} \`Online\``,
    idle: `${emojis.idle} \`Idle\``,
    offline: `${emojis.offline} \`Offline\``,
    dnd: `${emojis.dnd} \`Do Not Disturb\``
}

const flags = {
    DISCORD_EMPLOYEE: `${emojis.discord_employee} \`Discord Employee\``,
    DISCORD_PARTNER: `${emojis.discord_partner} \`Partnered Server Owner\``,
    BUGHUNTER_LEVEL_1: `${emojis.bughunter_level_1} \`Bug Hunter (Level 1)\``,
    BUGHUNTER_LEVEL_2: `${emojis.bughunter_level_2} \`Bug Hunter (Level 2)\``,
    HYPESQUAD_EVENTS: `${emojis.hypesquad_events} \`HypeSquad Events\``,
    HOUSE_BRAVERY: `${emojis.house_bravery} \`House of Bravery\``,
    HOUSE_BRILLIANCE: `${emojis.house_brilliance} \`House of Brilliance\``,
    HOUSE_BALANCE: `${emojis.house_balance} \`House of Balance\``,
    EARLY_SUPPORTER: `${emojis.early_supporter} \`Early Supporter\``,
    TEAM_USER: 'Team User',
    SYSTEM: 'System',
    VERIFIED_BOT: `${emojis.verified_bot} \`Verified Bot\``,
    VERIFIED_DEVELOPER: `${emojis.verified_developer} \`Early Verified Bot Developer\``
}

module.exports = {
    name: 'userinfo',
    aliases: ['whois', 'user', 'ui'],
    description: 'Sends some info about a specific user, or even yourself.',
    usage: '<@user or user ID>',
    async execute(message, args, client) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member

        const userFlags = (await member.user.fetchFlags()).toArray()

        const activities = [];

        for (const activity of member.presence.activities.values()) {
            switch (activity.type) {
              case 'PLAYING':
                activities.push(`Playing **${activity.name}**`);
                break;
              case 'LISTENING':
                if (member.user.bot) activities.push(`Listening to **${activity.name}**`);
                else activities.push(`Listening to **${activity.details}** by **${activity.state}**`);
                break;
              case 'WATCHING':
                activities.push(`Watching **${activity.name}**`);
                break;
              case 'STREAMING':
                activities.push(`Streaming **${activity.name}**`);
                break;
            }
        }

        const embed = new MessageEmbed()
        .setTitle(`${member.user.username}'s Information`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .addField('Username', member.user.username, true)
        .addField('Discriminator', `\`#${member.user.discriminator}\``, true)
        .addField('ID', `\`${member.id}\``, true)
        .addField('Status', statuses[member.presence.status], true)
        .addField('Bot', member.user.bot ? emojis.toggle_on : emojis.toggle_off, true)
        .addField('Highest Role', member.roles.highest, true)
        .addField('Joined Discord on', moment(member.user.createdAt).format('MMMM D, YYYY'), true)
        .addField('Joined server on', moment(member.joinedAt).format('MMMM D, YYYY'), true)
        .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(client.color)
        if(activities.length > 0) embed.addField('Activity', activities.join('\n'))
        if(userFlags.length > 0) embed.addField('Badges', userFlags.map(flag => flags[flag]).join('\n'))

        message.channel.send(embed)
    }
}