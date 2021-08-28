const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "resume",
  description: "Resumes the song.",
  aliases: ["resume", "unpause"],
  async execute(message, args, client) {
    if (!message.member.voice.channel) {
      const resumeError = new MessageEmbed()
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
      return message.channel.send(resumeError);
    }
    let queue = client.distube.getQueue(message);
    if (!queue) {
      const queueError = new MessageEmbed()
        .setTitle("Oopsie Poopsie!")
        .setDescription("Nothing is currently playing in this server.")
        .setColor(client.color)
        .setFooter(
          client.user.username,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp();
      return message.channel.send(queueError);
    }
    if (!client.distube.isPaused(message)) {
      const resumeError3 = new MessageEmbed()
        .setTitle("Oopsie Poopsie!")
        .setDescription(
          `The song is currently not paused. Try doing \`${client.prefix}pause\`.`
        )
        .setColor(client.color)
        .setFooter(
          client.user.username,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp();
      return message.channel.send(resumeError3);
    }

    client.distube.resume(message);
    const embed = new MessageEmbed()
      .setTitle("*record scratch effect*")
      .setDescription("Successfully resumed the current song.")
      .setColor(client.color)
      .setFooter(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp();
    message.channel.send(embed);
  },
};
