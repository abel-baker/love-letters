const config = require('../../config.json');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const row = (interaction) => {
  const { client, guild, channel } = interaction;
  const address = `${guild}-${channel}`;
  const game = client.games.get(address);

  // const current = game.players?.size;
  // const min = config.rules.min_group_size || 2;
  // const max = config.rules.max_group_size || 4;

  // Button to join queue--Label reflects position in the queue
  const buttonJoinQueue = new ButtonBuilder()
    .setCustomId(`replyToJoin/${interaction.id}`)
    .setLabel('Join')
    .setStyle(ButtonStyle.Primary);

  // Button to leave queue--Label deactivates if no one is in the queue
  const buttonLeaveQueue = new ButtonBuilder()
    .setCustomId(`replyToLeave/${interaction.id}`)
    .setLabel('Leave')
    .setStyle(ButtonStyle.Secondary)
  
  // Button to begin the game--Label activates when size conditions are met
  const buttonBeginNewGame = new ButtonBuilder()
    .setCustomId(`replyToBegin/${interaction.id}`)
    .setLabel('Play!')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(true);

  // Change 'join' to 'join queue' function at maximum
  if (game.atMax) {
    buttonJoinQueue
      .setLabel('Join queue')
      .setStyle(ButtonStyle.Secondary);
  } else {
    buttonJoinQueue
      .setEmoji('💌');
  }

  // Disable 'leave' button if there's no one to leave
  if (game.playerQueue.size === 0) {
    buttonLeaveQueue
      .setDisabled(true);
  }

  // Enable Play button at required minimum
  if (game.atMin) {
    buttonBeginNewGame
      .setStyle(ButtonStyle.Success)
      .setDisabled(false)
      .setEmoji('💌');
  }

  return new ActionRowBuilder()
    .addComponents([buttonJoinQueue, buttonLeaveQueue, buttonBeginNewGame]);
}

module.exports = row;