const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');


const buttonShowHand = new ButtonBuilder()
  .setCustomId('showHand')
  .setLabel('Show hand')
  .setStyle(ButtonStyle.Secondary);

const row = (currentPlayer = true) => {
  console.log(`Current player?`, currentPlayer);
  
  const buttonDrawCard = new ButtonBuilder()
  .setCustomId('drawCard')
  .setLabel('Draw a card')
  .setStyle(ButtonStyle.Primary)
  .setDisabled(!currentPlayer);

  return new ActionRowBuilder()
    .addComponents([buttonDrawCard, buttonShowHand]);
}

module.exports = row;