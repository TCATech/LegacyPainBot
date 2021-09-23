let Discord = require("discord.js");
require("discord-reply");
let client = new Discord.Client({
  disableEveryone: true,
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  restTimeOffset: 0,
});
require("discord-buttons")(client);
require("dotenv").config();
const keepAlive = require("./server.js");

client.config = require("./config.json");
const prefix = require("./models/prefix");

const fs = require("fs");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");
["commands"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

//Top.gg API

const { Api } = require("@top-gg/sdk");
client.topgg = new Api(process.env.TopGG);

client.error = (err) => {
  if (typeof err === "string")
    return err
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  else return err;
};

client.on("ready", () => {
  require('./handlers/features')(client)
  console.log(`${client.user.tag} is now online!`);
  console.log(
    `Watching ${client.guilds.cache.size} servers, ${client.channels.cache.size} channels, and ${client.users.cache.size} users.`
  );

  keepAlive();

  client.user.setActivity(">help | PainBot.tk", {
    type: "LISTENING",
  });

  const mongoose = require("mongoose");
  mongoose
    .connect(client.config.mongoSRV, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(console.log("Successfully connected to MongoDB"));
});

client.on("message", async (message) => {
  if (!message.guild || message.author.bot) return;
  if (
    message.content.includes("@here") ||
    message.content.includes("@everyone")
  )
    return;

  client.color =
    message.guild.me.displayHexColor === "#000000"
      ? "#ffffff"
      : message.guild.me.displayHexColor;

  const data = await prefix.findOne({
    GuildID: message.guild.id,
  });

  let serverPrefix = "";

  if (data) {
    serverPrefix = data.Prefix;
  } else if (!data) {
    serverPrefix = client.config.prefix;
  }

  client.prefix = serverPrefix;

  if (!message.content.startsWith(serverPrefix)) return;
  const args = message.content.slice(serverPrefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();
  const command =
    client.commands.get(cmd) ||
    client.commands.find((a) => a.aliases && a.aliases.includes(cmd));
  if (command) {
    if (command.wip && message.author.id !== client.config.ownerID)
      return message.reply(
        "This command is currently a **W**ork **I**n **P**rogress."
      );

    if (command.userPerms && !message.member.hasPermission(command.userPerms))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("Oopsie Poopsie!")
          .setDescription(
            `You need the following permissions to use this command: \`${command.userPerms
              .map(
                (value) =>
                  `${
                    value[0].toUpperCase() +
                    value.toLowerCase().slice(1).replace(/_/gi, " ")
                  }`
              )
              .join(", ")}\``
          )
          .setColor(client.color)
          .setFooter(
            client.user.username,
            client.user.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp()
      );
    if (command.botPerms && !message.guild.me.hasPermission(command.botPerms))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("Oopsie Poopsie!")
          .setDescription(
            `Please give me the following permissions: \`${command.botPerms
              .map(
                (value) =>
                  `${
                    value[0].toUpperCase() +
                    value.toLowerCase().slice(1).replace(/_/gi, " ")
                  }`
              )
              .join(", ")}\``
          )
          .setColor(client.color)
          .setFooter(
            client.user.username,
            client.user.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp()
      );

    command.execute(message, args, client);
  } else {
    return message.delete();
  }
});

client.login(process.env.token);
