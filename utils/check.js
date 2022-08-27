// AUTH


// Ensure the GuildMember in question has the permissions required
// to perform their requested action.

// Generally speaking this means they must be present in the right
// guild and channel;
// registered to the current game;
// not eliminated;

// possibly, the dealer (or next person to deal);
const Verify = {
  async GameExists(client, address) {
    const out = ['Verifying game exists: '];
    
    const check = (client.games.has(address) ? true : false);
    out.push(check);
    
    // console.log(out);
    return check;
  },
  async GameActive(client, address) {
    const out = ['Verifying game is active: '];
    const game = client.games.get(address);

    const status = game?.status;
    const check = (game? true : false) && status === 'active';
    out.push(check);

    // console.log(out);
    return check;
  },

  async MemberIsInGame(client, address, member) {
    if (!await this.GameExists(client, address)) return false;
    
    const out = [`Verifying member ${member.nickname} is in game: `];
    const game = client.games.get(address);
    
    const check = game.isPlaying(member);
    out.push(check);

    // console.log(out);
    return check;
  },
  async MemberIsCurrentPlayer(client, address, member) {
    if (!await this.MemberIsInGame(client, address, member)) return false;

    const out = [`Verifying member ${member.nickname} is current player: `];
    const game = client.games.get(address);
    const [currentMember, currentPlayer] = game.currentPlayer();
    const check = member === currentMember;
    out.push(check);

    // console.log(out);
    return check;
  }
}
// // Playing and not leaving
// if ( !game.players.has(interaction.member) || game.queueLeave.has(interaction.member)) {
//   // Looks like you're not playing the next hand.  /join to play the next hand
// }

module.exports = { Verify };