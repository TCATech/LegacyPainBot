const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "ban",
  description: "Bans a member from the server.",
  usage: "<@user or user ID> [reason]",
  userPerms: ["BAN_MEMBERS"],
  botPerms: ["BAN_MEMBERS"],
  async execute(message, args, client) {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.find((user) => user.id === args[0]);
    var reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason specified.";

    if (!args[0]) return message.reply("Please specify a member to ban.");
    if (!member)
      return message.reply("That member seems to not be in this server.");
    if (
      message.member.roles.highest.position <= member.roles.highest.permission
    )
      return message.reply("You are not allowed to ban that user.");

    try {
      await member
        .ban({
          reason: `${reason}`,
        })
        .then((mem) => {
          const embed = new MessageEmbed()
            .setTitle("And there they go!")
            .setDescription(
              `${mem.user.username} has succesfully been banned from the server.`
            )
            .setColor(client.color)
            .setFooter(
              client.user.username,
              client.user.displayAvatarURL({ dynamic: true })
            )
            .setTimestamp();
          message.channel.send(embed);
        });
    } catch (err) {
      console.log(err);
    }
  },
};
