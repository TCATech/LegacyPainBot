const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "stop",
  description: "Stops the current song.",
  async execute(message, args, client) {
    if (!message.member.voice.channel) {
      const stopError = new MessageEmbed()
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
      return message.channel.send(stopError);
    }
    if (!client.distube.isPlaying(message)) {
      const stopError2 = new MessageEmbed()
        .setTitle("Oopsie Poopsie!")
        .setDescription(
          "There is currently nothing playing. Why would you even do this to yourself?"
        )
        .setColor(client.color)
        .setFooter(
          client.user.username,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp();
      return message.channel.send(stopError2);
    }
    client.distube.stop(message);
    const embed = new MessageEmbed()
      .setTitle("*record scratch effect*")
      .setDescription("Song has successfully been stopped")
      .setColor(client.color)
      .setFooter(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp();

    message.channel.send(embed);
  },
};
