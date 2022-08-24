const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const Game = require('../classes/Game');
const config = require('../config.json');
const footer = require('../components/footer');
const inviteEmbed = require('../components/inviteEmbed');
const inviteButtons = require('../components/inviteButtons');

const buttonJoinNewGame = new ButtonBuilder()
  .setCustomId('replyToJoin')
  .setLabel('Join')
  .setStyle(ButtonStyle.Primary)
  .setEmoji('💌');
const buttonLeaveGame = new ButtonBuilder()
  .setCustomId('replyToLeave')
  .setLabel('Leave')
  .setStyle(ButtonStyle.Secondary)
const buttonBeginNewGame = new ButtonBuilder()
  .setCustomId('replyToBegin')
  .setLabel('Play!')
  .setStyle(ButtonStyle.Secondary)
  .setDisabled(true);

// const row = new ActionRowBuilder()
//   .addComponents([buttonJoinNewGame, buttonLeaveGame, buttonBeginNewGame]);

const slashNewGame = {
  data: new SlashCommandBuilder()
    .setName('newgame')
    .setDescription('Begin a new game of Love Letters.'),
  async execute(interaction) {
    const ongoingGame = interaction.client.game;

    // Confirm there is not already a game running elsewhere
    if (ongoingGame?.status === 'active') {
      await interaction.reply({ content: `There is already a game going on in ${ongoingGame.channel}.`, ephemeral: true });
      return;
    }

    const channel = interaction.channel;
    const guild = interaction.guild;
    const client = interaction.client;

    const game = new Game(guild, channel);
    interaction.client.game = game;
    
    game.new();
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
