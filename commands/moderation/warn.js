const warns = require("../../models/warns");

module.exports = {
  name: "warn",
  wip: true,
  async execute(message, args, client) {
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.find((m) => m.user.id === args[0]);
    let reason = args.slice(1).join(" ");
    if (!user) return message.reply("Please specify a member to warn.");
    if (!reason) reason = "No reason specified.";
    warns.findOne(
      {
        Guild: message.guild.id,
        User: user.id,
      },
      async (err, data) => {
        if (err) console.log(err);
        if (!data) {
          const newWarns = new warns({
            User: user.id,
            Guild: message.guild.id,
            Warns: [
              {
                Moderator: message.author.id,
                Reason: reason,
              },
            ],
          });

          newWarns.save();
          message.reply(
            `${user.user.tag} has successfully been warned with the reason of \`${reason}\`. They now have 1 warn.`
          );
        } else {
          data.Warns.unshift({
            Moderator: message.author.id,
            Reason: reason,
          });
          data.save();
          message.reply(
            `${user.user.tag} has successfully been warned with the reason of \`${reason}\`. They now have ${data.Warns.length} warn.`
          );
        }
      }
    );
  },
};
