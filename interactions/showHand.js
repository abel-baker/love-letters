const { Verify } = require('../utils/check');
const showHandEmbed = require('../components/embeds/showHand');
const playButtons = require('../components/playButtons');

const showHand = {
  name: 'showHand',
  async execute(interaction) {
    const { client, guild, channel, member } = interaction;
    const address = `${guild}-${channel}`;
    const game = client.games.get(address);

    const player = game.players.get(member);

    // Verify member is playing
    // if (!await Verify.MemberIsInGame(client, address, interaction.member)) {
    //   await interaction.reply({ content: `Doesn't look like you are playing this game`, ephemeral: true });
    //   return;
    // }

    // Validation
    if (!game.isPlaying(member)) {
      await interaction.reply({ content: `Error beginning game: It doesn't look like you are playing this round.`, ephemeral: true });
      return;
    }

    const expanded = interaction.customId.split('/')[1] == 'expand';

    const hand = game.players.get(member).hand;
    // const current = game.isCurrentPlayer(member);
    const components = playButtons(hand, expanded);

    await interaction.reply({ 
      // content: `Your hand contains  ${hand.map(card => card.props.label).join(' &  ')}.`, 
      embeds: [showHandEmbed({ player })],
      components,
      ephemeral: true });
  }
}

module.exports = showHand;
