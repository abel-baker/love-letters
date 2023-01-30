const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const cardButton = require('../cardButton');

// actionButtons: these are the buttons that show up when you look at your hand, they present your options
//   such as play cards, draw or discard cards, maybe forfeit etc

// invoke the updateActionButtons interaction when clicking a non-final-action button (ie play handmaid or draw card)
//   which should simply update the components on the interaction.message to the new set of buttons

// create a row of buttons based on context (e.g. player's hand; rule set) and customId (menu expanded; non-final
//   action button clicked like king, which then requires a choice of target)

// pick the customIds of these buttons carefully


const expandButton = new ButtonBuilder()
  .setCustomId('expandMore')
  .setLabel('More')
  .setStyle(ButtonStyle.Secondary);

const drawButton = new ButtonBuilder()
  .setCustomId('drawCard')
  .setLabel('Draw card')
  .setStyle(ButtonStyle.Secondary);

const discardButton = new ButtonBuilder()
  .setCustomId('showHand/discard')
  .setLabel('Discard card')
  .setStyle(ButtonStyle.Secondary);

// const findButton = new ButtonBuilder()
//   .setCustomId('showHand/find')
//   .setLabel('Find a card')
//   .setStyle(ButtonStyle.Secondary);

const dropButton = new ButtonBuilder()
  .setCustomId('showHand/drop')
  .setLabel('Drop a card')
  .setStyle(ButtonStyle.Secondary);

const rows = (hand, expanded = false) => {
  const buttonRows = [];

  const playButtons = [];
  hand.forEach((card, index) => {
    const newButton = cardButton(card, { index })

    playButtons.push(newButton);
  });

  // if (expanded) expandButton.setDisabled(true);
  playButtons.push(expandButton);

  // Separate play buttons (and possibly More button) into rows
  // (normally won't come up, but just in case playing with a large hand)
  const rowSize = 5;
  for (let i = 0; i < playButtons.length; i += rowSize) {
    const row = playButtons.slice(i, i + rowSize);
    buttonRows.push(new ActionRowBuilder()
      .addComponents(row));
  }
  
  if (expanded) {
    const expandedButtons = [];
    // Draw card
    expandedButtons.push(drawButton);

    // Discard card
    // Find card
    // Drop card
    expandedButtons.push(dropButton);

    buttonRows.push(new ActionRowBuilder().addComponents(expandedButtons));
  }


  return buttonRows;
}

module.exports = rows;