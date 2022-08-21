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

    this.players.add(member);
    return true;
  }

  playing() {
    return [...this.players].map(player => player.getDisplayName()).join(',');
    // return this.players;
  }

}

module.exports = Game;
