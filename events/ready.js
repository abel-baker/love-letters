const onReady = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`Ready!  Logged in as ${client.user.tag}`);
  }
};

module.exports = onReady;