const fetch = require("node-fetch");
const Schema = require("../models/chatbot");

module.exports = (client) => {
  client.on("message", async (message) => {
    if (message.author.bot || !message.guild) return;
    Schema.findOne(
      {
        Guild: message.guild.id,
      },
      async (err, data) => {
        if (err) console.log(err);
        if (!data) return;
        if (message.channel.id !== data.Channel) return;
        fetch
          .default(
            `https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${message.guild.id}`
          )
          .then((res) => res.json())
          .then((d) => {
            message.lineReply(d.response);
          });
      }
    );
  });
};
