const { SlashCommandBuilder } = require('discord.js');
const config = require('../config.json');



module.exports = {
  data: new SlashCommandBuilder()
    .setName('newgame')
    .setDescription('Begin a new game of Love Letters.'),
  async execute(interaction) {
    console.log(`Creating new game in ${interaction.guild.name}[${interaction.guild.id}]#${interaction.channel.name}[${interaction.channel.id}]`);
    const game = interaction.client.game;
    game.new();
    game.start();
    await interaction.reply({ content: `Game status: ${game.status}`, ephemeral: true });
  }
};