const config = require('../../config.json');
const prettyJoin = require('../../utils/prettyJoin');

const embed = (handQuery) => {
  const { player } = handQuery;

  const cardDescriptionFields = [];
  
  for (let card of [...new Set(player.hand)]) {
    cardDescriptionFields.push({
      name: `${card.props.value_emoji} ${card.name.charAt(0).toUpperCase() + card.name.slice(1)}`,
      value: `${card.props.rules}`
    });
  }

  const out = {
    color: config.embed_color_draw,

    author: {
      name: `You're holding ${player.hand.length === 0? `nothing` : player.hand.length === 1? `one card` : `some cards`}`,
      iconURL: player.avatarURL
    },

    description: `Your hand contains ${prettyJoin(player.hand.map(card => `${card.props.article} ${card.props.value_emoji} **${card.name}**`))}.\n\u2800`,

    fields: cardDescriptionFields
  }

  return out;
}

module.exports = embed;
