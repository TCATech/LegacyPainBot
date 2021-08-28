const { words } = require("../../ftwords");
const { FastType } = require("weky");

module.exports = {
  name: "fasttype",
  description: "Try typing a simple word as fast as you can!",
  aliases: ["ft", "fast", "type"],
  async execute(message, args, client) {
    const word =
      args.join(" ") || words[Math.floor(Math.random() * words.length)];
    await FastType({
      message: message,
      embed: {
        title: "FastType",
        description: `**${message.author}** has **{{time}}** to type the word below.`,
        color: client.color,
        footer: client.user.username,
        footerIcon: client.user.displayAvatarURL({ dynamic: true }),
        timestamp: true,
      },
      sentence: word,
      winMessage: `GG, **${message.author}**! You had a WPM of **{{wpm}}** and finished in **{{time}}**.`,
      loseMessage: `Better luck next time, **${message.author}**!`,
      cancelMessage: "You ended the game!",
      time: 10 * 1000,
      buttonText: "Cancel",
      othersMessage: "Only <@{{author}}> can use the cancel button!",
    });
  },
};
