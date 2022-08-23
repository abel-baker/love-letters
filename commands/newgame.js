const { SlashCommandBuilder } = require('discord.js');
const Game = require('../classes/Game');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('newgame')
    .setDescription('Begin a new game of Love Letters.'),
  async execute(interaction) {
    const channel = interaction.channel;
    const guild = interaction.guild;

    const game = new Game(guild, channel);
    interaction.client.game = game;    

    game.new();
    game.start();
    await interaction.reply({ content: `Game status: ${game.status}`, ephemeral: true });
  }
};