const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "mute",
  description: "Mutes the mentioned member.",
  usage: "<@member or member id> <how long to mute the member (optional)>",
  async execute(message, args, client) {
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message.channel.send(client.noperm);
    if (!message.guild.me.hasPermission(["MANAGE_MEMBERS", "MANAGE_ROLES"]))
      return message.channel.send(
        new MessageEmbed()
          .setTitle("Oopsie Poopsie!")
          .setDescription(
            "I don't have permission to give people the `Muted` role in this server. Please give me permission to do that!"
          )
          .setColor(client.color)
          .setFooter(
            client.user.username,
            client.user.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp()
      );

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
    if (target.roles.cache.has(role.id))
      return message.reply(
        "That user is already muted. Please mention a user that isn't muted!"
      );
    if (!role)
      return message.reply(
        "Seems like this server doesn'nt have a muted role. Please make a role called `Muted`."
      );
    if (
      message.member.roles.highest.position <= member.roles.highest.permission
    )
      return message.reply("You are not allowed to mute that user.");

    if (!args[1]) {
      target.roles.add(role);
      message.channel.send(
        new MessageEmbed()
          .setTitle("Aaand now he's quiet.")
          .setDescription(`${target} has been permanently muted.`)
          .setFooter(config.embedFooter, config.pfpImage)
          .setColor(config.embedColor)
          .setTimestamp()
      );
    } else {
      target.roles.add(role);
      message.channel.send(
        new MessageEmbed()
          .setTitle("Aaand now he's quiet.")
          .setDescription(`${target} has been muted for ${ms(ms(args[1]))}.`)
          .setFooter(config.embedFooter, config.pfpImage)
          .setColor(config.embedColor)
          .setTimestamp()
      );
      setTimeout(function () {
        target.roles.remove(role);
      }, ms(args[1]));
    }
  },
};
