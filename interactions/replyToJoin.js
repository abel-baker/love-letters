const { Verify } = require('../utils/check');
const inviteEmbed = require('../components/invite/inviteEmbed');
const inviteButtons = require('../components/invite/inviteButtonsRow');
const expiredEmbed = require('../components/expiredEmbed');

const replyToJoin = {
  name: 'replyToJoin',
  async execute(interaction) {
    const { client, guild, channel } = interaction;
    const address = `${guild}-${channel}`;
    const game = client.games.get(address);

    const inviteMessage = interaction.message;
    const inviteCommand = inviteMessage.interaction;
    console.log(`Clicked join button from message from command`, inviteCommand.id);
    
    if (inviteCommand.id !== game.origin) {
      console.log(`Origin mismatch`, game.origin);

      await interaction.update({ components: [], embeds: [...interaction.message.embeds, expiredEmbed] });
      return;
    }
    
    else console.log(`Origin match`, game.origin);    

    if (!Verify.GameExists(client)) {
      await interaction.reply({ content: `Doesn't look like there is a game afoot`, ephemeral: true });
      return;
    }
    const success = game.join(interaction.member);

    if (success) {
      const newEmbed = inviteEmbed(interaction);
      const newButtons = inviteButtons(interaction);
      
      await interaction.channel.send({ content: `:love_letter: **${interaction.member.displayName}** accepted the invite!` });
      await interaction.update({ embeds: [newEmbed], components: [newButtons] });
    } else {
      await interaction.reply({ content: `Unable to join; is there a game and are you already playing it?`, ephemeral: true });
    }
  }
}

module.exports = replyToJoin;