const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Join the game of Love Letters.'),
  async execute(interaction) {
    const game = interaction.client.game;

    // Confirm a game is running
    if (!game || game?.status === 'inactive') {
      await interaction.reply({ content: 'No active game; try /newgame', ephemeral: true });
      return;
    }

    // Confirm we're in the right channel
    if (interaction.guild !== game?.guild || interaction.channel !== game?.channel) {

      await interaction.reply({ content: `This isn't the game channel--head over to ${game.channel}`, ephemeral: true });
      return;
    }

    const added = game.join(interaction.member);
    const successPhrase = added? `Added ${interaction.member.displayName}` : `Already playing`;
    await interaction.reply({ content: `${successPhrase}. Playing: ${game.playing()}`, ephemeral: true });
  }
};