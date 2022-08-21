const onReady = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`Client ready!  Logged in as ${client.user.tag}`);
  }
};

module.exports = onReady;