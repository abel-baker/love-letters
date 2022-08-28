const config = require('../config.json');
const { Cards } = require('./Card');

const standardDeck = [];

for (const card in config.cards) {
  for (let i = 0; i < config.cards[card].deck_quantity; i++) {
    standardDeck.unshift(Cards[card.toUpperCase()]);
  }
}

class Deck extends Array {
  constructor(...source) { 
    super(...source);
  }

  shuffle() {
    let m = this.length, i;

    while (m) {
      i = Math.floor(Math.random() * m--);

      [this[m], this[i]] = [this[i], this[m]];
    }

    return this;
  }

  draw(count = 1) {
    const drawn = [];
    for (let i = 0; i < count; i++) {
      drawn.push(this.pop());
    }
    return drawn;
  }
}

module.exports = { Deck, standardDeck };
