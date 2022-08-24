const config = require('../config.json');

const footer = (game) => {
  const current = game.players.size || 0;
  const max = config.rules.max_group_size || 4;

  const wrapper = (body) => current === 0? `(${body})` : `(${body}):`;

  const out = {
    icon_url: config.bot_avatar_url,
    text: `Currently playing ${wrapper(`${current}/${max}`)} ${game.playing()}`
  }

  return out;
}

module.exports = footer;
