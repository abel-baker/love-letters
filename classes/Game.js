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
    // these are the members (and corresponding created Players) who want to play next hand
    // by default, players in a current hand are left in the queue so they can play next hand automatically
    this.playerQueue = new Map();

    // Player
    // these are the Player objects who are currently in (or about to start; or just having left) a hand
    this.players = new Set();

    // set of GuildMember to add/create (map) or remove
    // get rid of this--members can be queued instantly
    this.queueJoin = new Set();
    // get rid of this--members can be removed from the queue instantly
    this.queueLeave = new Set();

    this.resetCards();
  }


  // begin hand
  start() {
    this.status = 'active';

    this.setAside();
    console.log(`Setting aside ${this.aside.name}`);

    for (let player of this.players) {
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
    for (let player of this.players) {
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

  // join the queue (or an open game) to play
  join(member) {
    // if member is already queued, disallow them being added again (unless debug is active)
    if (this.playerQueue.has(member)) {
      if (config.debug) {
        const fakeMember = { ...member, nickname: `fake ${member.nickname} ${this.playerQueue.size}`};
        this.playerQueue.set(fakeMember, new Player(fakeMember));
        return true;
      }

      return false;
    }

    // if (this.players.has(member)) {
    //   if (config.debug) {
    //     const fakeMember = { ...member, nickname: `fake ${member.nickname}` };
    //     this.playerQueue.set(fakeMember, new Player(fakeMember));
    //     this.players.set(fakeMember, new Player(fakeMember));
    //     return true;
    //   }
    //   return false;
    // }

    // otherwise, proceed to add the new member to player queue
    // this.players.set(member, new Player(member));
    this.playerQueue.set(member, new Player(member));
    return true;
  }
  leaveQueue(member) {
    // get some relevant conditions
    const inGame = this.players.has()

    // remove the member and their Player object from the queue--they won't play next hand
    // return their Player object for purposes of messaging, scoreboard, etc.
    if (this.playerQueue.has(member)) {
      const player = this.playerQueue.get(member);
      this.playerQueue.delete(member);

      return player;
    }

    return false;
  }

  // removes the specified member from the game, performing necessary logic to resolve losing them.
  leaveGame(member) {
    const player = this.MemberIsPlaying(member);
    if (player) {
      //TODO
      // remove from this.players
      // discard hand?  lay hand facedown?
      // make a history entry (todo)
      // make some kind of message
    }

    return false;
  }

  /* here */

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
  // check this.players for a Player object matching the member argument
  MemberIsPlaying(member) {
    for (let player of this.players) {
      if (member === player.member) {
        return player;
      }
    }

    return false;
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
