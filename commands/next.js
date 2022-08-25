const { SlashCommandBuilder } = require('discord.js');
const Game = require('../classes/Game');
const { Verify } = require('../utils/check');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('next')
    .setDescription('Debug the next step of Love Letters.'),
  async execute(interaction) {
    const client = interaction.client;

    if (!await Verify.GameActive(client)) {
      await interaction.reply({ content: `No game or no game active`, ephemeral: true });
      return;
    }

    const game = client.game;
    game.advancePlayer();

    let index = game.turnIndex % game.players.size;
    const [activeMember, activePlayer] = game.currentPlayer();
    console.log(`Active member`, index, activeMember?.nickname);

    const nextMember = game.nextPlayer();

    const dealt = game.deal(activeMember);
    console.log(activeMember.nickname, [...activePlayer.hand].map(card => card.name));

    await interaction.reply({ content: `[${index}] ${activeMember.nickname} draws ${dealt.map(card => card.name).join(', ')}; holding ${[...activePlayer.hand].map(card => card.name).join(', ')}.  \nNext up, ${nextMember.nickname}` });

    // game.turnIndex = ++index;
  }
};