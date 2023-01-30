const config = require('../../config.json');

const embed = (drawResult) => {
  const { displayName, avatarURL, deck } = drawResult;

  const out = {
    color: config.embed_color_draw,
    // thumbnail: { url: interaction.user.displayAvatarURL() },

    author: {
      name: `${displayName} draws a card`,
      // iconURL: config.bot_avatar_url
      iconURL: avatarURL
    },

    // description: `:love_letter: **${displayName}** draws a card.`,
  };

  if (deck.length <= 3) {
    out.footer = { text: `${deck.length} cards left in the deck` }
  }

  return out;
}

module.exports = embed;
