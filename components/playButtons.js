const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const button = require('./cardButton');
const cardButton = require('./cardButton');

const buttonShowHand = new ButtonBuilder()
  .setCustomId('showHand')
  .setLabel('Show hand')
  .setStyle(ButtonStyle.Secondary)

const row = (hand) => {
  const buttons = []
  hand.forEach((card, index) => {
    const buttonLabel = ' Play ' + card.name.charAt(0).toUpperCase() + card.name.slice(1);
    const newButton = new ButtonBuilder()
      .setCustomId(`${card.name}/${index}`)
      .setLabel(buttonLabel)
      .setEmoji(card.props.value_emoji)
      .setStyle(ButtonStyle.Primary);

    const cardButton = button(card, index)

    buttons.push(cardButton);
  });
  

  return new ActionRowBuilder()
    .addComponents(buttons);
}

module.exports = row;