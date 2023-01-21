const config = require('../config.json');
const { SlashCommandBuilder } = require('discord.js');
const Game = require('../classes/Game');
const inviteEmbed = require('../components/invite/inviteEmbed');
const inviteButtons = require('../components/invite/inviteButtonsRow');

const slashNewGame = {
  data: new SlashCommandBuilder()
    .setName('newgame')
    .setDescription('Begin a new game of Love Letters.'),
  async execute(interaction) {
    const { client, guild, channel, member } = interaction;
    const address = `${guild}-${channel}`;

    // Verify no ongoing game (or open invitation) in this channel
    // Verify unique ongoing game (or open invitation) in this guild, if not allowed
    //   config.allow_multiple_games_per_guild

    // const ongoingGame = -interaction.client.game- client.games.get(address);

    // Confirm there is not already a game running elsewhere

    const game = new Game(interaction);

    // set game to client map
    client.games.set(address, game);

    // Add the calling user
    game.join(member);

    // Prep the invitation message
    const newEmbed = inviteEmbed(interaction);
    const row = inviteButtons(interaction);

    await interaction.reply({
      components: [row],
      embeds: [newEmbed],
    });
  }
};

module.exports = slashNewGame;
