const { Verify } = require('../utils/check');
const playButtons = require('../components/playButtons');


const expandMore = {
  name: 'expandMore',
  async execute(interaction) {
    const { client, guild, channel, member } = interaction;
    const address = `${guild}-${channel}`;
    const game = client.games.get(address);

    const hand = game.players.get(member).hand;

    // Get existing buttons
    await interaction.update({ components: playButtons(hand, true) });

    // await interaction.reply({ 
    //   content: `Your hand contains  ${hand.map(card => card.props.label).join(' &  ')}.`, 
    //   components,
    //   ephemeral: true });
  }
}

module.exports = expandMore;