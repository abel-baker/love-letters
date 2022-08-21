const Player = require('./Player');

class Game {
  constructor(config) {
    this.status = 'inactive';
    this.players = new Map();
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
