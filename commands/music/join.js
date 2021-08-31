module.exports = {
  name: "join",
  description: "Makes the bot join the voice channel that you are in.",
  aliases: ["summon", "enter"],
  botPerms: ["CONNECT"],
  async execute(message, args, client) {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
      const joinError = new MessageEmbed()
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
      return message.channel.send(joinError);
    }

    try {
      await voiceChannel.join().then((connection) => {
        connection.voice.setSelfDeaf(true);
      });
      message.react("👋");
    } catch (error) {
      console.log(error);
      return message.channel.send(
        `There was an error trying to join your VC!\n${client.error(error)}`
      );
    }
  },
};
