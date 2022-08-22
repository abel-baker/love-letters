const Player = require('./Player');
const Deck = require('./Deck');

class Game {
  constructor(config) {
    this.config = config;

    this.new();
  }

  new() {
    this.status = 'inactive';

    // map GuildMember -> Player
    this.players = new Map();

    // set of GuildMember to add/create (map) or remove
    this.queueJoin = new Set();
    this.queueLaeve = new Set();

    this.reset();
  }

  // Resets decks, play history, and Player hands
  reset() {
    this.deck = new Deck([]);
    this.aside = new Deck([]);
    this.faceup = new Deck([]);

    // Iterate through Players and clear their hands
    for (const member of this.players) {
      this.players.get(member).clearHand();
    }

    this.history = new Set();
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
