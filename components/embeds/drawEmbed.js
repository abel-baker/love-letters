const config = require('../../config.json');

const embed = (interaction) => {
  const { client, guild, channel, member } = interaction;
  const address = `${guild}-${channel}`;
  const game = client.games.get(address);

  const out = {
    color: config.embed_color_draw,
    // thumbnail: { url: interaction.user.displayAvatarURL() },

    author: {
      name: `${member.nickname || member.displayName} draws a card`,
      // iconURL: config.bot_avatar_url
      iconURL: interaction.user.displayAvatarURL()
    },

    // description: `:love_letter: **${member.nickname || member.displayName}** draws a card.`,
  };

  if (game.deck.length <= 3) {
    out.footer = { text: `${game.deck.length} cards left in the deck` }
  }

  return out;
}

module.exports = embed;
