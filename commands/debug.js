const { SlashCommandBuilder } = require('discord.js');
const Game = require('../classes/Game');
const { Verify } = require('../utils/check');
const menuButtons = require('../components/menuButtons');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('debug')
    .setDescription('Debug the game of Love Letters.'),
  async execute(interaction) {
    const { client, guild, channel } = interaction;
    const address = `${guild}-${channel}`;

    // console.log('Verify: ', await Verify.GameExists(client, address), await Verify.GameActive(client, address));

    const game = new Game(guild, channel);
    client.games.set(address, game);

    // Start and join game with me and two fake sweets william
    game.join(interaction.member);
    game.join(interaction.member);
    game.join(interaction.member);

    game.beginGame();

    // const embeds = [startEmbed(interaction)];
    // const components = [optionsButtons()]

    // await interaction.reply({ components, embeds });

    await channel.sendTyping();

    // Dealer

    await wait(500);
    const menu = menuButtons();
    const publicMessage = await interaction.reply({ 
      fetchReply: true,
      content: `:love_letter: Let's begin!  The dealer sets aside one card *face-down*, ${game.twoPlayerGame? `lays three cards *face-up*, ` : ``}then deals a card to each player.`,
      components: [menu] });

    game.commandMessages.push(publicMessage);

  }
};