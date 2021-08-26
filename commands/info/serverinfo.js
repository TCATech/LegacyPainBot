const { MessageEmbed } = require("discord.js");
const regions = {
  brazil: "Brazil",
  europe: "Europe",
  hongkong: "Hong Kong",
  india: "India",
  japan: "Japan",
  russia: "Russia",
  singapore: "Singapore",
  southafrica: "South Africa",
  sydeny: "Sydeny",
  "us-central": "US Central",
  "us-east": "US East",
  "us-west": "US West",
  "us-south": "US South",
};
const moment = require("moment");

module.exports = {
  name: "serverinfo",
  aliases: ["server", "stats", "serverstats", "guildinfo", "guildstats"],
  description: "Says the info of the server where the message is sent in.",
  async execute(message, args, client) {
    const icon = message.guild.iconURL({ dynamic: true });
    const channels = message.guild.channels.cache;
    const owner = await message.guild.members.fetch(message.guild.ownerID);

    const embed = new MessageEmbed()
      .setThumbnail(icon)
      .addFields(
        {
          name: "Server ID",
          value: message.guild.id,
          inline: false,
        },
        {
          name: "Owner",
          value: message.guild.owner,
          inline: true,
        },
        {
          name: "Owner ID",
          value: message.guild.owner.user.id,
          inline: true,
        },
        {
          name: "Member Count",
          value: `${message.guild.memberCount} **total**, ${
            message.guild.members.cache.filter((member) => !member.user.bot)
              .size
          } **humans**, and ${
            message.guild.members.cache.filter((member) => member.user.bot).size
          } **bots**.`,
          inline: false,
        },
        {
          name: "Channels",
          value: `#️⃣ ${
            channels.filter((channel) => channel.type === "text").size
          } **text** channels and 🔊 ${
            channels.filter((channel) => channel.type === "voice").size
          } **voice** channels`,
          inline: true,
        },
        {
          name: "Emojis",
          value: message.guild.emojis.cache.size,
          inline: true,
        },
        {
          name: "Roles",
          value: message.guild.roles.cache.size,
          inline: true,
        },
        {
          name: "Creation Date",
          value: `📅 ${message.guild.createdAt.toLocaleString()}`,
          inline: false,
        }
      )
      .setColor(client.color)
      .setFooter(message.guild.name, icon)
      .setTimestamp();
    message.channel.send(embed);
  },
};
