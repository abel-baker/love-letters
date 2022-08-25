const { SlashCommandBuilder } = require('discord.js');
const Game = require('../classes/Game');
const { Cards } = require('../classes/Card');
const footer = require('../components/footer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('debug')
    .setDescription('Debug the game of Love Letters.'),
  async execute(interaction) {
    const client = interaction.client;
    const guild = interaction.guild;
    const channel = interaction.channel;

    const game = new Game(guild, channel);
    client.game = game;

    // Start and join game with me and two fake sweets william
    game.join(interaction.member);
    game.join(interaction.member);
    game.join(interaction.member);

    game.start();

    game.deal(interaction.member);

    game.players.get(interaction.member).play(Cards.GUARD);
    for (let [member, player] of game.players) {
      console.log(member.nickname, [...player.hand].map(card => card.name));
    }


    await interaction.reply({ content: footer(game).text, ephemeral: true });
  }
};