const config = require('../config.json');

const replyToJoin = {
  name: 'replyToJoin',
  async execute(interaction) {
    const game = interaction.client.game;
    const success = game.join(interaction.member);

    if (success) {
      const receivedEmbed = interaction.message.embeds[0];

      const newEmbed = { ...receivedEmbed.data, 
        footer: {
          icon_url: config.bot_avatar_url,
          text: `Currently playing ${game.players.size || 0}/${config.max_group_size || 6}: ${game.playing()}`
        }
      };
      
    await interaction.channel.send({ content: `:love_letter: **${interaction.member.displayName}** accepted the invite!` });
    await interaction.update({ embeds: [newEmbed] });
    } else {
      await interaction.reply({ content: `Unable to join; are you already in the game?`, ephemeral: true });
    }

  }

}

module.exports = replyToJoin;