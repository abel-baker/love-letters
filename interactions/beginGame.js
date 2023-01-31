const { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const inviteButtons = require('../components/invite/inviteButtonsRow');
const menuButtons = require('../components/menuButtons');
const announceDealEmbed = require('../components/embeds/announceDeal');
const { Verify } = require('../utils/check');
const wait = require('node:timers/promises').setTimeout;

const beginGame = {
  name: 'beginGame',
  async execute(interaction) {
    if (!Verify.GameExists(interaction.client)) {
      await interaction.reply({ content: `Error beginning game: Doesn't look like there is a game going on.`, ephemeral: true });
      return;
    }

    const { client, guild, channel, member } = interaction;
    const address = `${guild}-${channel}`;
    const game = client.games.get(address);

    // Validation
    if (!game.isPlaying(member)) {
      await interaction.reply({ content: `Error beginning game: It doesn't look like you are playing this round.`, ephemeral: true });
      return;
    }
    
    const invitation = game.invitation;

    game.beginGame();
    
    // Disable invitation buttons
    await invitation.editReply({ components: [inviteButtons(invitation)] });

    await channel.sendTyping();

    // Dealer

    await wait(500);
    const publicMessage = await interaction.reply({ 
      fetchReply: true,
      // content: `:love_letter: Let's begin!  The dealer sets aside one card *face-down*, ${game.twoPlayerGame? `lays three cards *face-up*, ` : ``}then deals a card to each player.`,
      embeds: [announceDealEmbed(game)],
      components: [menuButtons()] });

    game.commandMessages.push(publicMessage);

    // await wait(500);
    // const drawButton = new ButtonBuilder()
    //   .setCustomId(`drawCard`)
    //   .setLabel(`Draw`)
    //   .setStyle(ButtonStyle.Primary);

    // const row = new ActionRowBuilder()
    //   .addComponents([drawButton]);

    // await invitation.followUp({ 
    //   content: `:love_letter: You're the dealer!  That means you are the starting player.  Draw one additional card and decide which of your two cards to play.`, 
    //   components: [row],
    //   ephemeral: true });
  }
}

module.exports = beginGame;