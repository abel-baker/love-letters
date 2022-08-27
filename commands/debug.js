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
    const client = interaction.client;
    const { guild, channel } = interaction;
    const address = `${guild}-${channel}`;

    console.log('Verify: ', await Verify.GameExists(client, address), await Verify.GameActive(client, address));

    // if (await Verify.GameExists(client)) console.log(`Game verified with auth`);
    // else console.log(`No game verified with auth`);

    const game = new Game(guild, channel);
    client.games.set(address, game);

    // console.log('Verify: ', await Verify.GameExists(client), await Verify.GameActive(client));

    // Start and join game with me and two fake sweets william
    const member = interaction.member;
    console.log('sweet william: ', member);
    game.join(interaction.member);
    game.join(interaction.member);
    game.join(interaction.member);

    game.start();

    const embeds = [startEmbed(interaction)];
    const components = [optionsButtons()]

    // console.log('Verify: ', await Verify.GameExists(client), await Verify.GameActive(client));

    // if (await Verify.GameExists(client)) console.log(`Game verified with auth`);
    // else console.log(`No game verified with auth`);

    await interaction.reply({ components, embeds });
  }
};