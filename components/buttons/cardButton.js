const { ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../../config.json');

const button = (options) => {
  // options with defaults
  const action = options.action || 'play';
  const actionWord = options.actionWord || 'Play';
  const state = options.state || 'enabled';
  const style = options.style || 'primary';
  
  
  // options without defaults
  const { card, suffix } = options;
  
  const customId = options.customId || `updateActionButtons/${card}`;
  const emoji = options.emoji || options.emojiPhrase || config.cards[card]['value_emoji'];
  const label = options.label || [actionWord, card, suffix].filter(n => n).join(' ');

  const button = new ButtonBuilder()
    .setCustomId(customId)
    .setLabel(label)
    .setEmoji(emoji)
    .setStyle(ButtonStyle.Primary);

  return button;
}

module.exports = button;