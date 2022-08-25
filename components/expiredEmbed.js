const { EmbedBuilder } = require('discord.js');

const expiredEmbed = new EmbedBuilder().setDescription(`:crossed_swords: **Oh dear**, this invitation has expired.`);

module.exports = expiredEmbed;
