const Deck = require('./Deck');

// wrapper for discord.js GuildMember class
class Player {
  constructor(member, client) {
    this.member = member;

    this.eliminated = false;
    this.score = 0;
    this.hand = new Deck();
    this.history = new Array();
  }

  getDisplayName() {
    return this.member.displayName;
  }
}

module.exports = Player;
