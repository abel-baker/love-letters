// AUTH

const config = client.config;
const game = client.game;

// Ensure the GuildMember in question has the permissions required
// to perform their requested action.

// Generally speaking this means they must be present in the right
// guild and channel;
// registered to the current game;
// not eliminated;

// possibly, the dealer (or next person to deal);


// Playing and not leaving
if ( !game.players.has(interaction.member) || game.queueLeave.has(interaction.member)) {
  // Looks like you're not playing the next hand.  /join to play the next hand
}

