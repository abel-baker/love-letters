const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const Game = require('../classes/Game');

const buttonJoinNewGame = new ButtonBuilder()
  .setCustomId('replyToJoin')
  .setLabel('Join')
  .setStyle(ButtonStyle.Primary)
  .setEmoji('💌');
const row = new ActionRowBuilder()
  .addComponents(buttonJoinNewGame);

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

    const game = new Game(guild, channel);
    interaction.client.game = game;
    
    game.new();
    game.start();
    await interaction.reply({ content: `Created game in ${game.address}`, ephemeral: true });

    await interaction.channel.send({
      content: `**${interaction.member.displayName}** would like to play Love Letters!`,
      components: [row]
    });

    game.join(interaction.member);
  }
};

module.exports = slashNewGame;
