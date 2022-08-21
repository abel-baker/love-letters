const Player = require('./Player');
const Deck = require('./Deck');

class Game {
  constructor(config) {
    this.status = 'inactive';

    this.players = new Map();
    this.queueJoin = new Set();
    this.queueLaeve = new Set();

    this.deck = new Deck([]);
    this.aside = new Deck([]);
    this.faceup = new Deck([]);
    
    this.history = new Set();
  }

  new() {
    this.status = 'inactive';
    this.players = new Map();
  }

  start() {
    this.status = 'active';
  }

  join(member) {
    if (this.players.has(member)) return false;

    this.players.set(member, new Player(member));
    return true;
  }

  playing() {
    return [...this.players.values()].map(player => player.getDisplayName()).join(',');
    // return this.players;
  }

}

module.exports = Game;
