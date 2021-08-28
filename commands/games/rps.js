const Discord = require("discord.js");
const { promptMessage } = require("../../functions.js");
const { RockPaperScissors } = require("weky");

const chooseArr = ["🗻", "📰", "✂"];

module.exports = {
  name: "rps",
  description:
    "Play rock paper scissors against your friends, or if you're lonely you can play against PainBot!",
  usage: '[@user or user ID]',
  async execute(message, args, client) {
    const member = message.mentions.users.first();
    if (member)
      return await RockPaperScissors({
        message: message,
        opponent: member,
        gameID: message.author.id,
        embed: {
          title: "Rock Paper Scissors",
          description: `Press the button below to choose your element.`,
          color: client.color,
          footer: client.user.username,
          footerIcon: client.user.displayAvatarURL({ dynamic: true }),
          timestamp: true,
        },
        buttons: {
          rock: "Rock",
          paper: "Paper",
          scissors: "Scissors",
          accept: "Accept",
          deny: "Deny",
        },
        time: 15 * 1000,
        acceptMessage:
          "<@{{challenger}}> has challenged <@{{opponent}}> for a game of Rock Paper and Scissors!",
        winMessage: "GG, <@{{winner}}> won!",
        drawMessage: "This game is deadlock!",
        endMessage:
          "<@{{opponent}}> didn't answer in time, so I ended the game!",
        timeEndMessage:
          "Both of you didn't pick something in time, so I ended the game!",
        cancelMessage:
          "<@{{opponent}}> refused to have a game of Rock Paper and Scissors with you!",
        choseMessage: "You picked {{emoji}}",
        noChangeMessage: "You cannot change your selection!",
        othersMessage: "Only {{author}} can use the buttons!",
        returnWinner: true,
      });

    const rpsEmbed = new Discord.MessageEmbed()
      .setColor(client.color)
      .setFooter(
        `${message.member.displayName} vs ${client.user.username}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTitle(`${message.member.displayName} vs. ${client.user.username}`)
      .setDescription(
        "Please react what you would like to choose with the emojis below!"
      )
      .setTimestamp();

    const m = await message.channel.send(rpsEmbed);
    // Wait for a reaction to be added
    const reacted = await promptMessage(m, message.author, 30, chooseArr);

    // Get a random emoji from the array
    const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

    // Check if it's a win/tie/loss
    const result = await getResult(reacted, botChoice);
    // Clear the reactions
    await m.reactions.removeAll();

    rpsEmbed
      .setDescription("")
      .addField("Your Choice", reacted)
      .addField(`${client.user.username}'s Choice`, botChoice)
      .addField("Result", result);

    if (result === `**${client.user.username}** wins!`) {
      rpsEmbed.setColor("RED");
    } else if (result === `**${message.member.displayName}** wins!`) {
      rpsEmbed.setColor("GREEN");
    } else if (result === "Draw!") {
      rpsEmbed.setColor("ORANGE");
    }

    m.edit(rpsEmbed);

    function getResult(me, clientChosen) {
      if (
        (me === "🗻" && clientChosen === "✂") ||
        (me === "📰" && clientChosen === "🗻") ||
        (me === "✂" && clientChosen === "📰")
      ) {
        return `**${message.member.displayName}** wins!`;
      } else if (me === clientChosen) {
        return "Draw!";
      } else {
        return `**${client.user.username}** wins!`;
      }
    }
  },
};
