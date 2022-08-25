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
  }

  get address() {
    return `${this.guild.name}[${this.guild.id}]#${this.channel.name}[${this.channel.id}]`;
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

    console.log(`Now playing: ${[...this.players.keys()].map(member => member.nickname).join(', ')}`);

    this.setAside();
    console.log(`Setting aside ${this.aside.name}`);

    for (let [member, player] of this.players) {
      player.draw(...this.deck.draw(1));
      console.log(`${member.nickname}'s hand`, [...player.hand].map(card => card.name));
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
    for (const member of this.players) {
      this.players.get(member).clearHand();
    }

    this.history = new Set();
  }
  setAside() {
    this.aside = this.deck.pop();
    return this.aside;
  }
  deal(member, count = 1) {
    this.players.get(member).drawFrom(this.deck, count);
    console.log(`Dealing ${count} cards to ${member.nickname}`, [...this.players.get(member).hand].map(card => card.name));
  }


  ///// PLAYER FUNCTIONS /////

  join(member) {
    try {
      // if (this.players.size >= config.rules.max_group_size) return false; // add to queue instead

      if (this.players.has(member)) {
        if (config.debug) {
          const fakeMember = { ...member, nickname: `fake ${member.nickname}` };
          this.players.set(fakeMember, new Player(member));
          return true;
        }
        return false;
      }
  
      this.players.set(member, new Player(member));
      return true;
    } catch(err) {
      console.log('There was an error adding member to game', member, err);
      return false;
    }
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
    return [...this.players.keys()].map(member => member.nickname).join(', ');
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
