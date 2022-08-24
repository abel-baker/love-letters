const config = require('../config.json');
const footer = require('./footer');

const embed = (interaction) => {
  const game = interaction.client.game;

  const out = {
    color: config.embed_color,
    thumbnail: { url: interaction.user.displayAvatarURL() },

    author: {
      name: `${interaction.member.displayName} wants to play!`,
      iconURL: interaction.user.displayAvatarURL()
    },

    // title: `You're invited! :love_letter:`,
    description: `:love_letter: You're invited to play **Love Letters**!  Click the **Join** button to play along.`,

    footer: footer(game)
  }

  return out;
}

module.exports = embed;