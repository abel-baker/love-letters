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

    await interaction.reply({ content: `Starting game with: \n${
      [...game.players].map(([member, player]) => {
        return `${member.nickname}, holding ${player.hand.map(card => card.name)}`
      }).join('\n')
    }` });
  }
};