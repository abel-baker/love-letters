const config = require('../config.json');
const wait = require('node:timers/promises').setTimeout;
const menuButtons = require('../components/menuButtons');
const playButtons = require('../components/playButtons');
const announceDrawEmbed = require('../components/embeds/announceDraw');
const drawResultEmbed = require('../components/embeds/drawResult');
const prettyJoin = require('../utils/prettyJoin');

const drawCard = {
  name: 'drawCard',
  async execute(interaction) {
    const { client, guild, channel, member, user } = interaction;
    const address = `${guild}-${channel}`;
    const game = client.games.get(address);

    // const current = game.isCurrentPlayer(member);
    
    // await channel.sendTyping();
    await interaction.deferUpdate();

    const player = game.getPlayer(member);
    let drawResult = game.deal(player,1);
    if (drawResult.success) {
      console.log(`${player.name} draws`, drawResult.drawn.map(card => card.name),  `into`, player.hand.map(card => card.name));
    } else {
      await interaction.reply({ content: drawResult.error, ephemeral: true });
      return;
    }

    
    const hand = game.players.get(member).hand;
    hand.sort((a, b) => { b.props.value - a.props.value });
    
    const components = playButtons(hand);

    // "**player** draws a card"
    const embed = announceDrawEmbed(drawResult);
    
    // Show public response to draw action
    const publicMessage = await interaction.channel.send({ 
      fetchReply: true,
      embeds: [embed], 
      components: [menu]
    });

    // Remove components (buttons) from prior action messages
    for (let message of game.commandMessages) {
      message.edit({ components: [] });
    }
    game.commandMessages = [];

    game.commandMessages.push(publicMessage);

        
    await wait(500);
    // Send private response to draw action
    // "You draw ..."
    await interaction.followUp({ 
      components, 
      content: `Your hand contains ${prettyJoin(hand.map(card => `${card.props.article} ${card.props.value_emoji} **${card.name}**`))}.`, 
      embeds: [drawResultEmbed(drawResult)],
      ephemeral: true });
    
    
    // await wait(500);
    
    // Remove the buttons from the origin message
    // await interaction.message.edit({ components: [] });
    // await interaction.message.delete();


    // await interaction.channel.send({
    //   embeds: [{
    //     color: 10726059,
    //     description: `You're up, **next player**`,
    //   }],
    //   components: [menu]
    // });


    // await interaction.channel.send({
    //   embeds: [
    //     {
    //       hexColor: "#FFFFFF",
    //       footer: {
    //         text: `What next?`
    //       }
    //     }
    //   ],
    //   components: [menu]
    // })
    
    // await interaction.deferUpdate();

    // game.latestActionInteraction = interaction;
    // await wait(1000);
  }
}

module.exports = drawCard;
