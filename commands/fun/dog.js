const { dog } = require("nampis");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "dog",
  description: "Fetches you a cute dog.",
  async execute(message, args, client) {
    return message.channel.send(
      new MessageEmbed()
        .setTitle("🐶 Woof! 🐶")
        .setImage(await dog())
        .setFooter(
          client.user.username,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setColor(client.color)
        .setTimestamp()
    );
  },
};
