const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Join the game of Love Letters.'),
  async execute(interaction) {
    const game = interaction.client.game;
    if (game.status === 'inactive') {
      await interaction.reply({ content: 'No active game; try /newgame', ephemeral: true });
      return;
    }

    const added = game.join(interaction.member);
    const successPhrase = added? `Added ${interaction.member.displayName}` : `Already playing`;
    await interaction.reply({ content: `${successPhrase}. Playing: ${game.playing()}`, ephemeral: true });
  }
};