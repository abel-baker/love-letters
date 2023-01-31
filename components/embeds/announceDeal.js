const config = require('../../config.json');

const embed = (game) => {
  // const handsomeCat = game.guild.emojis.cache.get("1069797793738264647");

  const description = `\nThis **handsome cat** deals a card to each player`
   + `${game.twoPlayerGame? `, three cards face-up,` : ``}`
   + ` and one card face-down.\n\u2800`

  const dealFields = [];

  for (let card of game.faceup) {
    dealFields.push({
      name: `${card.props.value_emoji} ${card.name.charAt(0).toUpperCase() + card.name.slice(1)}`,
      value: card.props.short_rules,
      inline: true
    });
  }

  dealFields.push({
    name: `:blue_square: Face-down card`,
    value: `Could be anything, really`
  });

  const out = {
    color: config.embed_color,
    thumbnail: { url: config.bot_avatar_url },

    author: {
      name: `💌 A handsome cat appears!`,
      // iconURL: config.bot_avatar_url
      // iconURL: player.avatarURL
    },

    description,

    fields: dealFields,

    footer: {
      icon_url: config.bot_avatar_url,
      text: `Who is going to draw a card and get us started?`
    }
  };

  return out;
}

module.exports = embed;
