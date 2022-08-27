const { SlashCommandBuilder } = require('discord.js');
const { Verify } = require('../utils/check');
const nextTurnEmbed = require('../components/nextTurnEmbed');
const optionsButtons = require('../components/optionsButtons');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('next')
    .setDescription('Debug the next step of Love Letters.'),
  async execute(interaction) {
    const { client, guild, channel } = interaction;
    const address = `${guild}-${channel}`;


    if (!await Verify.GameActive(client, address)) {
      await interaction.reply({ content: `No game or no game active`, ephemeral: true });
      return;
    }

    const game = client.games.get(address);
    game.advancePlayer();

    let index = game.turnIndex % game.players.size;
    const [activeMember, activePlayer] = game.currentPlayer();

    const matchActiveMember = await Verify.MemberIsCurrentPlayer(client, address, interaction.member);

    const embeds = [nextTurnEmbed(interaction)];
    const components = [optionsButtons(matchActiveMember)];

    await interaction.reply({ embeds, components });
  }
};