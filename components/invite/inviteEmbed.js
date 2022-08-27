const config = require('../../config.json');
const footer = require('./inviteFooter');

const embed = (interaction) => {
  const { client, guild, channel } = interaction;
  const address = `${guild}-${channel}`;
  const game = client.games.get(address);

  const out = {
    color: config.embed_color,
    thumbnail: { url: interaction.user.displayAvatarURL() },

    author: {
      name: `${interaction.member.displayName} wants to play!`,
      iconURL: interaction.user.displayAvatarURL()
    },

    description: `:love_letter: You're invited to play **Love Letters**!  Click the **Join** button to play along.`,

    footer: footer(game)
  }

  return out;
}

module.exports = embed;