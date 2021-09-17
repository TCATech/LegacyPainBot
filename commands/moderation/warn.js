const warns = require("../../models/warns");
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "warn",
  wip: true,
  async execute(message, args, client) {
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.find((m) => m.user.id === args[0]);
    let reason = args.slice(1).join(" ");
    if (!user) return message.reply("Please specify a member to warn.");
    if (!reason) reason = "No reason specified.";
    warns.findOne(
      {
        Guild: message.guild.id,
        User: user.id,
      },
      async (err, data) => {
        if (err) console.log(err);
        if (!data) {
          const newWarns = new warns({
            User: user.id,
            Guild: message.guild.id,
            Warns: [
              {
                Moderator: message.author.id,
                Reason: reason,
              },
            ],
          });

          newWarns.save();
          message.channel.send(
            new MessageEmbed()
            .setTitle(':warning: Wee woo! :warning:')
            .setDescription(`${user.user.username} has successfully been warned. They now have 1 warn.`)
            .addField('Reason', reason)
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setColor(client.color)
            .setTimestamp()
          );
        } else {
          data.Warns.unshift({
            Moderator: message.author.id,
            Reason: reason,
          });
          data.save();
          message.channel.send(
            new MessageEmbed()
            .setTitle(':warning: Wee woo! :warning:')
            .setDescription(`${user.user.username} has successfully been warned. They now have ${data.Warns.length} warn.`)
            .addField('Reason', reason)
            .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            .setColor(client.color)
            .setTimestamp()
          );
        }
      }
    );
  },
};
