const { ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config.json');

const button = (card, index = 0, disabled = false) => {
  const buttonLabel = ' Play ' + card.name.charAt(0).toUpperCase() + card.name.slice(1);
  const newButton = new ButtonBuilder()
    .setCustomId(`${card.name}/${index}`)
    .setLabel(buttonLabel)
    .setEmoji(card.props.value_emoji)
    .setStyle(ButtonStyle.Primary)
    .setDisabled(disabled);

  return newButton;
}

module.exports = button;