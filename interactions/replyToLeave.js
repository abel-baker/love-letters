const inviteEmbed = require('../components/invite/inviteEmbed');
const inviteButtons = require('../components/invite/inviteButtonsRow');
const expiredEmbed = require('../components/invite/expiredEmbed');

const replyToLeave = {
  name: 'replyToLeave',
  async execute(interaction) {
    const inviteMessage = interaction.message;
    const inviteCommand = inviteMessage.interaction;
    console.log(`Clicked leave button from message from command`, inviteCommand.id);

    const { client, guild, channel } = interaction;
    const address = `${guild}-${channel}`;
    const game = client.games.get(address);

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