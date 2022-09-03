const config = require('../config.json');
const { Verify } = require('../utils/check');
const { SlashCommandBuilder } = require('discord.js');
const Game = require('../classes/Game');
const Invite = require('../classes/Invite');
const inviteEmbed = require('../components/invite/inviteEmbed');
const inviteButtons = require('../components/invite/inviteButtonsRow');

const slashNewGame = {
  data: new SlashCommandBuilder()
    .setName('newgame')
    .setDescription('Begin a new game of Love Letters.'),
  async execute(interaction) {
    const { client, guild, channel } = interaction;
    const address = `${guild}-${channel}`;

    // Verify no ongoing game (or open invitation) in this channel
    // Verify unique ongoing game (or open invitation) in this guild, if not allowed
    //   config.allow_multiple_games_per_guild

    // const ongoingGame = interaction.client.game;

    // Confirm there is not already a game running elsewhere

    const game = new Game(guild, channel);

    const invite = new Invite(interaction);
    game.processNewInvitation(invite);

    // set game to client map
    client.games.set(address, game);

    console.log(`Creating new Game from command`, interaction.id);
    
    // + this should actually happen after selecting to Play
    game.start();

    game.join(interaction.member);

    game.origin = interaction.id;
    const newEmbed = inviteEmbed(interaction);
    const row = inviteButtons(interaction);

    await interaction.reply({
      components: [row],
      embeds: [newEmbed],
    });
  }
};

module.exports = slashNewGame;
