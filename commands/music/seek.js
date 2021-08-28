const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "seek",
  description: "Seeks through the current song.",
  usage: "<time to seek in seconds>",
  async execute(message, args, client) {
    if (!message.member.voice.channel) {
      const seekError = new MessageEmbed()
        .setTitle("Oopsie Poopsie!")
        .setDescription(
          "You're currently not in a voice channel. Please join one!"
        )
        .setColor(client.color)
        .setFooter(
          client.user.username,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp();
      return message.channel.send(seekError);
    }
    if (!client.distube.isPlaying(message)) {
      const seekError2 = new MessageEmbed()
        .setTitle("Oopsie Poopsie!")
        .setDescription("Nothing is currently playing in this server.")
        .setColor(client.color)
        .setFooter(
          client.user.username,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp();
      return message.channel.send(seekError2);
    }
    if (isNaN(args[0])) {
      const seekError3 = new MessageEmbed()
        .setTitle("Oopsie Poopsie!")
        .setDescription("Please enter a valid number of seconds to seek.")
        .setColor(client.color)
        .setFooter(
          client.user.username,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp();
      return message.channel.send(seekError3);
    }

    const seekAmount = args[0] * 1000;

    client.distube.seek(message, seekAmount);
    message.react("✔️");
  },
};
