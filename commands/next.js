const { SlashCommandBuilder } = require('discord.js');
const Game = require('../classes/Game');
const { Cards } = require('../classes/Card');
const footer = require('../components/footer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('next')
    .setDescription('Debug the next step of Love Letters.'),
  async execute(interaction) {
    const client = interaction.client;
    const guild = interaction.guild;
    const channel = interaction.channel;

    const game = client.game;
    let index = game.turnIndex % game.players.size;
    const [activeMember, activePlayer] = game.currentPlayer();
    console.log(`Active member`, index, activeMember?.nickname);

    const dealt = game.deal(activeMember);
    console.log(activeMember.nickname, [...activePlayer.hand].map(card => card.name));

    await interaction.reply({ content: `[${index}] ${activeMember.nickname} draws ${dealt.map(card => card.name).join(', ')}; holding ${[...activePlayer.hand].map(card => card.name).join(', ')}.  \nNext up, ${game.nextPlayer()[0].nickname}` });

    // game.turnIndex = ++index;
  }
};