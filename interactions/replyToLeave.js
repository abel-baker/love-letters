const config = require('../config.json');

const replyToLeave = {
  name: 'replyToLeave',
  async execute(interaction) {
    const game = interaction.client.game;
    const success = game.leave(interaction.member);

    if (success) {
      const receivedEmbed = interaction.message.embeds[0];
      console.log(receivedEmbed);

      const newEmbed = { ...receivedEmbed.data, 
        footer: {
          icon_url: config.bot_avatar_url,
          text: `Currently playing ${game.players.size || 0}/${config.max_group_size || 6}: ${game.playing()}`
        }
      };
  
      await interaction.update({ embeds: [newEmbed] });
    } else {
      await interaction.reply({ content: 'Unable to leave; are you sure you are playing?', ephemeral: true });
    }
  }
}

module.exports = replyToLeave;