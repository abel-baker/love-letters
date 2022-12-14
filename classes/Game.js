const config = require('../config.json');
const Player = require('./Player');
const { Deck, standardDeck } = require('./Deck');
const { Card } = require('./Card');

/* Game flow:
- Game is created by /newgame, status set to setup; ->
- an Invite is created and assigned by /newgame, status set to invitation; 
- Game begins by beginGame interaction, status set to starting; ->
- possible ready check of some kind for the players;
- a round is dealt to Players and turnIndex is set for one of them;
- round start message is sent ("Let's go, it's sweet william's turn to draw a card"),
  buttons are presented for drawCard (and others), status is drawing;
- after drawing, buttons are presented to the player for playCard/cardtype, series of
  "prompts" via button layouts for playing each card, status is playing;
- card play executes, changing cards, changing hands, eliminating players,
  etc., status is resolving (or similar);
- end condition is checked such as empty deck, only one player remaining:
  proceed if condition is met, otherwise increment turn index and move
  to next player's draw phase;
- after end condition, stop play and send summary/win message;
*/

class Game {
  constructor(guild, channel) {
    this.status = 'setup';

    this.guild = guild;
    this.channel = channel;

    // console.log(`Creating new game in ${this.address}`);

    // map GuildMember -> Player
    // these are the members (and corresponding created Players) who want to play next hand
    // by default, players in a current hand are left in the queue so they can play next hand automatically
    this.playerQueue = new Map();

    this.players = new Set();

    // this.pastInvitations = [];
    // this.lastInvitation;

    // this.newRound();
  }

  get address() {
    return `${this.guild.id}-${this.channel.id}`;
  }
  // get playerList() {
  //   return this.players
  // }
  get atMin() {
    const groupSize = config.rules.min_group_size;
    return this.playerQueue.size >= groupSize;
  }
  get atMax() {
    const groupLimit = config.rules.max_group_size;
    return this.playerQueue.size >= groupLimit;
  }
  get currentPlayer() {
    return this.currentPlayer();
  }
  get nextPlayer() {
    return this.nextPlayer();
  }

  /* Prepare the Game object to play a game. */
  beginGame() {
    this.status = 'starting';
    
    // Player: these are the Player objects who are participating or will participate in a round
    // This is constructed from the first x members in the Player queue, where x is the size of
    // a group of players according to the rules.
    this.players = new Set();
    this.turnIndex = 0;
    
    // Take the top of the playerQueue (members who have opted to play) and add then to the round's
    // group of Players
    const playersToAdd = Array.from(this.playerQueue.values()).slice(0, config.rules.max_group_size);
    for (const player of playersToAdd) {
      this.players.add(player);
    }

    // await Ready check of some kind?

    this.beginRound();
  }
  
  /* Begin one round of play */
  beginRound() {
    this.status = 'dealing';

    // Determine starting Player by some mechanism (won last hand, always the same Player, etc)
    this.turnIndex = 0;

    // Grab a new deck
    this.deck = new Deck(...standardDeck);
    this.deck.shuffle();

    // Create helper decks
    this.faceup = new Deck();
    this.aside = new Deck();

    // Set one card aside each round
    this.aside.push(this.deck.pop());

    // Set three cards face-up in a two-person game
    if (this.players.size === 2 && config.rules.set_aside_on_two_players) {
      for (let i = 0; i < 3; i++) {
        this.faceup.push(this.deck.pop());
      }
    }

    // ...

    // this.resetCards();
  }

  // update invitations
  // processNewInvitation(invite) {
  //   // put past used invites into an array that can be referenced/processed later
  //   this.pastInvitations.push(this.lastInvitation);

  //   // current invitation can be referenced to validate users clicking on the correct invitation
  //   this.lastInvitation = invite;
  // }

  /* Prepare the Game object to play a round.
  *  Rather than put this in the constructor, 
  *  separate it so the Game can play multiple rounds */
  newRound() {
    this.status = 'inactive';

    // ...

    this.resetCards();

    // send new round message?
  }

  // begin hand
  start() {
    this.status = 'active';

    this.setAside();
    console.log(`Setting aside ${this.aside.name}`);

    const playersToAdd = Array.from(this.playerQueue.values()).slice(0, config.rules.max_group_size);
    console.log(playersToAdd);
    
    // take the top of the queue and add them to the players group
    // this.players.add(...Array.from(this.playerQueue.values()).slice(config.rules.max_group_size));
    // this.players.add(...playersToAdd);
    for (const player of playersToAdd) {
      this.players.add(player);
    }

    console.log("Starting with players: ", this.players);

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
        const fakePlayer = new Player(fakeMember);
        // console.log("Attempting to join", fakeMember, fakePlayer)
        this.playerQueue.set(fakeMember, fakePlayer);
        // console.log(this.playerQueue);
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
    // const inGame = this.players.has()

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

  // returns an array of members with a corresponding Player object
  playing() {
    const playing = Array.from(this.players, player => player.member);
    return playing;
  }

  // not needed anymore since the leave queue is removed 
  // refreshPlayers() {
  //   // Remove any players who left before this round
  //   for (let queuedMember of this.queueLeave) {
  //     this.players.delete(queuedMember);
  //   }
  //   this.queueLeave = new Set();

  //   // Add any players who joined during a hand
  //   for (let queuedMember of this.queueJoin) {
  //     // future: lookup member for existing Player object, or check db, and use that instead
  //     this.players.set(queuedMember, new Player(member));
  //   }
  //   this.queueJoin = new Set();
  // }

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
    // const player = [...this.players.values()][this.turnIndex];
    const player = Array.from(this.players)[this.turnIndex];
    return player;
  }
  nextPlayer() {
    const nextTurnIndex = (this.turnIndex + 1) % this.players.size;
    // const nextPlayer = [...this.players.values()][nextTurnIndex];
    const nextPlayer = Array.from(this.players)[nextTurnIndex];
    return nextPlayer;
  }
  advancePlayer() {
    this.turnIndex += 1;
  }

}

module.exports = Game;
