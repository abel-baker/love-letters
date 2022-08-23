const { SlashCommandBuilder } = require('discord.js');
const Game = require('../classes/Game');

const slashNewGame = {
  data: new SlashCommandBuilder()
    .setName('newgame')
    .setDescription('Begin a new game of Love Letters.'),
  async execute(interaction) {
    const ongoingGame = interaction.client.game;

    // Confirm there is not already a game running elsewhere
    if (ongoingGame?.status === 'active') {
      await interaction.reply({ content: `There is already a game going on in ${ongoingGame.channel}.`, ephemeral: true });
      return;
    }

    const channel = interaction.channel;
    const guild = interaction.guild;

    const game = new Game(guild, channel);
    interaction.client.game = game;

    game.new();
    game.start();
    await interaction.reply({ content: `Created game in ${game.address}`, ephemeral: true });

    game.join(interaction.member);
  }
};

module.exports = slashNewGame;
