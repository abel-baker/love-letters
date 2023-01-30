const config = require('../config.json');
const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const menuButtons = require('../components/menuButtons');
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
    // if (card) {
    //   const out = `${member.nickname || member.displayName} plays ${card.name}`;
    //   console.log(out);
    //   await interaction.reply({ content: out })
    // } else { }

    const player = game.players.get(member);

    if (!card) {
      const out = `${member.nickname || member.displayName} attempts to play ${cardName}`;
      console.log(out);
      await interaction.reply({ content: out, ephemeral: true });
      return;
    }

    const menu = menuButtons();

    const played = player.play(card)[0];
    game.discard.push(played);
    console.log(`:love_letter: ${member.nickname || member.displayName} plays ${card.name} from`, player.hand.map(card => card.name));

    const embed = {
      color: config.embed_color,
      // thumbnail: { url: interaction.user.displayAvatarURL() },

      author: {
        name: `${member.nickname || member.displayName} plays ${played.props.article} ${played.props.value_emoji} ${played.name}.`,
        // iconURL: interaction.user.displayAvatarURL()
      },

      thumbnail: { url: interaction.user.displayAvatarURL() },

      fields: [
        {
          name: `${played.props.value_emoji} ${played.name.charAt(0).toUpperCase() + played.name.slice(1)}`,
          value: `${played.props.rules}`
        }
      ],

      footer: {
        iconURL: config.bot_avatar_url,
        text: `Next player: next-player`
      },

      // description: `:love_letter: **${member.nickname || member.displayName}** draws a card.`
    };
    
    await channel.sendTyping();
    await wait(500);
    await interaction.update({ components: [] });
    await interaction.channel.send({
      // content: `${member.nickname || member.displayName} plays ${card.props.value_emoji} ${card.name}`,
      embeds: [embed],
      components: [menu] });

    // const drawButton = new ButtonBuilder()
    //   .setCustomId(`drawCard`)
    //   .setLabel(`Draw`)
    //   .setStyle(ButtonStyle.Primary);

    // const row = new ActionRowBuilder()
    //   .addComponents([drawButton]);
      
    // await wait(500);
    // await interaction.followUp({ 
    //   content: `:love_letter: Your turn!`, 
    //   components: [row] });


    // const player = game.getPlayer(member);
    // let dealt = game.deal(player,1);
    // console.log(`${member.displayName || member.nickname} draws`, dealt.map(card => card.name),  `into`, player.hand.map(card => card.name));

    // // Deactivate Draw button
    // const disabledDrawButton = new ButtonBuilder()
    //   .setCustomId(`drawCard`)
    //   .setLabel(`Drawing...`)
    //   .setStyle(ButtonStyle.Secondary)
    //   .setDisabled(true);

    // const row = new ActionRowBuilder()
    //   .addComponents([disabledDrawButton]);
    // interaction.update({ components: [row] });


    // const hand = game.players.get(member).hand;
    // const current = game.isCurrentPlayer(member);
    // const components = playButtons(hand, current);


    // await channel.sendTyping();
    // await wait(500);
    // await interaction.channel.send({ content: `:love_letter: **${interaction.member.displayName}** draws a card.` });
    
    // await wait(500);
    // await interaction.followUp({ components: [components], content: `Your hand contains  ${hand.map(card => card.props.label).join(' &  ')}.  You ${current? `are` : `are not`} the current player.`, ephemeral: true });
  }
}

module.exports = playCard;
