const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "volume",
  description: "Changes Volume",
  usage: "<number from 1 - 100>",
  aliases: ["vol"],
  async execute(message, args, client) {
    if (!message.member.voice.channel) {
      const volumeError = new MessageEmbed()
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
      return message.channel.send(volumeError);
    }
    if (!client.distube.isPlaying(message)) {
      const volumeError2 = new MessageEmbed()
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
      return message.channel.send(volumeError2);
    }
    let volume = parseInt(args[0]);
    if (isNaN(args[0])) {
      const volumeError3 = new MessageEmbed()
        .setTitle("Oopsie Poopsie!")
        .setDescription(
          "You didn't enter a valid number between 1 - 100. Please do so!"
        )
        .setColor(client.color)
        .setFooter(
          client.user.username,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp();
      return message.channel.send(volumeError3);
    }
    if (args[0] > 100) {
      const volumeError4 = new MessageEmbed()
        .setTitle("Oopsie Poopsie!")
        .setDescription(
          "You didn't enter a valid number between 1 - 100. Please do so!"
        )
        .setColor(client.color)
        .setFooter(
          client.user.username,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp();
      return message.channel.send(volumeError4);
    }

    client.distube.setVolume(message, volume);
    const embed = new MessageEmbed()
      .setTitle("earrape incoming...")
      .setDescription(`Volume has been set to \`${volume}%\``)
      .setColor(client.color)
      .setFooter(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp();

    message.channel.send(embed);
  },
};
