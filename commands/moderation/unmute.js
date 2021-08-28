const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "unmute",
  description: "Unmutes the mentioned member.",
  usage: "<@member or member id> <how long to mute the member (optional)>",
  userPerms: ["MANAGE_MEMBERS"],
  botPerms: ["MANAGE_MEMBERS"],
  async execute(message, args, client) {
    const target =
      message.mentions.members.first() ||
      message.guild.roles.cache.get(args[0]);
    const role = message.guild.roles.cache.find(
      (role) => role.name === "Muted"
    );

    if (!target)
      return message.reply(
        "You did not mention a member. Please mention somebody to mute."
      );
    if (!target.roles.cache.has(role.id))
      return message.reply(
        "That user is not muted. Please mention a user that is muted!"
      );
    if (!role)
      return message.reply(
        "Seems like this server doesn'nt have a muted role. Please make a role called `Muted`."
      );
    if (
      message.member.roles.highest.position <= member.roles.highest.permission
    )
      return message.reply("You are not allowed to mute that user.");

    target.roles.add(role);
    message.channel.send(
      new MessageEmbed()
        .setTitle("Oh great he's screaming again.")
        .setDescription(`${target} has successfully been unmuted.`)
        .setFooter(config.embedFooter, config.pfpImage)
        .setColor(config.embedColor)
        .setTimestamp()
    );
  },
};
