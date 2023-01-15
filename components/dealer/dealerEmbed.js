const config = require('../../config.json');
const footer = require('./inviteFooter');

const embed = (interaction) => {
  const { client, guild, channel } = interaction;
  const address = `${guild}-${channel}`;
  const game = client.games.get(address);

  const dealerString = `:love_letter: You're the dealer!  Click the **Draw** button to draw and play your first card.`;

  // list displayed in invitation embed
  // const memberPlayingList = [];
  // for (let i = 0; i < groupLimit; i++) {
  //   const member = Array.from(game.playerQueue.keys())[i];
  //   if (member) {
  //     memberPlayingList.push(`:love_letter: **${member.nickname}**`);
  //   } else {
  //     memberPlayingList.push(`:love_letter: *open invitation*`);
  //   }
  // }

  const heldCards = [];


  const out = {
    color: config.embed_color,
    thumbnail: { url: interaction.user.displayAvatarURL() },

    author: {
      name: `It's your turn, ${interaction.member.displayName}!`,
      iconURL: interaction.user.displayAvatarURL()
    },

    description: `${dealerString}\n\nYou're holding:`,

    fields: heldCards,

    footer: footer(game)
  }

  return out;
}

module.exports = embed;