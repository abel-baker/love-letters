const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config.json');

const buttonLeaveGame = new ButtonBuilder()
  .setCustomId('replyToLeave')
  .setLabel('Leave')
  .setStyle(ButtonStyle.Secondary)

const row = (interaction) => {
  const game = interaction.client.game;

  const current = game?.players.size;
  const min = config.rules.min_group_size || 2;
  const max = config.rules.max_group_size || 4;

  const buttonJoinNewGame = new ButtonBuilder()
    .setCustomId(`replyToJoin/${interaction.id}`)
    .setLabel('Join')
    .setStyle(ButtonStyle.Primary);

  // Change 'join' to 'join queue' function at maximum
  const atMax = current && current >= max;
  if (atMax) {
    buttonJoinNewGame
      .setLabel('Join queue')
      .setStyle(ButtonStyle.Secondary);
  } else {
    buttonJoinNewGame
      .setEmoji('💌');
  }
  
  const buttonBeginNewGame = new ButtonBuilder()
    .setCustomId('replyToBegin')
    .setLabel('Play!')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(true);

  // Enable Play button at required minimum
  const atMin = current && current >= min;
  if (atMin) {
    buttonBeginNewGame
      .setStyle(ButtonStyle.Success)
      .setDisabled(false)
      .setEmoji('💌');
  }

  return new ActionRowBuilder()
    .addComponents([buttonJoinNewGame, buttonLeaveGame, buttonBeginNewGame]);
}

module.exports = row;