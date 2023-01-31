const config = require('../../config.json');
const prettyJoin = require('../../utils/prettyJoin');

const embed = (drawResult) => {
  const { drawn, player, deck } = drawResult;

  const cardDescriptionFields = [];
  
  for (let card of [...new Set(player.hand)]) {
    cardDescriptionFields.push({
      name: `${card.props.value_emoji} ${card.name.charAt(0).toUpperCase() + card.name.slice(1)}`,
      value: `${card.props.rules}`
    });
  }

  const out = {
    color: config.embed_color_draw,
    // thumbnail: { url: interaction.user.displayAvatarURL() },

    author: {
      name: `You draw ${prettyJoin(drawn.map(card => `${card.props.article} ${card.props.value_emoji} ${card.name}`))}.`,
      iconURL: player.avatarURL
    },
    description: `:love_letter: Your hand contains ${prettyJoin(player.hand.map(card => `${card.props.article} ${card.props.value_emoji} **${card.name}**`))}.`,

    fields: cardDescriptionFields
    // description: `:love_letter: **${player.name}** draws a card.`,
  };

  return out;
}

module.exports = embed;
