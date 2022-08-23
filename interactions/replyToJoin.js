const replyToButton = {
  name: 'replyToJoin',
  async execute(interaction) {
    console.log('Embedded button pressed');
    await interaction.reply({ content: 'Ephemeral embedded button reply', ephemeral: true });
  }

}

module.exports = replyToButton;