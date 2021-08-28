const { cat } = require("nampis");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "cat",
  description: "Fetches you a cute cat.",
  async execute(message, args, client) {
    return message.channel.send(
      new MessageEmbed()
        .setTitle("🐱 Meow! 🐱")
        .setImage(await cat())
        .setFooter(
          client.user.username,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setColor(client.color)
        .setTimestamp()
    );
  },
};
