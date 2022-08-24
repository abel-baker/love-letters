const footer = require('../components/footer');

const replyToJoin = {
  name: 'replyToJoin',
  async execute(interaction) {
    const game = interaction.client.game;
    const success = game?.join(interaction.member);

    if (success) {
      const receivedEmbed = interaction.message.embeds[0];

      const newEmbed = { ...receivedEmbed.data, 
        footer: footer(game)
      };
      
      await interaction.channel.send({ content: `:love_letter: **${interaction.member.displayName}** accepted the invite!` });
      await interaction.update({ embeds: [newEmbed] });
    } else {
      await interaction.reply({ content: `Unable to join; is there a game and are you already playing it?`, ephemeral: true });
    }

  }

}

module.exports = replyToJoin;