const { SlashCommandBuilder } = require('discord.js');
const { Verify } = require('../utils/check');
const nextTurnEmbed = require('../components/nextTurnEmbed');
const optionsButtons = require('../components/optionsButtons');

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

    console.log(activeMember.nickname, [...activePlayer.hand].map(card => card.name));

    const matchActiveMember = await Verify.MemberIsCurrentPlayer(client, interaction.member);

    const embeds = [nextTurnEmbed(interaction)];
    const components = [optionsButtons(matchActiveMember)];

    await interaction.reply({ embeds, components });
  }
};