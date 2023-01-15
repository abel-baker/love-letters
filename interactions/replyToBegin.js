const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const config = require('../config.json');
const { Verify } = require('../utils/check');
const wait = require('node:timers/promises').setTimeout;

const replyToBegin = {
  name: 'replyToBegin',
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
    
    await interaction.reply({ content: `:love_letter: Let's begin!` });

    await wait(1000);

    const drawButton = new ButtonBuilder()
      .setCustomId(`showHand`)
      .setLabel(`Draw`)
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder()
      .addComponents([drawButton]);

    await invitation.followUp({ 
      content: `:love_letter: You're the dealer!  Get us started by placing one card face-down and dealing one card to each player.  Then, you'll take your turn.  Draw one additional card and decide which of your two cards to play.`, 
      components: [row],
      ephemeral: true });
  }
}

module.exports = replyToBegin;