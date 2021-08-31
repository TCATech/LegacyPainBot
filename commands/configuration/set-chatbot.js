const Schema = require("../../models/chatbot");

module.exports = {
  name: "set-chatbot",
  description: "Sets the chatbot channel so you can talk with PainBot!",
  usage: "[#channel]",
  userPerms: ["MANAGE_GUILD"],
  async execute(message, args, client) {
    const channel = message.mentions.channels.first();
    Schema.findOne(
      {
        Guild: message.guild.id,
      },
      async (err, data) => {
        if (err) console.log(err);
        if (data) data.delete();
        if (!args[0] || args[0] === "off") {
          await data.delete();
          return message.reply("Disabled the chatbot for this server.");
        }
        new Schema({
          Guild: message.guild.id,
          Channel: channel.id,
        }).save();
        message.reply(`Set the chatbot channel to ${channel}.`);
      }
    );
  },
};
