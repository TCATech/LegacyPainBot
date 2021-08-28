const { MessageEmbed } = require('discord.js')
const got = require('got');
const memeEmbed = new MessageEmbed()

module.exports = {
  name: 'meme',
  description: 'Fetches you a very funny meme.',
  async execute(message, args, client) {
    message.channel.send('Fetching you a funny meme...').then((resultMessage) => {
      got(`https://www.reddit.com/r/memes/random/.json`).then(async response => {

      let content = JSON.parse(response.body);
      let permalink = content[0].data.children[0].data.permalink;
      let memeUrl = `https://reddit.com${permalink}`;
      let memeImage = content[0].data.children[0].data.url;
      let memeTitle = content[0].data.children[0].data.title;
      let memeUpvotes = content[0].data.children[0].data.ups;
      let memeDownvotes = content[0].data.children[0].data.downs;
      let memeNumComments = content[0].data.children[0].data.num_comments;

      memeEmbed.setTitle(`${memeTitle}`)
      memeEmbed.setURL(`${memeUrl}`)
      memeEmbed.setImage(memeImage)
      memeEmbed.setColor(client.color)
      memeEmbed.setFooter(`👍 ${memeUpvotes} | 👎 ${memeDownvotes} | 💬 ${memeNumComments}`)
      memeEmbed.setTimestamp()

      resultMessage.edit('** **', {
          embed: memeEmbed
      })
      })
    })
  }
}