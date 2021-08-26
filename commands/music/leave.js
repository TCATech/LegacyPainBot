module.exports = {
  name: "leave",
  description: "Leaves the VC.",
  aliases: ["dc", "disconnect", "exit"],
  async execute(message, args, client) {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) {
      const leaveError = new MessageEmbed()
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
      return message.channel.send(leaveError);
    }

    try {
      await voiceChannel.leave();
      message.react("👋");
    } catch (error) {
      console.log(error);
      return message.channel.send(
        `There was an error trying to disconnect from the VC!\n${client.error(
          error
        )}`
      );
    }
  },
};
