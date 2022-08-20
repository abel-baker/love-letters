require('dotenv').config();
const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { CLIENT_ID, GUILD_ID, TOKEN } = process.env;

const rest = new REST({ version: '10' }).setToken(TOKEN);

rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [] })
  .then(() => console.log('Successfully de-registered application commands.'))
  .catch(console.error);
