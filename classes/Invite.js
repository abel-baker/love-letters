const InviteComponents = require('../components/invite');

class Invite {
  // Accepts and interaction object
  constructor(interaction) {
    // this.messageId = interaction.fetchReply().id;
    this.guildId = interaction.guild.id;
    this.channelId = interaction.channel.id;
    console.log(`Creating new Invite in ${this.guildId}-${this.channelId}`);

    this.creator = interaction.member;
    this.active = false;
  }

  get address() {
    return { guildId, channelId };
  }
  // The initial reply to this interaction
  get message() {
    return interaction.fetchReply();
  }

  deploy() {
    return {
      embeds,
      // invite buttons row
      components
    }
  }

  embed() {

  }

}

module.exports = Invite;