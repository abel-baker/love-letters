const config = require('../config.json');
const Player = require('./Player');
const { Deck, standardDeck } = require('./Deck');
const { Card } = require('./Card');

class Game {
  constructor(guild, channel) {
    this.guild = guild;
    this.channel = channel;

    console.log(`Creating new game in ${this.address}`);

    this.new();
    this.turnIndex = 0;

    this.pastInvitations = [];
    this.lastInvitation;
  }

  get address() {
    return `${this.guild.id}-${this.channel.id}`;
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


  start() {
    this.status = 'active';

    this.setAside();
    console.log(`Setting aside ${this.aside.name}`);

    for (let [member, player] of this.players) {
      this.deal(player, 1);
    }
  }


  ///// DECK FUNCTIONS /////

  // Resets decks, play history, and Player hands
  resetCards() {
    this.deck = new Deck(...standardDeck);
    this.aside = new Card({ name: "knave" });
    this.faceup = new Deck();

    this.deck.shuffle();

    // Iterate through Players and clear their hands
    for (const [member, player] of this.players) {
      player.clearHand();
    }

    this.history = new Set();
  }
  setAside() {
    this.aside = this.deck.pop();
    return this.aside;
  }
  deal(player, count = 1) {
    const dealt = player.drawFrom(this.deck, count);
    return dealt;
  }


  ///// PLAYER FUNCTIONS /////

  join(member) {
    if (this.players.has(member)) {
      if (config.debug) {
        const fakeMember = { ...member, nickname: `fake ${member.nickname}` };
        this.players.set(fakeMember, new Player(fakeMember));
        return true;
      }
      return false;
    }

    this.players.set(member, new Player(member));
    return true;
  }
  leave(member) {
    // If the Game's list of players contains the player in question, remove them.
    if (this.players.has(member)) {
      // Add them to the remove queue
      // this.queueLeave.push(member);

      this.players.delete(member);
      return true;
    } else {
      return false;
    }
  }

  playing() {
    const playing = Array.from(this.players, ([key, value]) => value);
    return playing;
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

  isPlaying(query) {
    // Allow either a GuildMember or a Player as query
    return this.players.has(query) || [...this.players.values()].includes(query);
  }

  currentPlayer() {
    this.turnIndex = this.turnIndex % this.players.size;
    const player = [...this.players.values()][this.turnIndex];
    return player;
  }
  nextPlayer() {
    const nextTurnIndex = (this.turnIndex + 1) % this.players.size;
    const nextPlayer = [...this.players.values()][nextTurnIndex];
    return nextPlayer;
  }
  advancePlayer() {
    this.turnIndex += 1;
  }

}

module.exports = Game;
