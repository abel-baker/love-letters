const inviteEmbed = require('../components/inviteEmbed');
const inviteButtons = require('../components/inviteButtons');
const expiredEmbed = require('../components/expiredEmbed');

const replyToLeave = {
  name: 'replyToLeave',
  async execute(interaction) {
    const inviteMessage = interaction.message;
    const inviteCommand = inviteMessage.interaction;
    console.log(`Clicked leave button from message from command`, inviteCommand.id);

    const game = interaction.client.game;

    if (!game?.origin || inviteCommand.id !== game?.origin) {
      console.log(`Origin mismatch`, game?.origin);

      await interaction.update({ components: [], embeds: [...interaction.message.embeds, expiredEmbed] });
      return;
    }

    const success = game?.leave(interaction.member);

    if (success) {
      const newEmbed = inviteEmbed(interaction);
      const newButtons = inviteButtons(interaction);
  
      await interaction.update({ components: [newButtons], embeds: [newEmbed] });
    } else {
      await interaction.reply({ content: 'Unable to leave; is there a game and are you playing?', ephemeral: true });
    }
  }
}

module.exports = replyToLeave;