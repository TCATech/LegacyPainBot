const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "queue",
  description: "Shows you what songs are currently playing.",
  aliases: ["q", "list"],
  async execute(message, args, client) {
    let queue = client.distube.getQueue(message);
    if (!queue) {
      const queueError = new MessageEmbed()
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
      return message.channel.send(queueError);
    }
    let q = queue.songs
      .map((song, i) => {
        return `${i === 0 ? "Now Playing:" : `${i}.`} ${song.name} - \`${
          song.formattedDuration
        }\``;
      })
      .join("\n");

    const embed = new MessageEmbed()
      .setTitle(`${message.guild.name}'s Queue`)
      .setDescription(q)
      .setColor(client.color)
      .setFooter(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp();

    message.channel.send(embed);
  },
};
