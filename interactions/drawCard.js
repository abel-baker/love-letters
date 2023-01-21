const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const playButtons = require('../components/playButtons');
const wait = require('node:timers/promises').setTimeout;

const drawCard = {
  name: 'drawCard',
  async execute(interaction) {
    const { client, guild, channel, member } = interaction;
    const address = `${guild}-${channel}`;
    const game = client.games.get(address);

    console.log(`Active player: ${game.currentPlayer().member.nickname}`);

    const player = game.getPlayer(member);
    let dealt = game.deal(player,1);
    console.log(`${member.displayName || member.nickname} draws`, dealt.map(card => card.name),  `into`, player.hand.map(card => card.name));

    // Deactivate Draw button
    const disabledDrawButton = new ButtonBuilder()
      .setCustomId(`drawCard`)
      .setLabel(`Drawing...`)
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(true);

    const row = new ActionRowBuilder()
      .addComponents([disabledDrawButton]);
    interaction.update({ components: [row] });


    const hand = game.players.get(member).hand;
    const current = game.isCurrentPlayer(member);
    const components = playButtons(hand, current);


    await channel.sendTyping();
    await wait(500);
    await interaction.channel.send({ content: `:love_letter: **${interaction.member.displayName}** draws a card.` });
    
    await wait(500);
    await interaction.followUp({ components: [components], content: `Your hand contains  ${hand.map(card => card.props.label).join(' &  ')}.  You ${current? `are` : `are not`} the current player.`, ephemeral: true });
  }
}

module.exports = drawCard;
