const { ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../../config.json');

const button = (options) => {
  // options with defaults
  const action = options.action || 'play';
  const actionWord = options.actionWord || 'Play';
  const disabled = options.disabled || false;
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
    .setDisabled(disabled)
    .setStyle(ButtonStyle.Primary);
    
  switch (String(style)) {
    case "primary":
    case "blurple": 
      button.setStyle(ButtonStyle.Primary); break;
    case "secondary":
    case "gray":
    case "grey":
      button.setStyle(ButtonStyle.Secondary); break;
    case "success":
    case "green":
    case "go": 
      button.setStyle(ButtonStyle.Success); break;
    case "danger":
    case "red":
      button.setStyle(ButtonStyle.Danger); break;
  }

  return button;
}

module.exports = button;