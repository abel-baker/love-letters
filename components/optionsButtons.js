const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config.json');

const buttonShowHand = new ButtonBuilder()
  .setCustomId('showHand')
  .setLabel('Show hand')
  .setStyle(ButtonStyle.Secondary)

const row = () => {
  // const game = interaction.client.game;

  return new ActionRowBuilder()
    .addComponents([buttonShowHand]);
}

module.exports = row;