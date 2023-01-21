const { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const inviteButtons = require('../components/invite/inviteButtonsRow');
const config = require('../config.json');
const { Verify } = require('../utils/check');
const wait = require('node:timers/promises').setTimeout;

const beginGame = {
  name: 'beginGame',
  async execute(interaction) {
    if (!Verify.GameExists(interaction.client)) {
      await interaction.reply({ content: `Doesn't look like there is a game afoot`, ephemeral: true });
      return;
    }

    const { client, guild, channel } = interaction;
    const address = `${guild}-${channel}`;
    const game = client.games.get(address);

    const invitation = game.invitation;

    game.beginGame();
    
    // Disable invitation buttons
    await invitation.editReply({ components: [inviteButtons(invitation)] });

    await channel.sendTyping();

    await wait(500);
    await interaction.reply({ content: `:love_letter: Let's begin!  **${invitation.member.displayName || invitation.member.nickname}** is the dealer and sets aside one card, *face-down*.  They will then draw and play a card first.` });


    await wait(500);
    const drawButton = new ButtonBuilder()
      .setCustomId(`drawCard`)
      .setLabel(`Draw`)
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder()
      .addComponents([drawButton]);

    await invitation.followUp({ 
      content: `:love_letter: You're the dealer!  That means you are the starting player.  Draw one additional card and decide which of your two cards to play.`, 
      components: [row],
      ephemeral: true });
  }
}

module.exports = beginGame;