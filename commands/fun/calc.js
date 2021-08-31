const { Calculator } = require("weky");

module.exports = {
  name: "calc",
  description: "Calculate some math problems in Discord!",
  aliases: ["calculator"],
  async execute(message, args, client) {
    await Calculator({
      message: message,
      embed: {
        title: "Calculator",
        color: client.color,
        footer: client.user.username,
        footerIcon: client.user.displayAvatarURL({ dynamic: true }),
        timestamp: true,
      },
      disabledQuery: "Calculator is disabled!",
      invalidQuery: "The provided equation is invalid!",
      othersMessage: "Only <@{{author}}> can use the calculator!",
    });
  },
};
