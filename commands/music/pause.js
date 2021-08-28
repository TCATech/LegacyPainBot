const { MessageEmbed, MessageManager } = require("discord.js");

module.exports = {
  name: "pause",
  description: "Pauses the song.",
  async execute(message, args, client) {
    if (!message.member.voice.channel) {
      const pauseError = new MessageEmbed()
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
      return message.channel.send(pauseError);
    }
    if (!client.distube.isPlaying(message)) {
      const pauseError2 = new MessageEmbed()
        .setTitle("Oopsie Poopsie!")
        .setDescription("Nothing is currently playing in this server.")
        .setColor(client.color)
        .setFooter(
          client.user.username,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp();
      return message.channel.send(pauseError2);
    }
    if (client.distube.isPaused(message)) {
      const pauseError3 = new MessageEmbed()
        .setTitle("Oopsie Poopsie!")
        .setDescription(
          `The song is currently paused. Try doing \`${client.prefix}resume\`.`
        )
        .setColor(client.color)
        .setFooter(
          client.user.username,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp();
      return message.channel.send(pauseError3);
    }

    client.distube.pause(message);
    const embed = new MessageEmbed()
      .setTitle("*record scratch effect*")
      .setDescription("Successfully paused the current song.")
      .setColor(client.color)
      .setFooter(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp();
    message.channel.send(embed);
  },
};
