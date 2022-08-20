const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bingle')
    .setDescription('It does the thing.'),
  async execute(interaction) {
    await interaction.reply('This is the thing');
  }
};