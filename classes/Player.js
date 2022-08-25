const { Deck } = require('./Deck');

// wrapper for discord.js GuildMember class
class Player {
  constructor(member) {
    this.member = member;

    this.eliminated = false;
    this.score = 0;
    this.hand = new Deck();
    this.history = new Array();
  }

  getDisplayName() {
    return this.member.displayName;
  }

  clearHand() {
    this.hand = new Deck();
  }
  draw(card) {
    this.hand.push(card);
    return this.hand;
  }
  play(card) {
    if (this.hand.includes(card)) {
      // Remove and return card
    }
  }
}

module.exports = Player;
