const inviteEmbed = require('../components/inviteEmbed');
const inviteButtons = require('../components/inviteButtons');
const verifyGameExists = require('../utils/auth');

const replyToBegin = {
  name: 'replyToBegin',
  async execute(interaction) {
    if (!verifyGameExists(interaction)) {
      await interaction.reply({ content: `Doesn't look like there is a game afoot`, ephemeral: true });
      return;
    }

    const game = interaction.client.game;
    // const success = game?.leave(interaction.member);

    // const newEmbed = inviteEmbed(interaction);
    // const newButtons = inviteButtons(game);

    // await interaction.update({ components: [], embeds: [newEmbed] });

    game.start();
  }
}

module.exports = replyToBegin;