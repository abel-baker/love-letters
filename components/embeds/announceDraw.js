const config = require('../../config.json');

const embed = (drawResult) => {
  const { player, deck } = drawResult;

  const out = {
    color: config.embed_color_draw,
    // thumbnail: { url: interaction.user.displayAvatarURL() },

    author: {
      name: `${player.name} draws a card`,
      // iconURL: config.bot_avatar_url
      iconURL: player.avatarURL
    },

    // description: `:love_letter: **${player.name}** draws a card.`,
  };

  if (deck.length <= 3) {
    out.footer = { text: `${deck.length} card${deck.length === 1 ? '' : 's'} left in the deck` }
  }

  return out;
}

module.exports = embed;
