// AUTH


// Ensure the GuildMember in question has the permissions required
// to perform their requested action.

// Generally speaking this means they must be present in the right
// guild and channel;
// registered to the current game;
// not eliminated;

// possibly, the dealer (or next person to deal);
const Verify = {
  async GameExists(client) {
    const out = ['Beginning verify exists'];
    
    out.push(`Game: ${client.game ? 'detected' : 'not detected'}`);
    const status = client.game?.status;
    out.push(`Status: ${status}`);
    const check = (client.game ? true : false);
    out.push(`Logic check: ${check}`);
    console.log(out);

    return check;
  },
  async GameActive(client) {
    const out = ['Beginning verify active'];
    
    out.push(`Game: ${client.game ? 'detected' : 'not detected'}`);
    const status = client.game?.status;
    out.push(`Status: ${status}`);
    const check = (client.game ? true : false) && status === 'active';
    out.push(`Logic check: ${check}`);
    console.log(out);
    
    return check;
  }
}

const verifyGameExists = (interaction) => {
  const game = interaction.client.game;

  if (game) return true;
  else return false;
}

// // Playing and not leaving
// if ( !game.players.has(interaction.member) || game.queueLeave.has(interaction.member)) {
//   // Looks like you're not playing the next hand.  /join to play the next hand
// }

module.exports = { Verify, verifyGameExists };