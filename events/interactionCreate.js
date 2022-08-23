const replyToJoin = require('../interactions/replyToJoin');

const onInteractionCreate = {
  name: 'interactionCreate',
  async execute(interaction) {

    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (err) {
        console.error(err);
        await interaction.reply({ content: `There was an error executing command: ${command}`, ephemeral: true });
      }

      return;
    }

    if (interaction.isButton()) {
      // Process the button.
      console.log('interactionCreate isButton', interaction);

      await replyToJoin.execute(interaction);

      return;
    }
  }
}

module.exports = onInteractionCreate;
