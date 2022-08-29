const config = require('../../config.json');
const prettyJoin = require('../../utils/prettyJoin');

const footer = (game) => {
  const current = game.players.size || 0;
  const max = config.rules.max_group_size || 4;

  const countString = `(${current}/${max})${current === 0? '' : ': '}`

  const playerQueue = game.playing().map(player => player.displayName);
  const inGame = prettyJoin(playerQueue.slice(0, max));
  const queued = prettyJoin(playerQueue.slice(max, playerQueue.displayName));

  const queueString = queued.length > 0? `. Queued: ${queued}` : ``;

  const out = {
    icon_url: config.bot_avatar_url,
    text: `Currently playing ${countString}${prettyJoin(inGame)}${queueString}`
  }

  return out;
}

module.exports = footer;
