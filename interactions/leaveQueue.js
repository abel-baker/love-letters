const inviteEmbed = require('../components/invite/inviteEmbed');
const inviteButtons = require('../components/invite/inviteButtonsRow');
// const expiredEmbed = require('../components/invite/expiredEmbed');

const leaveQueue = {
  name: 'leaveQueue',
  async execute(interaction) {
    const inviteMessage = interaction.message;
    const inviteCommand = inviteMessage.interaction;
    console.log(`Clicked leave button from message from command`, inviteCommand.id);

    const { client, guild, channel, member } = interaction;
    const address = `${guild}-${channel}`;
    const game = client.games.get(address);

    // if (!game?.origin || inviteCommand.id !== game?.origin) {
    //   console.log(`Origin mismatch`, game?.origin);

    //   await interaction.update({ components: [], embeds: [...interaction.message.embeds, expiredEmbed] });
    //   return;
    // }

    const success = game?.leaveGame(member);

    if (success) {
      const newEmbed = inviteEmbed(interaction);
      const newButtons = inviteButtons(interaction);
  
      await interaction.update({ components: [newButtons], embeds: [newEmbed] });
    } else {
      await interaction.reply({ content: 'Unable to leave; is there a game and are you playing?', ephemeral: true });
    }
  }
}

module.exports = leaveQueue;