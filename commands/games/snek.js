const Discord = require("discord.js");
const { Snake } = require("weky");

module.exports = {
  name: "snek",
  aliases: ["snake"],
  description: "Just your regular old snake, but in Discord!",
  async execute(message, args, client) {
    await Snake({
      message: message,
      embed: {
        title: "Snake",
        color: client.color,
        footer: client.user.username,
        footerIcon: client.user.displayAvatarURL({ dynamic: true }),
      },
      emojis: {
        empty: "⬛",
        snakeBody: "🟢",
        food: "🍎",
        up: "⬆️",
        right: "⬅️",
        down: "⬇️",
        left: "➡️",
      },
    });
  },
};
