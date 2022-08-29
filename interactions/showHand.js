const { Verify } = require('../utils/check');
const playButtons = require('../components/playButtons');

const showHand = {
  name: 'showHand',
  async execute(interaction) {
    const { client, guild, channel, member } = interaction;
    const address = `${guild}-${channel}`;
    const game = client.games.get(address);

    // Verify member is playing
    if (!await Verify.MemberIsInGame(client, address, interaction.member)) {
      await interaction.reply({ content: `Doesn't look like you are playing this game`, ephemeral: true });
      return;
    }

    const hand = game.players.get(member).hand;
    const components = playButtons(hand, await Verify.MemberIsCurrentPlayer(client, address, member));

    await interaction.reply({ components: [components], content: `Your hand contains  ${hand.map(card => card.props.label).join(' &  ')}.  You ${await Verify.MemberIsCurrentPlayer(client, address, member)? `are` : `are not`} the current player.`, ephemeral: true });
  }
}

module.exports = showHand;