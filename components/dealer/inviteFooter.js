const config = require('../../config.json');
const prettyJoin = require('../../utils/prettyJoin');

const footer = (game) => {
  const current = game.playerQueue.size || 0;
  // const queuedCount = game.playerQueue.size || 0;
  // const max = config.rules.max_group_size || 4;
  const groupSize = config.rules.max_group_size || 4;

  // console.log(game.playerQueue);
  const memberQueue = Array.from(game.playerQueue.keys());
  // console.log(memberQueue?.map(member => member.nickname))
  
  let queued;
  // console.log(`between`, )
  if (memberQueue && memberQueue.length > groupSize) {
    queued = prettyJoin(memberQueue.map(member => member.nickname).slice(groupSize, game.playerQueue.length));
  }

  const queueString = queued? `Queue: ${queued}` : ``;

  const out = {
    icon_url: config.bot_avatar_url,
    text: `${queueString}`
  }

  return out;
}

module.exports = footer;
