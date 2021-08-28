let Discord = require("discord.js");
let client = new Discord.Client({
  disableEveryone: true,
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  restTimeOffset: 0,
});
require("discord-buttons")(client);
require("dotenv").config();
const server = require("./server.js");
const Distube = require("distube");

client.config = require("./config.json");
const prefix = require("./models/prefix");

const fs = require("fs");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");
["commands"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

client.error = (err) => {
  if (typeof err === "string")
    return err
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  else return err;
};

client.on("ready", () => {
  console.log(`${client.user.tag} is now online!`);

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

client.distube = new Distube(client, {
  searchSongs: true,
  leaveOnFinish: false,
  leaveOnStop: false,
  emitNewSongOnly: true,
});

client.distube.on("searchResult", (message, result) => {
  message.channel.startTyping();
  let i = 0;
  message.channel.send(
    `**Choose an option from below:**\n${result
      .map((song) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``)
      .join("\n")}\n\n*Enter anything else or wait 60 seconds to cancel*`
  );
  message.channel.stopTyping();
});

client.distube.on("searchCancel", (message) => {
  message.channel.startTyping();
  message.channel.send(`Search canceled`);
  message.channel.stopTyping();
});

client.distube.on("playSong", (message, queue, song) => {
  message.channel.startTyping();
  message.channel.send(
    new Discord.MessageEmbed()
      .addField("Now playing", song.name)
      .addField("Requester", song.user)
      .setColor(
        message.guild.me.displayHexColor === "#000000"
          ? "#ffffff"
          : message.guild.me.displayHexColor
      )
      .setFooter(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp()
  );
  message.channel.stopTyping();
});

client.distube.on("addSong", (message, queue, song) => {
  message.channel.startTyping();
  message.channel.send(`Added ${song.name} to the queue.`);
  message.channel.stopTyping();
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

  client.noperm = new Discord.MessageEmbed()
    .setTitle("Oopsie Poopsie!")
    .setDescription(
      `You don't have permission to use that command as you are not a staff member.`
    )
    .setColor(client.color)
    .setFooter(
      client.user.username,
      client.user.displayAvatarURL({ dynamic: true })
    )
    .setTimestamp();

  client.oopsiepoopsie = new Discord.MessageEmbed()
    .setTitle("Oopsie Poopsie!")
    .setDescription(
      `Seems like something went wrong on my end. Please try again!`
    )
    .setColor(client.color)
    .setFooter(
      client.user.username,
      client.user.displayAvatarURL({ dynamic: true })
    )
    .setTimestamp();

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
  if(command.wip && message.author.id !== client.config.ownerID) return message.reply('This command is currently a **W**ork **I**n **P**rogress.')

  if (!command) return message.delete();
  if (
    command.userPerms &&
    !message.member.hasPermission(command.userPerms || [])
  )
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
  if (
    command.botPerms &&
    !message.guild.me.hasPermission(command.botPerms || [])
  )
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
});

client.on("voiceStateUpdate", (oldState, newState) => {
  if (
    oldState.channelID !== oldState.guild.me.voice.channelID ||
    newState.channel
  )
    return;

  if (oldState.channel.members.size === 1) oldState.channel.leave();
});

client.login(process.env.token);
