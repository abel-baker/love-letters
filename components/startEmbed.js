const config = require('../config.json');

const embed = (interaction) => {
  const { client, guild, channel } = interaction;
  const address = `${guild}-${channel}`;
  const game = client.games.get(address);

  const [startingMember, startingPlayer] = game.currentPlayer();
  const nextMember = game.nextPlayer();

  const out = {
    color: config.embed_color,
    thumbnail: { url: interaction.user.displayAvatarURL() },

    author: {
      name: `The game of love is afoot!`,
      iconURL: config.bot_avatar_url
    },

    // title: `You're invited! :love_letter:`,
    description: `Players ${[...game.players].map(([member, player]) => `**${member.nickname}**`).join(', ')} have been dealt 1 card each.  The starting player will be ${startingMember}.
    
    Let the game of :love_letter: **Love Letters** begin!`,

    // ${[...game.players].map(([member, player]) => {
    //   return `${member.nickname}, holding ${player.hand.map(card => card.name)}`
    // }).join('\n')}`,

    footer: {
      icon_url: startingMember.user.displayAvatarURL(),
      text: `Next up: ${nextMember.nickname}`
    }
  }

  return out;
}

module.exports = embed;