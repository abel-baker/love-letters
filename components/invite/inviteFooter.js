const config = require('../../config.json');

const footer = (game) => {
  const current = game.players.size || 0;
  const max = config.rules.max_group_size || 4;

  const countString = `(${current}/${max})${current === 0? '' : ': '}`

  const out = {
    icon_url: config.bot_avatar_url,
    text: `Currently playing ${countString}${game.playing()}`
  }

  return out;
}

module.exports = footer;
