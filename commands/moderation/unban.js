const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "unban",
  description: "Unbans a member from the server.",
  usage: "<member id>",
  userPerms: ["BAN_MEMBERS"],
  botPerms: ["BAN_MEMBERS"],
  async execute(message, args, client) {
    const userID = args[0];
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason specified.";

    if (!userID) return message.reply("Please specify a member to unban.");
    if (isNaN(userID))
      return message.reply(
        "That ID is not even a user ID. Why are you trying to unban him then?"
      );

    try {
      message.guild.members.unban(userID).then(() => {
        const embed = new MessageEmbed()
          .setTitle("And here they come...")
          .setDescription(
            `Succesfully unbanned the user with the ID of ${args[0]}.`
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
