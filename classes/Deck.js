const { Card, Cards } = require('./Card');

class Deck extends Array {
  constructor(source = [Cards.PRINCESS, Cards.COUNTESS, Cards.PRINCE]) {
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

module.exports = Deck;