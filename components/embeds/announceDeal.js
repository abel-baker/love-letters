const config = require('../../config.json');

const embed = (game) => {
  // const { player, deck } = game;

  const description = `This **handsome cat** deals a card to each player`
   + `${game.twoPlayerGame? `, three cards face-up,` : ``}`
   + ` and one card face-down.`

  const dealFields = [];
  dealFields.push({
    name: `:blue_square: Face-down card`,
    value: `Could be anything`
  });

  for (let card of game.faceup) {
    dealFields.push({
      name: `${card.props.value_emoji} ${card.name.charAt(0).toUpperCase() + card.name.slice(1)}`,
      value: card.props.short_rules,
      inline: true
    });
  }

  const out = {
    color: config.embed_color,
    thumbnail: { url: config.bot_avatar_url },

    author: {
      name: `💌 Let's begin!`,
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
