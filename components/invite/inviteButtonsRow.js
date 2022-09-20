const config = require('../../config.json');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const row = (interaction) => {
  const { client, guild, channel } = interaction;
  const address = `${guild}-${channel}`;
  const game = client.games.get(address);

  const current = game.players?.size;
  const min = config.rules.min_group_size || 2;
  const max = config.rules.max_group_size || 4;

  // Button to leave queue
  const buttonLeaveQueue = new ButtonBuilder()
    .setCustomId(`replyToLeave/${interaction.id}`)
    .setLabel('Leave')
    .setStyle(ButtonStyle.Secondary)

  // Button to join queue--Label reflects position in the queue
  const buttonJoinQueue = new ButtonBuilder()
    .setCustomId(`replyToJoin/${interaction.id}`)
    .setLabel('Join')
    .setStyle(ButtonStyle.Primary);

  // Change 'join' to 'join queue' function at maximum
  const atMax = current && current >= max;
  if (atMax) {
    buttonJoinQueue
      .setLabel('Join queue')
      .setStyle(ButtonStyle.Secondary);
  } else {
    buttonJoinQueue
      .setEmoji('💌');
  }
  
  const buttonBeginNewGame = new ButtonBuilder()
    .setCustomId(`replyToBegin/${interaction.id}`)
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
    .addComponents([buttonJoinQueue, buttonLeaveQueue, buttonBeginNewGame]);
}

module.exports = row;