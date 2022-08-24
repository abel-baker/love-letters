const footer = require('../components/footer');

const replyToLeave = {
  name: 'replyToLeave',
  async execute(interaction) {
    const game = interaction.client.game;
    const success = game.leave(interaction.member);

    if (success) {
      const receivedEmbed = interaction.message.embeds[0];

      const newEmbed = { ...receivedEmbed.data, 
        footer: footer(game)
      };
  
      await interaction.update({ embeds: [newEmbed] });
    } else {
      await interaction.reply({ content: 'Unable to leave; are you sure you are playing?', ephemeral: true });
    }
  }
}

module.exports = replyToLeave;