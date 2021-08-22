const { MessageEmbed } = require('discord.js')
const { readdirSync } = require("fs")

const prefixModel = require('../../models/prefix')

module.exports = {
    name: 'help',
    description: 'Get more info about specific commands.',
    async execute(message, args, client) {
        const db = await prefixModel.findOne({
            GuildID: message.guild.id
        })

        let prefix = ''
        if(db) {
          prefix = db.Prefix
        } else {
          prefix = client.config.prefix
        }

        if (!args[0]) {
            let categories = [];

            const diremotes = {
              info: "📰",
              moderation: "🔨",
              utils: "⚙",
              wip: '👨‍💻',
              warns: '📢',
              suggestions: '📊',
              fun: '⚽',
              roles: '📛',
              games: '🎮'
            }
            readdirSync("./commands/").forEach((dir) => {
              const dirName = `${diremotes[dir]} ${dir.toUpperCase()}`
              const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                file.endsWith(".js")
              );

              const cmds = commands.filter((command) => {
                let file = require(`../../commands/${dir}/${command}`);

                return !file.hidden;
              }).map((command) => {
                let file = require(`../../commands/${dir}/${command}`);
      
                if (!file.name) return "No command name.";
      
                let name = file.name.replace(".js", "");
      
                return `\`${name}\``;
              });
      
              let data = new Object();
      
              data = {
                name: dirName,
                value: cmds.length === 0 ? "In progress." : cmds.join(" "),
              };
      
              categories.push(data);
            });
      
            const embed = new MessageEmbed()
              .setTitle("📬 Need help? Here are all of my commands:")
              .addFields(categories)
              .setDescription(
                `Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help ban\`.`
              )
              .setColor(client.color)
              .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
              .setTimestamp()
            return message.channel.send(embed);
        } else {
            const command =
              client.commands.get(args[0].toLowerCase()) ||
              client.commands.find(
                (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
              );
      
            if (!command) {
              const embed = new MessageEmbed()
                .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
                .setColor("FF0000");
              return message.channel.send(embed);
            }
      
            const embed = new MessageEmbed()
              .setTitle("Command info")
              .addField(
                "Command:",
                command.name ? `\`${prefix}${command.name}\`` : "No name for this command.",
              )
              .addField(
                "Description:",
                command.description
                  ? command.description
                  : "No description for this command.",
              )
              .addField(
                "Aliases:",
                command.aliases
                  ? `\`${command.aliases.join("` `")}\``
                  : "No aliases for this command.",
              )
              .addField(
                "Usage:",
                command.usage
                  ? `\`${prefix}${command.name} ${command.usage}\``
                  : `\`${prefix}${command.name}\``,
              )
              .setColor(message.guild.me.displayColor)
              .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
              .setTimestamp()
            return message.channel.send(embed);
          }
    }
}