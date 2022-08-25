const { Verify } = require('../utils/check');
const playButtons = require('../components/playButtons');

const showHand = {
  name: 'showHand',
  async execute(interaction) {
    console.log(`Clicked show hand button`);

    const client = interaction.client;
    const game = client.game;

    // Verify member is playing
    if (!await Verify.MemberIsInGame(client, interaction.member)) {
      await interaction.reply({ content: `Doesn't look like you are playing this game`, ephemeral: true });
      return;
    }

    const hand = game.players.get(interaction.member).hand;
    const components = playButtons(hand);

    await interaction.reply({ components: [components], content: `Your hand contains  ${hand.map(card => card.props.label).join(' &  ')}.  You ${await Verify.MemberIsCurrentPlayer(client, interaction.member)? `are` : `are not`} the current player.`, ephemeral: true });
  }
}

module.exports = showHand;