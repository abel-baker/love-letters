require('dotenv').config({ path: '.env' });
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const TOKEN = process.env.TOKEN;

// Client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Read commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  client.commands.set(command.data.name, command);
}

// Read events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// When client is ready, run this code ones
// client.once('ready', () => {
//   console.log('Ready!');
// });

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command.', ephemeral: true });
  }
});


client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  interaction.customId += `bingo`;

  await interaction.reply({ content: `Pongerama ${interaction.customId}`, ephemeral: true });
});


// Login to Discord with client's token
client.login(TOKEN);
