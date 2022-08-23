const replyToButton = {
  name: 'replyToButton',
  async execute(interaction) {
    console.log('Embedded button pressed');
    await interaction.reply({ content: 'Ephemeral embedded button reply', ephemeral: true });
  }

}

module.exports = replyToButton;