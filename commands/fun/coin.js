const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "coin",
  aliases: ["cointoss", "coinflip", "flip"],
  description: "Flips a coin for you.",
  async execute(message, args, client) {
    const n = Math.floor(Math.random() * 2);
    let result;
    if (n === 1) result = "heads";
    else result = "tails";
    const embed = new MessageEmbed()
      .setTitle(":coin:  Coin Flip  :coin:")
      .setDescription(
        `I flipped a coin for you, ${message.author}. It was **${result}**!`
      )
      .setFooter(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp()
      .setColor(client.color);
    message.channel.send(embed);
  },
};
