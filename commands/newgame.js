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
    // Verify no ongoing game (or open invitation) in this channel
    // Verify unique ongoing game (or open invitation) in this guild, if not allowed
    //   config.allow_multiple_games_per_guild


    const ongoingGame = interaction.client.game;

    // Confirm there is not already a game running elsewhere
    if (!config.debug && ongoingGame?.status === 'active') {
      await interaction.reply({ content: `There is already a game going on in ${ongoingGame.channel}.`, ephemeral: true });
      return;
    }

    const invite = new Invite(interaction);

    const { client, guild, channel } = interaction;
    const address = `${guild}-${channel}`;

    const game = new Game(guild, channel);
    game.lastInvitation = invite;

    // set game to client map
    client.games.set(address, game);

    console.log(`Creating new Game from command`, interaction.id);
    
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
