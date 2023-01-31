const clearActionButtons = (newMessage, game) => {
  // Remove components (button rows) from existing action messages
  for (let message of game.commandMessages) {
    message.edit({ components: [] });
  }

  // Replace list of action messages with only the new message
  game.commandMessages = [newMessage];
}

module.exports = clearActionButtons
