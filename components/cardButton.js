const { ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config.json');

const button = (card, options) => {
  const actionId = options.actionId || 'playCard';
  const actionWord = options.actionWord || 'Play';
  const buttonLabel = `${actionWord} ${card.name.charAt(0).toUpperCase() + card.name.slice(1)}`;
  const newButton = new ButtonBuilder()
    .setCustomId(`${actionId}/${card.name}/${options.index}`)
    .setLabel(buttonLabel)
    .setEmoji(card.props.value_emoji)
    .setStyle(ButtonStyle.Primary);

  return newButton;
}

module.exports = button;
