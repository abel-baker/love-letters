const config = require('../config.json');
const { Card, Cards } = require('./Card');

const standardDeck = [];

for (const card in config.cards) {
  for (let i = 0; i < config.cards[card].deck_quantity; i++) {
    standardDeck.push(Cards[card.toUpperCase()]);
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
}

module.exports = { Deck, standardDeck };
