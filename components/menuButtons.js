const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const cardButton = require('./cardButton');

const drawButton = new ButtonBuilder()
  .setCustomId('drawCard/clearMenuButtons')
  .setLabel('Draw card')
  .setStyle(ButtonStyle.Primary);

const showHandButton = new ButtonBuilder()
  .setCustomId('showHand')
  .setLabel('Look at hand')
  .setStyle(ButtonStyle.Secondary);

const row = () => {
  const buttons = [drawButton, showHandButton];  

  return new ActionRowBuilder()
    .addComponents(buttons);
}

module.exports = row;
