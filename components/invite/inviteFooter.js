const config = require('../../config.json');
const prettyJoin = require('../../utils/prettyJoin');

const footer = (game) => {
  // const current = game.playerQueue.size || 0;
  // // const queuedCount = game.playerQueue.size || 0;
  // // const max = config.rules.max_group_size || 4;
  // const groupSize = config.rules.max_group_size || 4;

  
  // const memberQueue = Array.from(game.playerQueue.keys());
  
  // let queued;

  // if (memberQueue && memberQueue.length > groupSize) {
  //   queued = prettyJoin(memberQueue.map(member => member.nickname).slice(groupSize, game.playerQueue.length));
  // }

  // const queueString = queued? `Queue: ${queued}` : ``;

  let footerString;

  if (game.atMin) {
    footerString = `Ready to play!`;
  } else if (game.locked) {
    footerString = `Game started!`;
  }

  if (footerString) {
    const out = {
      icon_url: config.bot_avatar_url,
      text: `${footerString}`
    }

    return out;
  }

  return {};
}

module.exports = footer;
