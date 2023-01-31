const config = require('../config.json');
const clearActionButtons = require('../utils/clearActionButtons');
const menuButtons = require('../components/menuButtons');
const playResultEmbed = require('../components/embeds/playResult');
const { Cards } = require('../classes/Card');
const wait = require('node:timers/promises').setTimeout;

const playCard = {
  name: 'playCard',
  async execute(interaction) {
    const { client, guild, channel, customId, member } = interaction;
    const address = `${guild}-${channel}`;
    const game = client.games.get(address);

    // console.log(`Active player: ${game.currentPlayer().member.nickname}`);
    const cardName = customId.split('/')[1];
    const card = Cards[cardName.toUpperCase()];

    const player = game.players.get(member);

    if (!card) {
      const out = `${player.name} attempts to play ${cardName}`;
      console.log(out);
      await interaction.reply({ content: out, ephemeral: true });
      return;
    }

    const played = player.play(card)[0];
    game.discard.push(played);
    console.log(`${player.name} plays ${card.name} from`, player.hand.map(card => card.name));

    const playResult = {
      player,
      playedCard: played
    }
    
    await channel.sendTyping();
    await wait(500);
    await interaction.update({ components: [] });
    const publicMessage = await interaction.channel.send({
      // content: `${member.nickname || member.displayName} plays ${card.props.value_emoji} ${card.name}`,
      embeds: [playResultEmbed(playResult)],
      components: [menuButtons()],
      fetchReply: true
    });

    clearActionButtons(publicMessage, game);
  }
}

module.exports = playCard;
