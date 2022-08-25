const config = require('../config.json');
const { SlashCommandBuilder } = require('discord.js');
const Game = require('../classes/Game');
const inviteEmbed = require('../components/inviteEmbed');
const inviteButtons = require('../components/inviteButtons');

const slashNewGame = {
  data: new SlashCommandBuilder()
    .setName('newgame')
    .setDescription('Begin a new game of Love Letters.'),
  async execute(interaction) {
    const ongoingGame = interaction.client.game;

    // Confirm there is not already a game running elsewhere
    if (!config.debug && ongoingGame?.status === 'active') {
      await interaction.reply({ content: `There is already a game going on in ${ongoingGame.channel}.`, ephemeral: true });
      return;
    }

    const channel = interaction.channel;
    const guild = interaction.guild;

    const game = new Game(guild, channel);
    interaction.client.game = game;
    
    game.start();

    game.join(interaction.member);

    const newEmbed = inviteEmbed(interaction);
    const row = inviteButtons(game);

    await interaction.reply({
      components: [row],
      embeds: [newEmbed],
    });
  }
};

module.exports = slashNewGame;
