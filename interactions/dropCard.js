const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const menuButtons = require('../components/menuButtons');
const { Cards } = require('../classes/Card');
const wait = require('node:timers/promises').setTimeout;

const dropCard = {
  name: 'dropCard',
  async execute(interaction) {
    const { client, guild, channel, customId, member } = interaction;
    const address = `${guild}-${channel}`;
    const game = client.games.get(address);

    const player = game.players.get(member);

    const cardName = customId.split('/')[1];
    const card = Cards[cardName.toUpperCase()];

    if (!card) {
      const out = `${member.nickname || member.displayName} attempts to drop ${cardName}`;
      console.log(out);
      await interaction.reply({ content: out, ephemeral: true });
      return;
    }

    const played = player.play(card);
    // game.discard.push(played);
    console.log(`${member.nickname || member.displayName} drops ${card.name} from`, player.hand.map(card => card.name));

    const menu = menuButtons();
    await interaction.reply({
      content: `${member.nickname || member.displayName} drops a card.`,
      components: [menu] });

  }
}

module.exports = dropCard;
