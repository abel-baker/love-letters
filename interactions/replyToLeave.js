const inviteEmbed = require('../components/inviteEmbed');
const inviteButtons = require('../components/inviteButtons');

const replyToLeave = {
  name: 'replyToLeave',
  async execute(interaction) {
    const game = interaction.client.game;
    const success = game?.leave(interaction.member);

    if (success) {
      const newEmbed = inviteEmbed(interaction);
      const newButtons = inviteButtons(game);
  
      await interaction.update({ components: [newButtons], embeds: [newEmbed] });
    } else {
      await interaction.reply({ content: 'Unable to leave; is there a game and are you playing?', ephemeral: true });
    }
  }
}

module.exports = replyToLeave;