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

  get displayName() {
    return this.member.nickname;
  }
  get nickname() {
    return this.member.nickname;
  }

  isMember(testPlayer) {
    return testPlayer.member == this.member;
  }

  clearHand() {
    this.hand = new Deck();
  }
  draw(...cards) {
    this.hand.push(...cards);
    return this.hand; 
  }
  drawFrom(deck, count = 1) {
    const drawn = deck.draw(count);
    this.hand.push(...drawn);
    // console.log('Player::adding',drawn.map(card => card.name),'to hand',this.hand.map(card => card.name));
    return drawn;
  }
  play(card) {
    if (this.hand.includes(card)) {
      // Remove and return card
      const index = this.hand.indexOf(card);
      const played = this.hand.splice(index, 1);

      return played;
    } else {
      console.log(`${card.name} not found in hand`);
    }
  }
}

module.exports = Player;
