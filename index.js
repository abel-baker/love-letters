require('dotenv').config({ path: '.emv' });
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const envToken = process.env.TOKEN;

// Client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

console.log(token, envToken);

// When client is ready, run this code ones
client.once('ready', () => {
  console.log('Ready!');
});


// Login to Discord with client's token
client.login(token);