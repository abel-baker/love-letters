const { Verify } = require('../utils/check');
const inviteEmbed = require('../components/inviteEmbed');
const inviteButtons = require('../components/inviteButtons');
const { EmbedBuilder } = require('discord.js');

const replyToJoin = {
  name: 'replyToJoin',
  async execute(interaction) {
    const client = interaction.client;
    const game = client.game;

    const inviteMessage = interaction.message;
    const inviteCommand = inviteMessage.interaction;
    console.log(`Clicked join button from message from command`, inviteCommand.id);
    if (inviteCommand.id !== game.origin) {
      console.log(`Origin mismatch`, game.origin);
      const expiredEmbed = new EmbedBuilder().setDescription(`:crossed_swords: **Oh dear**, this invitation has expired.`);

      await interaction.update({ components: [], embeds: [...interaction.message.embeds, expiredEmbed] });
      return;
    }
    
    else console.log(`Origin match`, game.origin);

    // console.log(`Replying to invite ${interaction.customId}`);
    // const id = interaction.customId.split('/')[1];

    // console.log(`Latest invite ${game.latestInvite.id}`, id);
    // if (game.latestInvite.id !== id) {
    //   console.log(`invite id mismatch`);
    // }
    

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