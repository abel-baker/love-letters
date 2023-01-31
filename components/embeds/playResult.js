const config = require('../../config.json');

const embed = (playResult) => {
  const { player, playedCard } = playResult;


  const out = {
    color: config.embed_color,

    author: {
      name: `${player.name} plays ${playedCard.props.article} ${playedCard.props.value_emoji} ${playedCard.name}`,
      iconURL: player.avatarURL
    },

    thumbnail: { url: player.avatarURL },

    description: `\u2800`, /* create some vertical space */

    fields: [
      {
        name: `${playedCard.props.value_emoji} ${playedCard.name.charAt(0).toUpperCase() + playedCard.name.slice(1)}`,
        value: `${playedCard.props.rules}\n\u2800`
      }
    ],

    footer: {
      iconURL: config.bot_avatar_url,
      text: `Next player: some handsome cat, probably`
    },
  }

  return out;
}

module.exports = embed;
