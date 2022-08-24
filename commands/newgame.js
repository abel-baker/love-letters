const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const Game = require('../classes/Game');
const config = require('../config.json');
const footer = require('../components/footer');
const inviteEmbed = require('../components/inviteEmbed');

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

const row = new ActionRowBuilder()
  .addComponents([buttonJoinNewGame, buttonLeaveGame, buttonBeginNewGame]);

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
    // await interaction.reply({ content: `Created game in ${game.address}`, ephemeral: true });

    game.join(interaction.member);

    // const embed = {
    //   color: config.embed_color,
    //   thumbnail: { url: interaction.user.displayAvatarURL() },

    //   // author: {
    //   //   name: `${interaction.member.displayName} wants to play!`,
    //   //   iconURL: config.bot_avatar_url
    //   // },

    //   title: `You're invited!`,
    //   description: `**${interaction.member.displayName}** wants to play **Love Letters**!  Click the **Join** button to play along.`,

    //   footer: footer(game)
    // }

    const newEmbed = inviteEmbed(interaction);

    await interaction.reply({
      // content: `**${interaction.member.displayName}** would like to play Love Letters!`,
      components: [row],
      embeds: [newEmbed],
    });
  }
};

module.exports = slashNewGame;
