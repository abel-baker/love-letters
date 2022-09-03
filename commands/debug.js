const { SlashCommandBuilder } = require('discord.js');
const Game = require('../classes/Game');
const { Verify } = require('../utils/check');
const startEmbed = require('../components/startEmbed');
const optionsButtons = require('../components/optionsButtons');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('debug')
    .setDescription('Debug the game of Love Letters.'),
  async execute(interaction) {
    const { client, guild, channel } = interaction;
    const address = `${guild}-${channel}`;

    console.log('Verify: ', await Verify.GameExists(client, address), await Verify.GameActive(client, address));

    const game = new Game(guild, channel);
    client.games.set(address, game);

    // Start and join game with me and two fake sweets william
    game.join(interaction.member);
    game.join(interaction.member);
    game.join(interaction.member);

    game.start();

    const embeds = [startEmbed(interaction)];
    const components = [optionsButtons()]

    await interaction.reply({ components, embeds });
  }
};