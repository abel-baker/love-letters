const config = require('../config.json');

class Card {
  constructor(config) {
    this.name = config.name;
    this.props = config;
  }
}

const Cards = Object.freeze({
  PRINCESS: new Card(config.cards['princess']),
  COUNTESS: new Card(config.cards['countess']),
  KING: new Card(config.cards['king']),
  PRINCE: new Card(config.cards['prince']),
  HANDMAID: new Card(config.cards['handmaid']),
  BARON: new Card(config.cards['baron']),
  PRIEST: new Card(config.cards['priest']),
  GUARD: new Card(config.cards['guard']),
});

module.exports = { Card, Cards };
