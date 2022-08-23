const Player = require('./Player');
const Deck = require('./Deck');

class Game {
  constructor(guild, channel) {
    this.guild = guild;
    this.channel = channel;

    this.new();
  }

  new() {
    this.status = 'inactive';

    // map GuildMember -> Player
    this.players = new Map();

    // set of GuildMember to add/create (map) or remove
    this.queueJoin = new Set();
    this.queueLeave = new Set();

    this.resetCards();
  }

  // Resets decks, play history, and Player hands
  resetCards() {
    this.deck = new Deck();
    this.aside = new Deck([]);
    this.faceup = new Deck([]);

    this.deck.shuffle();

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
    try {
      if (this.players.has(member)) return false;
  
      this.players.set(member, new Player(member));
      return true;
    } catch(err) {
      console.log('There was an error adding member to game', member, err);
    }
  }

  playing() {
    return [...this.players.values()].map(player => player.getDisplayName()).join(',');
    // return this.players;
  }
  refreshPlayers() {
    // Remove any players who left before this round
    for (let queuedMember of this.queueLeave) {
      this.players.delete(queuedMember);
    }
    this.queueLeave = new Set();

    // Add any players who joined during a hand
    for (let queuedMember of this.queueJoin) {
      // future: lookup member for existing Player object, or check db, and use that instead
      this.players.set(queuedMember, new Player(member));
    }
    this.queueJoin = new Set();
  }

}

module.exports = Game;
